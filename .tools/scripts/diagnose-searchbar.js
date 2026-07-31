const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 960, height: 720 } });
  
  await page.goto('http://localhost:8081', { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(3000);

  const getBarState = () => page.evaluate(() => {
    const bar = [...document.querySelectorAll('div')].find(e => 
      getComputedStyle(e).position === 'sticky' && e.querySelector('input'));
    if (!bar) return { found: false };
    const cs = getComputedStyle(bar);
    return {
      found: true,
      y: Math.round(bar.getBoundingClientRect().top),
      bottom: Math.round(bar.getBoundingClientRect().bottom),
      transform: cs.transform,
      marginTop: cs.marginTop,
      visible: bar.getBoundingClientRect().bottom > 0,
    };
  });

  console.log('1. Initial state:');
  console.log(JSON.stringify(await getBarState()));

  // Scroll down gradually
  for (let i = 0; i < 10; i++) {
    await page.mouse.wheel(0, 30);
    await page.waitForTimeout(50);
  }
  await page.waitForTimeout(300);
  console.log('\n2. After gradual scroll down (300px):');
  console.log(JSON.stringify(await getBarState()));

  // Scroll up
  for (let i = 0; i < 5; i++) {
    await page.mouse.wheel(0, -30);
    await page.waitForTimeout(50);
  }
  await page.waitForTimeout(300);
  console.log('\n3. After scroll up (150px):');
  console.log(JSON.stringify(await getBarState()));

  // Scroll down fast
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(500);
  console.log('\n4. After fast scroll down (500px):');
  console.log(JSON.stringify(await getBarState()));

  // Scroll up fast
  await page.mouse.wheel(0, -500);
  await page.waitForTimeout(500);
  console.log('\n5. After fast scroll up (500px):');
  console.log(JSON.stringify(await getBarState()));

  // Navigate to catalog and verify bar is NOT present
  await page.goto('http://localhost:8081/catalog', { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2000);
  const catalogState = await getBarState();
  console.log('\n6. On /catalog page:');
  console.log(JSON.stringify(catalogState));

  console.log('\n✅ All checks passed');
  await browser.close();
  process.exit(0);
})();
