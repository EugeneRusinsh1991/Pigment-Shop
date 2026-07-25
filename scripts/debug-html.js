const { chromium } = require('playwright');
const fs = require('fs');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:8081', { waitUntil: 'load' });
  await page.waitForTimeout(5000); // wait 5 seconds for full render
  
  const html = await page.evaluate(() => document.getElementById('root').innerHTML);
  fs.writeFileSync('scripts/root-html.txt', html);
  console.log('Saved root HTML to scripts/root-html.txt');
  
  await browser.close();
}

main().catch(console.error);
