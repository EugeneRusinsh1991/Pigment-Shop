import { db, auth } from '../../src/services/firebase/index.js';
import { collection, getDocs } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { COLLECTIONS } from '../../src/services/collections.js';
import fs from 'fs';
import path from 'path';

const KNOWN_COLLECTIONS = [
  COLLECTIONS.CATEGORIES,
  COLLECTIONS.PRODUCTS,
  COLLECTIONS.ORDERS,
  COLLECTIONS.USERS,
  COLLECTIONS.SETTINGS,
  COLLECTIONS.SUPPORT_MESSAGES,
  COLLECTIONS.ADMIN_NOTES,
  COLLECTIONS.BANNERS,
];

async function authenticate() {
  try {
    await signInWithEmailAndPassword(auth, 'admin@pigment-shop.com', 'admin123456');
    return 'Admin';
  } catch (err) {
    await signInWithEmailAndPassword(auth, 'visitor@pigment-shop.com', 'visitor123456');
    return 'Visitor';
  }
}

function formatDoc(docId, data, indent = '  ') {
  let lines = [`${indent}* [ID: ${docId}]`];
  for (const [key, val] of Object.entries(data)) {
    const formattedVal = typeof val === 'object' && val !== null ? JSON.stringify(val, null, 2).replace(/\n/g, `\n${indent}    `) : String(val);
    lines.push(`${indent}  - ${key}: ${formattedVal}`);
  }
  return lines.join('\n');
}

async function fetchSubcollections(parentCol, docId, subColName) {
  try {
    const snap = await getDocs(collection(db, parentCol, docId, subColName));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch {
    return [];
  }
}

async function exportFirebase() {
  const timestamp = new Date().toISOString();
  console.log(`[Firebase Exporter] Starting dump at ${timestamp}`);
  
  const role = await authenticate();
  console.log(`[Firebase Exporter] Authenticated as: ${role}`);

  const outputDir = path.resolve(process.cwd(), '.logs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let logContent = [];
  logContent.push(`=======================================================`);
  logContent.push(`FIREBASE SNAPSHOT LOG`);
  logContent.push(`Date: ${timestamp}`);
  logContent.push(`Role: ${role}`);
  logContent.push(`=======================================================\n`);

  const summary = {};
  const fullJson = {};

  for (const colName of KNOWN_COLLECTIONS) {
    console.log(`Fetching collection: "${colName}"...`);
    try {
      const snap = await getDocs(collection(db, colName));
      summary[colName] = snap.size;
      fullJson[colName] = [];

      logContent.push(`-------------------------------------------------------`);
      logContent.push(`COLLECTION: [${colName.toUpperCase()}] (Total: ${snap.size})`);
      logContent.push(`-------------------------------------------------------`);

      if (snap.empty) {
        logContent.push(`  (Empty collection)\n`);
        continue;
      }

      for (const docSnap of snap.docs) {
        const docData = docSnap.data();
        const docRecord = { id: docSnap.id, ...docData };

        logContent.push(formatDoc(docSnap.id, docData));

        if (colName === COLLECTIONS.PRODUCTS) {
          const reviews = await fetchSubcollections(colName, docSnap.id, COLLECTIONS.PRODUCT_REVIEWS);
          const questions = await fetchSubcollections(colName, docSnap.id, COLLECTIONS.PRODUCT_QUESTIONS);

          if (reviews.length > 0) {
            docRecord.reviews = reviews;
            logContent.push(`    [Subcollection: reviews (${reviews.length})]`);
            reviews.forEach((r) => logContent.push(formatDoc(r.id, r, '      ')));
          }
          if (questions.length > 0) {
            docRecord.questions = questions;
            logContent.push(`    [Subcollection: questions (${questions.length})]`);
            questions.forEach((q) => logContent.push(formatDoc(q.id, q, '      ')));
          }
        }

        fullJson[colName].push(docRecord);
        logContent.push('');
      }
    } catch (err) {
      console.warn(`Error reading collection "${colName}":`, err.message);
      logContent.push(`  [ERROR fetching collection: ${err.message}]\n`);
    }
  }

  logContent.push(`=======================================================`);
  logContent.push(`SUMMARY:`);
  for (const [col, count] of Object.entries(summary)) {
    logContent.push(`  - ${col}: ${count} document(s)`);
  }
  logContent.push(`=======================================================`);

  const textLogPath = path.join(outputDir, 'firebase-export.log');
  const jsonPath = path.join(outputDir, 'firebase-export.json');

  fs.writeFileSync(textLogPath, logContent.join('\n'), 'utf-8');
  fs.writeFileSync(jsonPath, JSON.stringify(fullJson, null, 2), 'utf-8');

  console.log('\n--- Summary ---');
  console.table(summary);
  console.log(`\nLog written to: ${textLogPath}`);
  console.log(`JSON written to: ${jsonPath}`);
  process.exit(0);
}

exportFirebase().catch((err) => {
  console.error('Firebase export failed:', err);
  process.exit(1);
});
