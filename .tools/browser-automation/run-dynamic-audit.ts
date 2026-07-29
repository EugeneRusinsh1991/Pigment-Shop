import { chromium, Page } from 'playwright';
import { auditUIArchitecture } from './auditors/01-dynamic-ui-architecture-auditor';
import { auditRawI18n } from './auditors/02-dynamic-raw-i18n-auditor';
import { auditBrokenUI } from './auditors/03-dynamic-broken-ui-auditor';
import { RuntimeHealthAuditor } from './auditors/04-dynamic-runtime-health-auditor';
import { writeDynamicReport } from './helpers/dynamic-report-writer';

async function runAuditsForScope(page: Page, url: string, scope: 'public' | 'admin', sessionId: string = 'single') {
  console.log(`Starting ${scope} audits for ${url}`);
  
  // Start the health auditor before navigating to capture load errors
  const healthAuditor = new RuntimeHealthAuditor(page, scope, sessionId);
  healthAuditor.start();

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  } catch (err) {
    console.warn(`Failed to navigate to ${url}: ${err}`);
  }

  // Run the page evaluators
  console.log(`Evaluating UI Architecture on ${scope}...`);
  const uiArchitectureViolations = await auditUIArchitecture(page, url, scope);
  
  console.log(`Evaluating Raw I18n on ${scope}...`);
  const rawI18nViolations = await auditRawI18n(page, url, scope);
  
  console.log(`Evaluating Broken UI on ${scope}...`);
  const brokenUIViolations = await auditBrokenUI(page, url, scope);
  
  console.log(`Evaluating Runtime Health on ${scope}...`);
  const healthViolations = healthAuditor.getViolations();

  // Write reports
  writeDynamicReport('01', 'ui-architecture', scope, uiArchitectureViolations, sessionId);
  writeDynamicReport('02', 'raw-i18n', scope, rawI18nViolations, sessionId);
  writeDynamicReport('03', 'broken-ui', scope, brokenUIViolations, sessionId);
  writeDynamicReport('04', 'runtime-health', scope, healthViolations, sessionId);
}

async function runDynamicAudits() {
  const browser = await chromium.launch({ headless: true });
  
  const publicContext = await browser.newContext();
  const publicPage = await publicContext.newPage();
  
  const adminContext = await browser.newContext();
  const adminPage = await adminContext.newPage();
  
  // Defaulting to Expo Web dev server standard ports
  const publicUrl = 'http://localhost:8081/';
  const adminUrl = 'http://localhost:8081/admin'; // Fallback if there is an admin route

  try {
    console.log('Running dynamic audits...');
    
    // Run public scope
    await runAuditsForScope(publicPage, publicUrl, 'public');

    // Run admin scope
    await runAuditsForScope(adminPage, adminUrl, 'admin');

    console.log('Dynamic audits completed successfully. Check .logs/dynamic-browser-log/ for logs.');
  } catch (err) {
    console.error('Error running dynamic audits:', err);
  } finally {
    await browser.close();
  }
}

// runDynamicAudits(); // Disabled - only static audits should run
