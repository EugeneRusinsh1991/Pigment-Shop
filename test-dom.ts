import { chromium } from 'playwright';
import { resolveExecutionContext } from './.tools/browser-automation/execution-context';

(async () => {
  const browser = await chromium.launch();
  let page = await browser.newPage();
  
  const config = {
      baseUrl: 'http://localhost:8081',
      authentication: {
        enabled: true,
        provider: 'admin',
        loginUrl: '/login',
        username: 'admin@pigment-shop.com',
        password: 'admin123456',
        usernameSelector: '[data-testid="login-email-input"], input[type="email"]',
        passwordSelector: '[data-testid="login-password-input"], input[type="password"]',
        submitSelector: '[data-testid="login-submit-button"]'
      }
  };

  const ctx = resolveExecutionContext('admin');
  page = await ctx.prepare(page, config as any);
  
  await page.goto('http://localhost:8081/admin', {waitUntil: 'domcontentloaded'});
  await page.waitForTimeout(2000);
  
  const content = await page.content();
  console.log('--- HTML CONTENT ---');
  console.log(content.substring(0, 1000));
  console.log('...');
  console.log(content.substring(content.length - 1000));
  
  const elements = await page.evaluate(() => {
    return document.body.innerHTML;
  });
  console.log('--- BODY INNERHTML LENGTH ---', elements.length);
  
  await browser.close();
})();
