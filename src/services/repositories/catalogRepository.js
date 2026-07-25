import { collection, doc, getCountFromServer, getDocs, limit, query, setDoc, startAfter, writeBatch } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../firebase/index.js';
import { COLLECTIONS } from '../collections.js';
import { addWhereConstraints, buildQueryConstraints, SORT_KEYS } from './catalogQueryBuilder.js';

export { SORT_KEYS };

export async function signInAsAdmin() {
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

export async function fetchProductPage(filters, sortKey, afterDoc = null, pageSize = 15) {
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

export async function fetchProductCount(filters) {
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

export async function saveCatalogDrafts(draftProducts, draftCategories, oldProducts, oldCategories) {
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

  const BATCH_LIMIT = 450;
  for (let i = 0; i < operations.length; i += BATCH_LIMIT) {
    const chunk = operations.slice(i, i + BATCH_LIMIT);
    const batch = writeBatch(db);
    chunk.forEach((op) => {
      if (op.type === 'delete') {
        batch.delete(op.ref);
      } else if (op.type === 'set') {
        batch.set(op.ref, op.data);
      }
    });
    await batch.commit();
  }
}

export async function saveBanners(banners) {
  await setDoc(doc(db, COLLECTIONS.SETTINGS, 'banners'), { items: banners });
}

export async function fetchExistingCatalogData() {
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

export async function replaceCatalogData(deleteDocIds, dataset, ordersDataset) {
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
