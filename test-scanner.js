const { chromium } = require('playwright');
const tsx = require('tsx/cjs/api');
const { ElementScanner } = tsx.require('./.tools/browser-automation/explorer/ElementScanner.ts', __filename);

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent('<button>Hello</button><a href="#">Link</a><input type="text" />');
  
  console.log('Scanning page...');
  const scanner = new ElementScanner();
  try {
    const results = await scanner.scanPage(page);
    console.log('Results length:', results.length);
  } catch (err) {
    console.error('--- CAUGHT ERROR ---');
    console.error('Type:', err.name);
    console.error('Message:', err.message);
    console.error('Stack:', err.stack);
  }
  
  await browser.close();
})();
