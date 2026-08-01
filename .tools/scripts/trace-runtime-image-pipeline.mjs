import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const userDataDir = path.resolve(__dirname, '../../.playwright/user-data');

async function runDetailedTrace() {
  console.log('=== STARTING DETAILED PLAYWRIGHT RUNTIME TRACE ===');
  
  const browser = await chromium.launchPersistentContext(userDataDir, {
    headless: true,
  });

  const page = browser.pages().length > 0 ? browser.pages()[0] : await browser.newPage();

  const consoleLogs = [];
  const networkEvents = [];
  const networkErrors = [];

  page.on('console', (msg) => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
  });

  page.on('pageerror', (err) => {
    consoleLogs.push({ type: 'pageerror', text: err.message || String(err) });
  });

  page.on('request', (req) => {
    networkEvents.push({ type: 'request', url: req.url(), resourceType: req.resourceType(), method: req.method() });
  });

  page.on('response', (res) => {
    const status = res.status();
    const url = res.url();
    networkEvents.push({ type: 'response', url, status });
    if (status >= 400) {
      networkErrors.push({ url, status, statusText: res.statusText() });
    }
  });

  console.log('Navigating directly to product catalog page http://localhost:8081...');
  await page.goto('http://localhost:8081', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Navigate to product page for Prod1111 or Product 1-1-1-1 UK
  console.log('Attempting navigation to product page...');
  const productLink = page.locator('text=Product 1-1-1-1').first();
  if (await productLink.isVisible().catch(() => false)) {
    console.log('Found product link, clicking...');
    await productLink.click();
  } else {
    console.log('Navigating directly to http://localhost:8081/product/Prod1111...');
    await page.goto('http://localhost:8081/product/Prod1111', { waitUntil: 'networkidle' });
  }

  await page.waitForTimeout(3000);
  console.log('Current URL:', page.url());

  // Deep inspection of DOM and React Fiber properties
  const runtimeDiagnostics = await page.evaluate(() => {
    function getReactProps(domNode) {
      if (!domNode) return null;
      const key = Object.keys(domNode).find(k => k.startsWith('__reactProps$') || k.startsWith('__reactFiber$'));
      if (!key) return null;
      return domNode[key];
    }

    // Inspect all image elements and views in the gallery area
    const allDivs = Array.from(document.querySelectorAll('div, img'));
    const imageContainerNodes = allDivs.filter(el => {
      const cls = el.className || '';
      return typeof cls === 'string' && (cls.includes('image') || cls.includes('Image') || cls.includes('thumbnail') || cls.includes('media'));
    });

    const fiberPropsCaptured = [];
    allDivs.forEach(el => {
      const key = Object.keys(el).find(k => k.startsWith('__reactFiber$'));
      if (key) {
        let fiber = el[key];
        let depth = 0;
        while (fiber && depth < 20) {
          if (fiber.memoizedProps) {
            const p = fiber.memoizedProps;
            if (p.product || p.images || p.uri || p.source) {
              fiberPropsCaptured.push({
                componentName: fiber.type?.displayName || fiber.type?.name || String(fiber.type),
                props: {
                  product: p.product ? { id: p.product.id, label: p.product.label, image: p.product.image, images: p.product.images } : undefined,
                  images: p.images,
                  uri: p.uri,
                  source: p.source,
                }
              });
            }
          }
          fiber = fiber.return;
          depth++;
        }
      }
    });

    const domImages = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      currentSrc: img.currentSrc,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete,
      clientWidth: img.clientWidth,
      clientHeight: img.clientHeight,
      outerHTML: img.outerHTML,
      computedStyle: {
        width: getComputedStyle(img).width,
        height: getComputedStyle(img).height,
        display: getComputedStyle(img).display,
        visibility: getComputedStyle(img).visibility,
        opacity: getComputedStyle(img).opacity,
        backgroundColor: getComputedStyle(img).backgroundColor,
      },
      parentElementInfo: img.parentElement ? {
        tagName: img.parentElement.tagName,
        className: img.parentElement.className,
        computedStyle: {
          width: getComputedStyle(img.parentElement).width,
          height: getComputedStyle(img.parentElement).height,
          display: getComputedStyle(img.parentElement).display,
          opacity: getComputedStyle(img.parentElement).opacity,
          backgroundColor: getComputedStyle(img.parentElement).backgroundColor,
        }
      } : null
    }));

    return {
      title: document.title,
      bodyTextSnippet: document.body.innerText.slice(0, 500),
      domImages,
      fiberPropsCaptured: fiberPropsCaptured.slice(0, 15),
    };
  });

  const report = {
    url: page.url(),
    consoleLogs,
    networkErrors,
    networkImageRequests: networkEvents.filter(e => e.url.includes('cloudinary') || e.url.includes('image') || e.url.includes('media') || e.url.includes('placeholder')),
    runtimeDiagnostics
  };

  fs.writeFileSync('./.logs/detailed-runtime-trace.json', JSON.stringify(report, null, 2));
  console.log('=== TRACE RECORDED TO .logs/detailed-runtime-trace.json ===');
  await browser.close();
}

runDetailedTrace().catch(console.error);
