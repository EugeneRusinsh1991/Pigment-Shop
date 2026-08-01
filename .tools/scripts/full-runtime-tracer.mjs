import { chromium } from 'playwright';
import fs from 'fs';

async function runFullTracer() {
  console.log('=== STARTING FULL RUNTIME TRACER FOR PRODUCT DETAIL IMAGE PIPELINE ===');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const consoleLogs = [];
  const networkRequests = [];
  const networkResponses = [];
  const imageEvents = [];

  page.on('console', (msg) => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
  });

  page.on('pageerror', (err) => {
    consoleLogs.push({ type: 'pageerror', text: err.message || String(err) });
  });

  page.on('request', (req) => {
    networkRequests.push({ url: req.url(), resourceType: req.resourceType(), method: req.method() });
  });

  page.on('response', (res) => {
    networkResponses.push({ url: res.url(), status: res.status(), statusText: res.statusText() });
  });

  // Inject early script to attach listeners to <img> elements
  await page.addInitScript(() => {
    window.__IMAGE_EVENTS__ = [];
    const origImage = window.Image;
    window.addEventListener('error', (e) => {
      if (e.target && e.target.tagName === 'IMG') {
        window.__IMAGE_EVENTS__.push({ event: 'error', src: e.target.src, currentSrc: e.target.currentSrc });
      }
    }, true);
    window.addEventListener('load', (e) => {
      if (e.target && e.target.tagName === 'IMG') {
        window.__IMAGE_EVENTS__.push({ event: 'load', src: e.target.src, currentSrc: e.target.currentSrc, width: e.target.naturalWidth, height: e.target.naturalHeight });
      }
    }, true);
  });

  // Test both prod-1-1-1-1 and Prod1111
  let targetUrl = 'http://localhost:8081/product/prod-1-1-1-1';
  console.log(`Navigating to ${targetUrl}...`);
  await page.goto(targetUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  let title = await page.evaluate(() => document.title);
  let bodyText = await page.evaluate(() => document.body.innerText);

  if (bodyText.includes('404') || !bodyText.includes('Product')) {
    targetUrl = 'http://localhost:8081/product/Prod1111';
    console.log(`Fallback navigating to ${targetUrl}...`);
    await page.goto(targetUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
  }

  // Extract React Fiber components and props
  const fiberAnalysis = await page.evaluate(() => {
    const captured = {
      productPage: null,
      productImagePanel: null,
      productGalleryLayers: null,
      mediaRendererList: [],
      domImages: [],
      imageEvents: window.__IMAGE_EVENTS__ || [],
    };

    const elements = Array.from(document.querySelectorAll('*'));
    for (const el of elements) {
      const key = Object.keys(el).find(k => k.startsWith('__reactFiber$'));
      if (!key) continue;

      let fiber = el[key];
      let depth = 0;
      while (fiber && depth < 40) {
        const compName = fiber.type?.displayName || fiber.type?.name || (typeof fiber.type === 'string' ? fiber.type : null);
        const props = fiber.memoizedProps;

        if (compName === 'ProductPage' && !captured.productPage && props) {
          captured.productPage = {
            component: 'ProductPage',
            propsProduct: props.product,
          };
        }

        if (compName === 'ProductImagePanel' && !captured.productImagePanel && props) {
          captured.productImagePanel = {
            component: 'ProductImagePanel',
            propsProduct: props.product,
          };
        }

        if (compName === 'ProductGalleryLayers' && !captured.productGalleryLayers && props) {
          captured.productGalleryLayers = {
            component: 'ProductGalleryLayers',
            imagesProp: props.images,
            currentIndex: props.currentIndex,
            prevIndex: props.prevIndex,
          };
        }

        if (compName === 'MediaRenderer' && props) {
          captured.mediaRendererList.push({
            component: 'MediaRenderer',
            uri: props.uri,
            style: props.style,
            resizeMode: props.resizeMode,
          });
        }

        fiber = fiber.return;
        depth++;
      }
    }

    // Inspect DOM img elements
    const imgs = Array.from(document.querySelectorAll('img'));
    captured.domImages = imgs.map(img => ({
      src: img.src,
      currentSrc: img.currentSrc,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      clientWidth: img.clientWidth,
      clientHeight: img.clientHeight,
      outerHTML: img.outerHTML,
      className: img.className,
      styleAttr: img.getAttribute('style'),
      computedStyle: {
        width: getComputedStyle(img).width,
        height: getComputedStyle(img).height,
        display: getComputedStyle(img).display,
        visibility: getComputedStyle(img).visibility,
        opacity: getComputedStyle(img).opacity,
        position: getComputedStyle(img).position,
        inset: `${getComputedStyle(img).top} ${getComputedStyle(img).right} ${getComputedStyle(img).bottom} ${getComputedStyle(img).left}`,
        objectFit: getComputedStyle(img).objectFit,
      },
      parentElement: img.parentElement ? {
        tagName: img.parentElement.tagName,
        className: img.parentElement.className,
        computedStyle: {
          width: getComputedStyle(img.parentElement).width,
          height: getComputedStyle(img.parentElement).height,
          display: getComputedStyle(img.parentElement).display,
          opacity: getComputedStyle(img.parentElement).opacity,
          position: getComputedStyle(img.parentElement).position,
          overflow: getComputedStyle(img.parentElement).overflow,
        }
      } : null
    }));

    return captured;
  });

  const fullReport = {
    targetUrl,
    pageTitle: await page.evaluate(() => document.title),
    consoleLogs,
    networkRequests: networkRequests.filter(r => r.resourceType === 'image' || r.url.includes('cloudinary') || r.url.includes('media') || r.url.includes('assets')),
    networkResponses: networkResponses.filter(r => r.url.includes('cloudinary') || r.url.includes('media') || r.url.includes('assets') || r.status >= 400),
    fiberAnalysis,
  };

  fs.writeFileSync('./.logs/full-runtime-trace-report.json', JSON.stringify(fullReport, null, 2));
  console.log('=== TRACE REPORT WRITTEN TO .logs/full-runtime-trace-report.json ===');

  await browser.close();
}

runFullTracer().catch(console.error);
