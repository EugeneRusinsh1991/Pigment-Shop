const fs = require('fs');
const path = require('path');
const { takeCompressedScreenshot } = require('../playwright.helpers');

function extractRouteEmail(route) {
  try {
    const data = route.request().postDataJSON();
    return data?.email || '';
  } catch (e) {
    return '';
  }
}

function isAuthEndpoint(url) {
  return url.includes('signUp') || url.includes('signInWithPassword') || url.includes('lookup') || url.includes('token');
}

function handleAuthRouteMock(route) {
  const requestUrl = route.request().url();
  if (!isAuthEndpoint(requestUrl)) {
    return route.continue();
  }

  const email = extractRouteEmail(route);
  if (!email.includes('smoke-test')) {
    return route.continue();
  }

  return route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({
      idToken: 'mock-id-token-12345',
      email,
      refreshToken: 'mock-refresh-token-12345',
      expiresIn: '3600',
      localId: 'smoke-user-uid',
      registered: true
    })
  });
}

function attachSmokePageListeners(page, pageName, report) {
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const errText = `[${pageName}] Console error: ${msg.text()}`;
      if (errText.includes('the server responded with a status of 400')) {
        return; // Ignore Firebase Auth API key/anonymous login errors for smoke test
      }
      if (!report.globalErrors.includes(errText)) {
        report.globalErrors.push(errText);
      }
    }
  });

  page.on('pageerror', err => {
    const errText = `[${pageName}] Page JS error: ${err.message}`;
    if (!report.globalErrors.includes(errText)) {
      report.globalErrors.push(errText);
    }
  });

  page.on('response', response => {
    if (response.status() === 400) {
      console.log(`[${pageName}] 400 Response URL: ${response.url()}`);
    }
  });

  page.route('**/identitytoolkit.googleapis.com/v1/accounts:*', (route) => handleAuthRouteMock(route));
  page.route('**/securetoken.googleapis.com/v1/token*', (route) => handleAuthRouteMock(route));
}

async function saveSmokeFailureArtifacts(page, pageName, urlPath, pageData) {
  if (pageData.detectedErrors.length === 0) return;
  const failuresDir = path.join(__dirname, 'failures');
  if (!fs.existsSync(failuresDir)) {
    fs.mkdirSync(failuresDir, { recursive: true });
  }
  const safePageName = pageName.replace(/[^a-zA-Z0-9]/g, '_');
  const screenshotPath = path.join(failuresDir, `${safePageName}_failure.jpg`);
  const reportPath = path.join(failuresDir, `${safePageName}_failure.md`);

  try {
    const screenshotBuffer = await takeCompressedScreenshot(page, { captureQuality: 80, exportQuality: 0.8, scale: 0.5 });
    fs.writeFileSync(screenshotPath, screenshotBuffer);
    pageData.screenshot = screenshotPath;

    try {
      const html = await page.content();
      fs.writeFileSync(path.join(failuresDir, `${safePageName}_html.html`), html);
    } catch (e) {}

    let failMd = `# Smoke Test Failure - ${pageName}\n\n* **Route**: \`${urlPath}\`\n* **Timestamp**: ${new Date().toISOString()}\n\n## ❌ Detected Errors\n\n`;
    pageData.detectedErrors.forEach(err => {
      failMd += `- ${err}\n`;
    });
    failMd += `\n## 🖼️ Screenshot\n\n![Failure Screenshot](file:///${screenshotPath.replace(/\\/g, '/')})\n`;

    fs.writeFileSync(reportPath, failMd);
    pageData.failureReport = reportPath;
  } catch (e) {}
}

async function testPage(browser, report, BASE_URL, pageName, urlPath, runInteractions) {
  const url = `${BASE_URL}${urlPath}`;
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  attachSmokePageListeners(page, pageName, report);
  report.summary.pagesVisited++;

  const pageData = {
    name: pageName,
    path: urlPath,
    testedInteractions: [],
    successfulInteractions: [],
    failedInteractions: [],
    detectedErrors: [],
    issues: []
  };

  try {
    await page.goto(url, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(3000);

    const currentUrl = page.url();
    if (!currentUrl.includes(urlPath) && urlPath !== '/') {
      pageData.detectedErrors.push(`Redirected unexpectedly. Expected path: ${urlPath}, got: ${currentUrl}`);
    }

    if (runInteractions) {
      await runInteractions(page, pageData);
    }
  } catch (err) {
    pageData.detectedErrors.push(`Page failed to load: ${err.message}`);
  } finally {
    await saveSmokeFailureArtifacts(page, pageName, urlPath, pageData);
    await context.close();
  }

  report.pages[pageName] = pageData;
}

async function runWithConcurrency(tasks, limit) {
  const results = [];
  const executing = [];
  for (const task of tasks) {
    const p = Promise.resolve().then(() => task());
    results.push(p);
    if (limit <= tasks.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(results);
}

module.exports = { testPage, runWithConcurrency };
