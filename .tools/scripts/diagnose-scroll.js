const { chromium } = require('playwright');

(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 } });
  const p = await ctx.newPage();

  await p.goto('http://localhost:8081', { waitUntil: 'networkidle', timeout: 30000 });
  await p.waitForTimeout(3000);

  // Check if the search bar exists and has position:fixed
  const searchBarInfo = await p.evaluate(() => {
    const allDivs = document.querySelectorAll('div');
    for (const d of allDivs) {
      const cs = getComputedStyle(d);
      if (cs.position === 'fixed' && parseInt(cs.top) === 56) {
        return {
          found: true,
          position: cs.position,
          top: cs.top,
          transform: cs.transform,
          zIndex: cs.zIndex,
          height: cs.height,
          width: cs.width,
        };
      }
      if (cs.position === 'sticky') {
        return {
          found: true,
          note: 'Still sticky, not fixed!',
          position: cs.position,
          top: cs.top,
        };
      }
    }
    return { found: false };
  });

  console.log('Search bar state BEFORE scroll:', JSON.stringify(searchBarInfo, null, 2));

  // Scroll down with wheel events
  await p.mouse.wheel(0, 300);
  await p.waitForTimeout(500);

  const afterScrollDown = await p.evaluate(() => {
    const allDivs = document.querySelectorAll('div');
    for (const d of allDivs) {
      const cs = getComputedStyle(d);
      if (cs.position === 'fixed' && parseInt(cs.top) === 56) {
        return {
          position: cs.position,
          transform: cs.transform,
          top: cs.top,
        };
      }
    }
    return { notFound: true };
  });

  console.log('Search bar state AFTER scroll down:', JSON.stringify(afterScrollDown, null, 2));

  // Scroll back up
  await p.mouse.wheel(0, -300);
  await p.waitForTimeout(500);

  const afterScrollUp = await p.evaluate(() => {
    const allDivs = document.querySelectorAll('div');
    for (const d of allDivs) {
      const cs = getComputedStyle(d);
      if (cs.position === 'fixed' && parseInt(cs.top) === 56) {
        return {
          position: cs.position,
          transform: cs.transform,
          top: cs.top,
        };
      }
    }
    return { notFound: true };
  });

  console.log('Search bar state AFTER scroll up:', JSON.stringify(afterScrollUp, null, 2));

  await b.close();
  process.exit(0);
})();
