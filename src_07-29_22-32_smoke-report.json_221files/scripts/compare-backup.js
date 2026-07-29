const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function hashFile(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

function findDifferences(filesA, filesB, dirA, dirB) {
  const setA = new Set(filesA);
  const setB = new Set(filesB);
  const added = [];
  const deleted = [];
  const modified = [];
  
  for (const file of filesB) {
    if (!setA.has(file)) {
      added.push(file);
    } else {
      if (hashFile(path.join(dirA, file)) !== hashFile(path.join(dirB, file))) {
        modified.push(file);
      }
    }
  }
  
  for (const file of filesA) {
    if (!setB.has(file)) {
      deleted.push(file);
    }
  }
  return { added, deleted, modified };
}

function printDifferences(added, deleted, modified) {
  console.log('=== ADDED in Current ===');
  added.forEach(f => console.log(`+ ${f}`));
  if (added.length === 0) console.log('(None)');
  
  console.log('\n=== DELETED in Current ===');
  deleted.forEach(f => console.log(`- ${f}`));
  if (deleted.length === 0) console.log('(None)');
  
  console.log('\n=== MODIFIED ===');
  modified.forEach(f => console.log(`M ${f}`));
  if (modified.length === 0) console.log('(None)');
}

function compareDirs(dirA, dirB) {
  console.log(`Comparing:\n A: ${dirA}\n B: ${dirB}\n`);
  
  const filesA = getFiles(dirA).map(f => path.relative(dirA, f));
  const filesB = getFiles(dirB).map(f => path.relative(dirB, f));
  
  const { added, deleted, modified } = findDifferences(filesA, filesB, dirA, dirB);
  printDifferences(added, deleted, modified);
}

const backupDir = 'D:\\Magazine\\src_2026-07-23_23-33_WP-0203-done';
const currentDir = 'D:\\Magazine\\_PigmentShop';

console.log("=== SRC FOLDER COMPARED ===");
compareDirs(path.join(backupDir, 'src'), path.join(currentDir, 'src'));

console.log("\n=== SCRIPTS FOLDER COMPARED ===");
compareDirs(path.join(backupDir, 'scripts'), path.join(currentDir, 'scripts'));
