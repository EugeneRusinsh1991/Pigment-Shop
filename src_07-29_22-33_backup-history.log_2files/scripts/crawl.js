const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:8081';

const routesToTest = [
  { name: 'Home', path: '/' },
  { name: 'Catalog', path: '/catalog' },
  { name: 'Products', path: '/products' },
  { name: 'Contact', path: '/contact' },
  { name: 'Favorites', path: '/favorites' },
  { name: 'Login', path: '/login' },
  { name: 'Profile', path: '/profile' },
  { name: 'Orders', path: '/orders' },
  { name: 'Cart', path: '/cart' }
];

function normalizeText(text) {
  return (text || '').trim().replace(/\s+/g, ' ');
}

function getElementId(el) {
  return el.id || el.getAttribute('data-testid') || '';
}

function extractPageElements() {
  const interactive = [];

  document.querySelectorAll('a, [role="link"]').forEach(el => {
    const text = normalizeText(el.innerText || el.textContent);
    const href = el.getAttribute('href') || el.getAttribute('data-href') || '';
    if (text || href) {
      interactive.push({ type: 'link', text, href, id: getElementId(el) });
    }
  });

  document.querySelectorAll('button, [role="button"]').forEach(el => {
    const text = normalizeText(el.innerText || el.textContent);
    if (text) {
      interactive.push({ type: 'button', text, id: getElementId(el) });
    }
  });

  document.querySelectorAll('input, textarea, select').forEach(el => {
    interactive.push({
      type: 'input',
      placeholder: el.getAttribute('placeholder') || '',
      name: el.getAttribute('name') || '',
      id: getElementId(el)
    });
  });

  return interactive;
}

function parseRelPath(href) {
  if (!href) return '';
  if (!href.startsWith('http')) return href;
  try {
    return new URL(href).pathname;
  } catch (e) {
    return href;
  }
}

async function analyzePage(page, results, routeName, routePath) {
  const url = `${BASE_URL}${routePath}`;
  console.log(`Navigating to ${routeName} (${url})...`);

  try {
    await page.goto(url, { waitUntil: 'load', timeout: 10000 });
    await page.waitForSelector('#root div', { timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(3000);

    const title = await page.title();
    const currentUrl = page.url();
    const elements = await page.evaluate(extractPageElements);

    results.pages[routeName] = {
      name: routeName,
      path: routePath,
      url: currentUrl,
      title: title,
      elements: elements
    };

    const dynamicLinks = elements.filter(el => el.href && (el.href.includes('/catalog/') || el.href.includes('/product/')));
    dynamicLinks.forEach(dl => {
      if (!results.discoveredLinks.some(x => x.href === dl.href)) {
        results.discoveredLinks.push(dl);
      }
    });

  } catch (err) {
    console.error(`Error analyzing ${routeName}:`, err.message);
    results.errors.push(`Navigation to ${routeName} (${url}) failed: ${err.message}`);
  }
}

async function processDynamicLinks(page, results) {
  const links = results.discoveredLinks || [];
  const targets = [
    { pattern: '/catalog/', label: 'Category Detail (Dynamic)' },
    { pattern: '/product/', label: 'Product Detail (Dynamic)' }
  ];

  for (const { pattern, label } of targets) {
    const match = links.find(dl => dl.href && dl.href.includes(pattern));
    if (match) {
      await analyzePage(page, results, label, parseRelPath(match.href));
    }
  }
}

async function crawl() {
  console.log('Launching headless browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });

  const page = await context.newPage();

  const results = {
    pages: {},
    errors: [],
    logs: [],
    discoveredLinks: []
  };

  page.on('console', msg => {
    results.logs.push({ type: msg.type(), text: msg.text() });
    if (msg.type() === 'error') {
      results.errors.push(`Console error: ${msg.text()}`);
    }
  });

  page.on('pageerror', err => {
    results.errors.push(`Page error: ${err.message}`);
  });

  for (const route of routesToTest) {
    await analyzePage(page, results, route.name, route.path);
  }

  console.log(`Discovered dynamic links: ${results.discoveredLinks.map(l => l.href).join(', ')}`);
  await processDynamicLinks(page, results);

  await browser.close();

  const outPath = path.join(__dirname, 'crawl-results.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`Crawl completed. Results saved to ${outPath}`);
}

crawl().catch(err => {
  console.error('Crawl runner crashed:', err);
  process.exit(1);
});

