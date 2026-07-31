/**
 * i18n Static Auditor Script
 * Scans src/components and src/features for hardcoded strings in JSX.
 */
const fs = require('fs');
const path = require('path');

const TARGET_DIRS = [
  path.join(__dirname, '../src/components'),
  path.join(__dirname, '../src/features'),
];

const { getFilesRecursively: getFiles } = require('./scripts/fsUtils');

function getFilesRecursively(dir) {
  return getFiles(dir, (_, file) => file.endsWith('.js') || file.endsWith('.jsx'));
}

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  const lines = content.split('\n');

  // Regex to match JSX text between > and < containing english/russian letters
  const jsxTextRegex = />\s*([A-Za-zА-Яа-яЁё][^<>{}]+?)\s*</g;

  lines.forEach((line, index) => {
    let match;
    while ((match = jsxTextRegex.exec(line)) !== null) {
      const text = match[1].trim();
      // Ignore single symbols, numbers, emoji, icons
      if (text.length > 1 && !/^[0-9\s\W]+$/.test(text)) {
        issues.push({
          line: index + 1,
          text,
        });
      }
    }
  });

  return issues;
}

function runAudit() {
  console.log('--- Starting i18n Static Audit ---');
  let totalFiles = 0;
  let filesWithIssues = 0;
  let totalIssues = 0;

  TARGET_DIRS.forEach((dir) => {
    const files = getFilesRecursively(dir);
    totalFiles += files.length;

    files.forEach((file) => {
      const issues = auditFile(file);
      if (issues.length > 0) {
        filesWithIssues++;
        totalIssues += issues.length;
        const relativePath = path.relative(path.join(__dirname, '..'), file);
        console.warn(`\n[!] ${relativePath}:`);
        issues.forEach((issue) => {
          console.warn(`    Line ${issue.line}: "${issue.text}"`);
        });
      }
    });
  });

  console.log('\n--- Audit Summary ---');
  console.log(`Files Scanned: ${totalFiles}`);
  console.log(`Files with Hardcoded Text Issues: ${filesWithIssues}`);
  console.log(`Total Unlocalized Text Nodes Found: ${totalIssues}`);

  if (totalIssues === 0) {
    console.log('\n✅ i18n Audit Passed: Clean localization coverage!');
    process.exit(0);
  } else {
    console.log('\n⚠️ i18n Audit Completed with warnings.');
    process.exit(0);
  }
}

runAudit();
