import * as fs from 'fs';
import * as path from 'path';
import { runSmokeAutomation } from './smoke-automation';
import { ensureDevServer } from './helpers/devServerHelper';
import { validateAuthEnv } from './helpers/envValidator';

(async () => {
  console.log('--- Starting Event-Driven Smoke Automation ---');
  await ensureDevServer('http://localhost:8081', 45);

  const authCredentials = validateAuthEnv();

  // Clean up old smoke report if it exists
  const reportPath = path.join(__dirname, 'reports', 'smoke-report.json');
  if (fs.existsSync(reportPath)) {
    try {
      fs.unlinkSync(reportPath);
    } catch {
      // Ignore deletion errors
    }
  }
  const report = await runSmokeAutomation(
    {}, // SmokeConfig
    {   // ExplorerConfig
      diagnosticMode: true,
      maxInteractions: 500,
      maxDepth: 3,
      maxCategories: 1,
      maxProductsPerCategory: 1,
      context: 'admin',
      interactionPolicyConfig: {
        policies: {
          listGroup: { sample: 1, strategy: 'first-n' },
          gridGroup: { sample: 1, strategy: 'first-n' },
          carouselGroup: { sample: 1, strategy: 'first-n' },
          buttonGroup: { sample: 15 }
        }
      } as any,
      authentication: {
        enabled: true,
        provider: 'admin',
        loginUrl: '/login',
        username: authCredentials.username,
        password: authCredentials.password,
        usernameSelector: '[data-testid="login-email-input"], input[type="email"]',
        passwordSelector: '[data-testid="login-password-input"], input[type="password"]',
        submitSelector: '[data-testid="login-submit-button"]'
      }
    }
  );
  console.log('--- Smoke Automation Completed ---');

  // Save report to disk
  const reportsDir = path.join(__dirname, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const filePath = path.join(reportsDir, 'smoke-report.json');
  fs.writeFileSync(filePath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`\n📄 Report saved to file: ${filePath}`);
})();
