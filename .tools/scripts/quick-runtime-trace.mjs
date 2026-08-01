import { chromium } from 'playwright';

async function quickTrace() {
  console.log('--- Quick Runtime Trace ---');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const logs = [];
  const imageRequests = [];
  page.on('console', msg => logs.push(`[CONSOLE ${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => logs.push(`[PAGE ERROR] ${err.message}`));
  page.on('request', req => {
    if (req.resourceType() === 'image' || req.url().includes('cloudinary') || req.url().includes('media')) {
      imageRequests.push({ url: req.url(), method: req.method() });
    }
  });

  console.log('Navigating to http://localhost:8081/product/prod-1-1-1-1 ...');
  await page.goto('http://localhost:8081/product/prod-1-1-1-1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  const productData = await page.evaluate(() => {
    // Traverse React Fiber nodes on DOM elements to find ProductPage or ProductImagePanel props
    let foundProduct = null;
    let foundImagesProp = null;

    const elements = Array.from(document.querySelectorAll('*'));
    for (const el of elements) {
      const key = Object.keys(el).find(k => k.startsWith('__reactFiber$'));
      if (!key) continue;
      let fiber = el[key];
      let depth = 0;
      while (fiber && depth < 30) {
        const props = fiber.memoizedProps;
        if (props) {
          if (props.product && !foundProduct) {
            foundProduct = props.product;
          }
          if (props.images && Array.isArray(props.images) && !foundImagesProp) {
            foundImagesProp = props.images;
          }
        }
        fiber = fiber.return;
        depth++;
      }
    }

    const imagesInDom = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      currentSrc: img.currentSrc,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      clientWidth: img.clientWidth,
      clientHeight: img.clientHeight,
      outerHTML: img.outerHTML,
    }));

    const backgroundImages = Array.from(document.querySelectorAll('*'))
      .map(el => getComputedStyle(el).backgroundImage)
      .filter(bg => bg && bg !== 'none');

    return {
      foundProduct,
      foundImagesProp,
      imagesInDom,
      backgroundImages,
      bodyText: document.body.innerText.slice(0, 400),
    };
  });

  console.log('PRODUCT DATA CAPTURED:', JSON.stringify(productData.foundProduct, null, 2));
  console.log('IMAGES PROP CAPTURED:', JSON.stringify(productData.foundImagesProp, null, 2));
  console.log('DOM IMAGES:', JSON.stringify(productData.imagesInDom, null, 2));
  console.log('BACKGROUND IMAGES:', JSON.stringify(productData.backgroundImages, null, 2));
  console.log('CONSOLE LOGS:', JSON.stringify(logs, null, 2));
  console.log('IMAGE REQUESTS:', JSON.stringify(imageRequests, null, 2));

  await browser.close();
}

quickTrace().catch(console.error);
