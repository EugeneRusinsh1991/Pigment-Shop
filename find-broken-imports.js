const fs = require('fs');
const path = require('path');

const ROOT = path.resolve('./src');
const SCAN_EXTENSIONS = /\.(js|jsx|ts|tsx|cjs|mjs)$/;
const IMPORT_EXTENSIONS = ['', '.js', '.ts', '.jsx', '.tsx', '/index.js', '/index.ts'];

const counters = { checked: 0, broken: 0 };
const brokenList = [];

function checkFileImports(fullPath) {
  counters.checked++;
  const content = fs.readFileSync(fullPath, 'utf-8');
  
  const importRegex = /from\s+['"](\.[^'"]+)['"]/g;
  const dynamicRegex = /(?:import|require)\s*\(\s*['"](\.[^'"]+)['"]/g;
  
  const resolvedDir = path.dirname(fullPath);
  
  const checkMatch = (match) => {
    const importPath = match[1];
    const targetBase = path.resolve(resolvedDir, importPath);
    const exists = IMPORT_EXTENSIONS.some(ext => fs.existsSync(targetBase + ext));
    
    if (!exists) {
      counters.broken++;
      brokenList.push({ file: fullPath, importPath: importPath });
    }
  };

  let match;
  while ((match = importRegex.exec(content)) !== null) checkMatch(match);
  while ((match = dynamicRegex.exec(content)) !== null) checkMatch(match);
}

function scan(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir);
  entries.forEach(entry => {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) scan(fullPath);
    else if (SCAN_EXTENSIONS.test(entry)) checkFileImports(fullPath);
  });
}

scan(ROOT);
scan(path.resolve('./app'));
scan(path.resolve('./components'));
console.log(JSON.stringify(brokenList, null, 2));
