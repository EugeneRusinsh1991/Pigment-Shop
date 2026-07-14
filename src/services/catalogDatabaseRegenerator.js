import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';
import { createDefaultCatalogDataset } from './catalogDatabaseRegenerator.helpers';

export async function regenerateCatalogDatabase() {
  const dataset = createDefaultCatalogDataset();
  const [{ auth, db }, { setProducts, setCategories }] = await Promise.all([
    import('../firebase.js'),
    import('../data/catalogState.js'),
  ]);

  await signInWithEmailAndPassword(auth, 'admin@pigment-shop.com', 'admin123456');

  const productsCol = collection(db, 'products');
  const categoriesCol = collection(db, 'categories');

  const [existingProducts, existingCategories] = await Promise.all([
    getDocs(productsCol),
    getDocs(categoriesCol),
  ]);

  const batch = writeBatch(db);

  existingProducts.docs.forEach((docSnap) => {
    batch.delete(doc(productsCol, docSnap.id));
  });
  existingCategories.docs.forEach((docSnap) => {
    batch.delete(doc(categoriesCol, docSnap.id));
  });

  dataset.products.forEach((product) => {
    batch.set(doc(productsCol, product.id), product);
  });
  dataset.categories.forEach((category) => {
    batch.set(doc(categoriesCol, category.id), category);
  });

  await batch.commit();

  setProducts(dataset.products);
  setCategories(dataset.categories);

  return dataset;
}
