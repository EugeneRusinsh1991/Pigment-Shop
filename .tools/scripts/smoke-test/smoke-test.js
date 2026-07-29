const { chromium } = require('playwright');
const { safeClick, safeFill } = require('./smoke-test.helpers');
const { testPage, runWithConcurrency } = require('./smoke-test.runner');
const { saveSmokeTestReport } = require('./smoke-test.report');

const BASE_URL = 'http://localhost:8081';

async function runSmokeTest() {
  console.log('Launching headless browser for smoke test...');
  const browser = await chromium.launch({ headless: true });
  
  const report = {
    pages: {},
    summary: {
      pagesVisited: 0,
      pagesSkipped: 0,
      totalInteractionsAttempted: 0,
      successfulInteractions: 0,
      failedInteractions: 0,
      totalIssuesFound: 0
    },
    globalErrors: []
  };

  const runPageTest = (pageName, urlPath, runInteractions) =>
    testPage(browser, report, BASE_URL, pageName, urlPath, runInteractions);

  const doClick = (p, pd, sel, desc) => safeClick(p, pd, report, sel, desc);
  const doFill = (p, pd, sel, val, desc) => safeFill(p, pd, report, sel, val, desc);

  await runWithConcurrency([
    () => runPageTest('Home', '/', async (p, pd) => {
      await doFill(p, pd, 'input[placeholder="Поиск товаров…"]', 'lovely', 'Search Input');
      await doClick(p, pd, 'text=Каталог', 'Header Catalog Link');
    }),

    () => runPageTest('Catalog', '/catalog', async (p, pd) => {
      await doClick(p, pd, 'text=Category 1 RU', 'Category 1 RU Card');
    }),

    () => runPageTest('Category Detail (Dynamic)', '/catalog/cat-root-0', async (p, pd) => {
      await doClick(p, pd, 'text=Subcategory 1-1 RU', 'Subcategory 1-1 RU Card');
    }),

    () => runPageTest('Products', '/products', async (p, pd) => {
      await doFill(p, pd, 'input[placeholder="0"]', '100', 'Min Price Input');
      await doFill(p, pd, 'input[placeholder="5000"]', '1000', 'Max Price Input');
    }),

    () => runPageTest('Product Detail (Dynamic)', '/product/prod-1-1-1-1', async (p, pd) => {
      await doClick(p, pd, 'svg >> xpath=..', 'Toggle Favorite Icon');
    }),

    () => runPageTest('Contact', '/contact', async (p, pd) => {
      await doFill(p, pd, 'textarea[placeholder="Напишите ваш вопрос здесь..."]', 'Hello, this is a smoke test inquiry.', 'Message Text Area');
      await doClick(p, pd, 'text=Задать вопрос', 'Submit Contact Form Button');
      await p.waitForTimeout(2000);
    }),

    () => runPageTest('Favorites', '/favorites', null),

    () => runPageTest('Login', '/login', async (p, pd) => {
      await doClick(p, pd, 'text=Создать аккаунт', 'Toggle Register Mode Link');
      await doFill(p, pd, 'input[placeholder="email@example.com"]', 'smoke-test@example.com', 'Email Input');
      await doFill(p, pd, 'input[placeholder="......"]', '12345678', 'Password Input');
    }),

    () => runPageTest('Profile', '/profile', async (p, pd) => {
      await doFill(p, pd, 'input[placeholder="Имя"]', 'Tester', 'First Name Input');
      await doFill(p, pd, 'input[placeholder="Фамилия"]', 'Bot', 'Last Name Input');
      await doFill(p, pd, 'input[placeholder="Город"]', 'St. Petersburg', 'City Input');
    }),

    () => runPageTest('Orders', '/orders', null),

    () => runPageTest('Cart', '/cart', null)
  ], 3);

  await browser.close();
  saveSmokeTestReport(report);
}

runSmokeTest().catch(err => {
  console.error('Smoke test runner crashed:', err);
  process.exit(1);
});
