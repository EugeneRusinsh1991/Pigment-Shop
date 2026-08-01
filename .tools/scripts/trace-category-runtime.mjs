import { db, auth } from '../../src/services/firebase/index.js';
import { collection, getDocs } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { CATEGORY_PLACEHOLDER } from '../../src/constants/index.js';
import { buildCategoryTree } from '../../src/services/catalogViewModel.js';
import { CATEGORY_IMAGES } from '../../src/services/catalogViewModel.helpers.js';

async function main() {
  console.log('=== RUNTIME EVIDENCE TRACE FOR CATEGORIES ===\n');

  console.log('1. Checking CATEGORY_PLACEHOLDER constant:');
  console.log(`   Defined constant: "${CATEGORY_PLACEHOLDER}"`);
  console.log(`   Expected Cloudinary URL: "https://res.cloudinary.com/iayng29j/image/upload/v1785611322/categories/g3yabymukhht0e8zeyc7.jpg"`);
  console.log(`   Match confirmed: ${CATEGORY_PLACEHOLDER === 'https://res.cloudinary.com/iayng29j/image/upload/v1785611322/categories/g3yabymukhht0e8zeyc7.jpg'}\n`);

  console.log('2. Authenticating & Inspecting Firestore "categories" Collection:');
  await signInWithEmailAndPassword(auth, 'admin@pigment-shop.com', 'admin123456');
  const snap = await getDocs(collection(db, 'categories'));
  console.log(`   Total categories in Firestore: ${snap.size}`);

  const rawCategories = [];
  snap.forEach((docSnap) => {
    const data = docSnap.data();
    rawCategories.push({ id: docSnap.id, ...data });
    console.log(`   Doc ID [${docSnap.id}]:`);
    console.log(`     name: ${JSON.stringify(data.name)}`);
    console.log(`     image field: ${JSON.stringify(data.image)}`);
  });

  console.log('\n3. Tracing ViewModel Transformation (`buildCategoryTree`):');
  const tree = buildCategoryTree(rawCategories, [], 'uk');
  console.log(`   Root category nodes generated (${tree.length}):`);
  
  tree.forEach((node) => {
    console.log(`   Node [${node.id}] ("${node.label}"):`);
    console.log(`     resolved node.image: "${node.image}"`);
    console.log(`     is Cloudinary placeholder? ${node.image === CATEGORY_PLACEHOLDER}`);
    console.log(`     is Unsplash fallback? ${Object.values(CATEGORY_IMAGES).includes(node.image)}`);
  });

  console.log('\n=== TRACE COMPLETE ===');
  process.exit(0);
}

main().catch((err) => {
  console.error('[FATAL]', err);
  process.exit(1);
});
