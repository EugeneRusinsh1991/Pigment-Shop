import { collection, doc, getCountFromServer, getDocs, limit, query, setDoc, startAfter, writeBatch } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../firebase/index.js';
import { COLLECTIONS } from '../collections.js';
import { addWhereConstraints, buildQueryConstraints, SORT_KEYS } from './catalogQueryBuilder.js';
import { withServiceContract } from '../serviceContract.js';

export { SORT_KEYS };

async function _signInAsAdmin() {
  await signInWithEmailAndPassword(auth, 'admin@pigment-shop.com', 'admin123456');
}

export class MissingIndexError extends Error {
  constructor(message = 'Firestore index missing for catalog query', cause = null) {
    super(message);
    this.name = 'MissingIndexError';
    this.code = 'MISSING_INDEX';
    this.cause = cause;
  }
}

function handleFirestoreQueryError(error, contextMessage) {
  if (error.name === 'MissingIndexError' || error.code === 'MISSING_INDEX' || (error.message && error.message.includes('index'))) {
    console.warn(`Firestore index missing. Original error:`, error);
    throw new MissingIndexError(`Firestore index missing during ${contextMessage}`, error);
  }
  throw error;
}

async function _fetchProductPage(filters, sortKey, afterDoc = null, pageSize = 15) {
  const productsRef = collection(db, COLLECTIONS.PRODUCTS);
  const constraints = buildQueryConstraints(filters, sortKey);
  
  if (afterDoc) {
    constraints.push(startAfter(afterDoc));
  }
  constraints.push(limit(pageSize));

  const q = query(productsRef, ...constraints);
  
  try {
    const snapshot = await getDocs(q);
    const products = [];
    snapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() });
    });
    
    return {
      products,
      lastDoc: snapshot.docs[snapshot.docs.length - 1] || null
    };
  } catch (error) {
    handleFirestoreQueryError(error, 'product page fetch');
  }
}

async function _fetchProductCount(filters) {
  const productsRef = collection(db, COLLECTIONS.PRODUCTS);
  const constraints = [];
  addWhereConstraints(constraints, filters);
  
  const q = query(productsRef, ...constraints);
  
  try {
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (error) {
    handleFirestoreQueryError(error, 'product count fetch');
  }
}

export async function executeBatchInChunks(dbInstance, operations, chunkSize = 450) {
  for (let i = 0; i < operations.length; i += chunkSize) {
    const chunk = operations.slice(i, i + chunkSize);
    const batch = writeBatch(dbInstance);
    for (const op of chunk) {
      if (typeof op === 'function') {
        op(batch);
      } else if (op?.type === 'delete') {
        batch.delete(op.ref);
      } else if (op?.type === 'set') {
        if (op.options) {
          batch.set(op.ref, op.data, op.options);
        } else {
          batch.set(op.ref, op.data);
        }
      }
    }
    await batch.commit();
  }
}

async function _saveCatalogDrafts(draftProducts, draftCategories, oldProducts, oldCategories) {
  const operations = [];

  const categoriesCol = collection(db, COLLECTIONS.CATEGORIES);
  const newCatIds = new Set(draftCategories.map((c) => c.id));
  const deletedCats = oldCategories.filter((c) => c.id && !newCatIds.has(c.id));
  deletedCats.forEach((cat) => {
    operations.push({ type: 'delete', ref: doc(categoriesCol, cat.id) });
  });
  draftCategories.filter((c) => c.id).forEach((cat) => {
    const { image, ...rest } = cat;
    operations.push({ type: 'set', ref: doc(categoriesCol, cat.id), data: rest });
  });

  const productsCol = collection(db, COLLECTIONS.PRODUCTS);
  const newProdIds = new Set(draftProducts.map((p) => p.id));
  const deletedProds = oldProducts.filter((p) => p.id && !newProdIds.has(p.id));
  deletedProds.forEach((prod) => {
    operations.push({ type: 'delete', ref: doc(productsCol, prod.id) });
  });
  draftProducts.filter((p) => p.id).forEach((prod) => {
    const { category, subcategory, categoryId, ...rest } = prod;
    operations.push({ type: 'set', ref: doc(productsCol, prod.id), data: rest });
  });

  await executeBatchInChunks(db, operations, 450);
}

async function _saveBanners(banners) {
  await setDoc(doc(db, COLLECTIONS.SETTINGS, 'banners'), { items: banners });
}

async function _fetchExistingCatalogData() {
  const productsCol = collection(db, COLLECTIONS.PRODUCTS);
  const categoriesCol = collection(db, COLLECTIONS.CATEGORIES);
  const ordersCol = collection(db, COLLECTIONS.ORDERS);
  const usersCol = collection(db, COLLECTIONS.USERS);

  const [existingProducts, existingCategories, existingOrders, usersSnapshot] = await Promise.all([
    getDocs(productsCol),
    getDocs(categoriesCol),
    getDocs(ordersCol),
    getDocs(usersCol)
  ]);
  
  const users = usersSnapshot.docs.map(d => ({ uid: d.id, ...d.data() }));
  
  return {
    productsDocsIds: existingProducts.docs.map(d => d.id),
    categoriesDocsIds: existingCategories.docs.map(d => d.id),
    ordersDocsIds: existingOrders.docs.map(d => d.id),
    users,
    counts: {
      products: existingProducts.size,
      categories: existingCategories.size,
      orders: existingOrders.size
    }
  };
}

async function _replaceCatalogData(deleteDocIds, dataset, ordersDataset) {
  const MAX_BATCH_SIZE = 499;
  const productsCol = collection(db, COLLECTIONS.PRODUCTS);
  const categoriesCol = collection(db, COLLECTIONS.CATEGORIES);
  const ordersCol = collection(db, COLLECTIONS.ORDERS);

  const deleteOps = [];
  deleteDocIds.productsDocsIds.forEach(id => {
    deleteOps.push(batch => batch.delete(doc(productsCol, id)));
  });
  deleteDocIds.categoriesDocsIds.forEach(id => {
    deleteOps.push(batch => batch.delete(doc(categoriesCol, id)));
  });
  deleteDocIds.ordersDocsIds.forEach(id => {
    deleteOps.push(batch => batch.delete(doc(ordersCol, id)));
  });

  for (let i = 0; i < deleteOps.length; i += MAX_BATCH_SIZE) {
    const chunk = deleteOps.slice(i, i + MAX_BATCH_SIZE);
    const batch = writeBatch(db);
    chunk.forEach((op) => op(batch));
    await batch.commit();
  }

  const writeOps = [];
  dataset.categories.forEach((cat) => writeOps.push((batch) => batch.set(doc(categoriesCol, cat.id), cat)));
  dataset.products.forEach((prod) => writeOps.push((batch) => batch.set(doc(productsCol, prod.id), prod)));
  ordersDataset.forEach((order) => writeOps.push((batch) => batch.set(doc(ordersCol, order.id), order)));

  for (let i = 0; i < writeOps.length; i += MAX_BATCH_SIZE) {
    const chunk = writeOps.slice(i, i + MAX_BATCH_SIZE);
    const batch = writeBatch(db);
    chunk.forEach((op) => op(batch));
    await batch.commit();
  }
}

async function _fetchExistingCatalogContext() {
  const categoriesCol = collection(db, COLLECTIONS.CATEGORIES);
  const productsCol = collection(db, COLLECTIONS.PRODUCTS);
  const ordersCol = collection(db, COLLECTIONS.ORDERS);
  const supportCol = collection(db, COLLECTIONS.SUPPORT_MESSAGES);
  const adminNotesCol = collection(db, COLLECTIONS.ADMIN_NOTES);
  const usersCol = collection(db, COLLECTIONS.USERS);

  const [categoriesSnap, productsSnap, ordersSnap, supportSnap, adminNotesSnap, usersSnap] = await Promise.all([
    getDocs(categoriesCol),
    getDocs(productsCol),
    getDocs(ordersCol),
    getDocs(supportCol),
    getDocs(adminNotesCol),
    getDocs(usersCol)
  ]);

  const users = usersSnap.docs.map((d) => ({ uid: d.id, ...d.data() }));
  const categoriesDocsIds = categoriesSnap.docs.map((d) => d.id);
  const productsDocsIds = productsSnap.docs.map((d) => d.id);
  const ordersDocsIds = ordersSnap.docs.map((d) => d.id);
  const supportMessagesDocsIds = supportSnap.docs.map((d) => d.id);
  const adminNotesDocsIds = adminNotesSnap.docs.map((d) => d.id);

  const productReviewsDocs = [];
  const productQuestionsDocs = [];

  await Promise.all(
    productsDocsIds.map(async (productId) => {
      const reviewsCol = collection(db, COLLECTIONS.PRODUCTS, productId, COLLECTIONS.PRODUCT_REVIEWS);
      const questionsCol = collection(db, COLLECTIONS.PRODUCTS, productId, COLLECTIONS.PRODUCT_QUESTIONS);
      const [reviewsSnap, questionsSnap] = await Promise.all([
        getDocs(reviewsCol),
        getDocs(questionsCol)
      ]);
      reviewsSnap.forEach((rDoc) => {
        productReviewsDocs.push({ productId, reviewId: rDoc.id });
      });
      questionsSnap.forEach((qDoc) => {
        productQuestionsDocs.push({ productId, questionId: qDoc.id });
      });
    })
  );

  return {
    users,
    categoriesDocsIds,
    productsDocsIds,
    ordersDocsIds,
    supportMessagesDocsIds,
    adminNotesDocsIds,
    productReviewsDocs,
    productQuestionsDocs,
    counts: {
      categories: categoriesDocsIds.length,
      products: productsDocsIds.length,
      orders: ordersDocsIds.length,
      supportMessages: supportMessagesDocsIds.length,
      adminNotes: adminNotesDocsIds.length,
      reviews: productReviewsDocs.length,
      questions: productQuestionsDocs.length,
      users: users.length
    }
  };
}

async function _batchDeleteCollections(datasetIds = {}) {
  const operations = [];

  if (Array.isArray(datasetIds.productReviewsDocs)) {
    datasetIds.productReviewsDocs.forEach(({ productId, reviewId }) => {
      if (productId && reviewId) {
        operations.push({
          type: 'delete',
          ref: doc(db, COLLECTIONS.PRODUCTS, productId, COLLECTIONS.PRODUCT_REVIEWS, reviewId)
        });
      }
    });
  }

  if (Array.isArray(datasetIds.productQuestionsDocs)) {
    datasetIds.productQuestionsDocs.forEach(({ productId, questionId }) => {
      if (productId && questionId) {
        operations.push({
          type: 'delete',
          ref: doc(db, COLLECTIONS.PRODUCTS, productId, COLLECTIONS.PRODUCT_QUESTIONS, questionId)
        });
      }
    });
  }

  if (Array.isArray(datasetIds.productsDocsIds)) {
    datasetIds.productsDocsIds.forEach((id) => {
      if (id) {
        operations.push({
          type: 'delete',
          ref: doc(db, COLLECTIONS.PRODUCTS, id)
        });
      }
    });
  }

  if (Array.isArray(datasetIds.categoriesDocsIds)) {
    datasetIds.categoriesDocsIds.forEach((id) => {
      if (id) {
        operations.push({
          type: 'delete',
          ref: doc(db, COLLECTIONS.CATEGORIES, id)
        });
      }
    });
  }

  if (Array.isArray(datasetIds.ordersDocsIds)) {
    datasetIds.ordersDocsIds.forEach((id) => {
      if (id) {
        operations.push({
          type: 'delete',
          ref: doc(db, COLLECTIONS.ORDERS, id)
        });
      }
    });
  }

  if (Array.isArray(datasetIds.supportMessagesDocsIds)) {
    datasetIds.supportMessagesDocsIds.forEach((id) => {
      if (id) {
        operations.push({
          type: 'delete',
          ref: doc(db, COLLECTIONS.SUPPORT_MESSAGES, id)
        });
      }
    });
  }

  if (Array.isArray(datasetIds.adminNotesDocsIds)) {
    datasetIds.adminNotesDocsIds.forEach((id) => {
      if (id) {
        operations.push({
          type: 'delete',
          ref: doc(db, COLLECTIONS.ADMIN_NOTES, id)
        });
      }
    });
  }

  if (operations.length > 0) {
    await executeBatchInChunks(db, operations, 450);
  }

  return { deletedCount: operations.length };
}

async function _batchWriteCatalogData(dataset = {}) {
  const operations = [];

  const categoriesCol = collection(db, COLLECTIONS.CATEGORIES);
  const productsCol = collection(db, COLLECTIONS.PRODUCTS);
  const ordersCol = collection(db, COLLECTIONS.ORDERS);
  const supportCol = collection(db, COLLECTIONS.SUPPORT_MESSAGES);
  const adminNotesCol = collection(db, COLLECTIONS.ADMIN_NOTES);

  if (Array.isArray(dataset.categories)) {
    dataset.categories.forEach((cat) => {
      if (cat?.id) {
        operations.push({
          type: 'set',
          ref: doc(categoriesCol, cat.id),
          data: cat
        });
      }
    });
  }

  if (Array.isArray(dataset.products)) {
    dataset.products.forEach((prod) => {
      if (prod?.id) {
        operations.push({
          type: 'set',
          ref: doc(productsCol, prod.id),
          data: prod
        });
      }
    });
  }

  if (dataset.productActivity && typeof dataset.productActivity === 'object') {
    Object.entries(dataset.productActivity).forEach(([productId, activity]) => {
      if (Array.isArray(activity?.reviews)) {
        activity.reviews.forEach((review) => {
          if (review?.id) {
            operations.push({
              type: 'set',
              ref: doc(db, COLLECTIONS.PRODUCTS, productId, COLLECTIONS.PRODUCT_REVIEWS, review.id),
              data: review
            });
          }
        });
      }
      if (Array.isArray(activity?.questions)) {
        activity.questions.forEach((question) => {
          if (question?.id) {
            operations.push({
              type: 'set',
              ref: doc(db, COLLECTIONS.PRODUCTS, productId, COLLECTIONS.PRODUCT_QUESTIONS, question.id),
              data: question
            });
          }
        });
      }
    });
  }

  if (Array.isArray(dataset.reviews)) {
    dataset.reviews.forEach((review) => {
      if (review?.productId && review?.id) {
        operations.push({
          type: 'set',
          ref: doc(db, COLLECTIONS.PRODUCTS, review.productId, COLLECTIONS.PRODUCT_REVIEWS, review.id),
          data: review
        });
      }
    });
  }

  if (Array.isArray(dataset.questions)) {
    dataset.questions.forEach((question) => {
      if (question?.productId && question?.id) {
        operations.push({
          type: 'set',
          ref: doc(db, COLLECTIONS.PRODUCTS, question.productId, COLLECTIONS.PRODUCT_QUESTIONS, question.id),
          data: question
        });
      }
    });
  }

  if (Array.isArray(dataset.orders)) {
    dataset.orders.forEach((order) => {
      if (order?.id) {
        operations.push({
          type: 'set',
          ref: doc(ordersCol, order.id),
          data: order
        });
      }
    });
  }

  if (Array.isArray(dataset.supportMessages)) {
    dataset.supportMessages.forEach((msg) => {
      if (msg?.id) {
        operations.push({
          type: 'set',
          ref: doc(supportCol, msg.id),
          data: msg
        });
      }
    });
  }

  if (Array.isArray(dataset.adminNotes)) {
    dataset.adminNotes.forEach((note) => {
      if (note?.id) {
        operations.push({
          type: 'set',
          ref: doc(adminNotesCol, note.id),
          data: note
        });
      }
    });
  }

  if (operations.length > 0) {
    await executeBatchInChunks(db, operations, 450);
  }

  return { writtenCount: operations.length };
}

export const signInAsAdmin = withServiceContract(_signInAsAdmin, 'Admin sign-in failed');
export const fetchProductPage = withServiceContract(_fetchProductPage, 'Product page fetch failed');
export const fetchProductCount = withServiceContract(_fetchProductCount, 'Product count fetch failed');
export const saveCatalogDrafts = withServiceContract(_saveCatalogDrafts, 'Save catalog drafts failed');
export const saveBanners = withServiceContract(_saveBanners, 'Save banners failed');
export const fetchExistingCatalogData = withServiceContract(_fetchExistingCatalogData, 'Fetch existing catalog data failed');
export const fetchExistingCatalogContext = withServiceContract(_fetchExistingCatalogContext, 'Fetch existing catalog context failed');
export const batchDeleteCollections = withServiceContract(_batchDeleteCollections, 'Batch delete collections failed');
export const batchWriteCatalogData = withServiceContract(_batchWriteCatalogData, 'Batch write catalog data failed');
export const replaceCatalogData = withServiceContract(_replaceCatalogData, 'Replace catalog data failed');

