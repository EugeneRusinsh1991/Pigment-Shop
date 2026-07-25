const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  try {
    await page.goto('http://localhost:8081', { waitUntil: 'domcontentloaded', timeout: 120000 });
    console.log('Page loaded domcontentloaded');
    await page.waitForTimeout(10000); // wait for js to run
    const rootHtml = await page.evaluate(() => {
      const root = document.getElementById('root');
      return root ? root.innerHTML : 'No root found';
    });
    console.log('Root HTML size:', rootHtml.length);
  } catch (e) {
    console.log('GOTO FAILED:', e.message);
  }
  
  await browser.close();
})();
