/**
 * run-smoke-mocks.ts
 *
 * Smoke test entry point that runs the full UI automation suite against
 * the deterministic mock data layer (EXPO_PUBLIC_USE_MOCKS=true).
 *
 * Usage:
 *   npx ts-node .tools/browser-automation/run-smoke-mocks.ts
 *   # or via npm script: npm run smoke:mocks
 */

import * as fs from 'fs';
import * as path from 'path';
import { withMockMode } from './helpers/mockSeedHelper';
import { runSmokeAutomation } from './smoke-automation';
import { ensureDevServer } from './helpers/devServerHelper';
import { validateAuthEnv } from './helpers/envValidator';

withMockMode({ delayMs: 0 }); // Zero delay for faster E2E runs

(async () => {
  console.log('--- Starting Smoke Automation (MOCK MODE) ---');
  await ensureDevServer('http://localhost:8081', 50);

  const authCredentials = validateAuthEnv();

  const reportPath = path.join(__dirname, 'reports', 'smoke-report-mocks.json');
  if (fs.existsSync(reportPath)) {
    try { fs.unlinkSync(reportPath); } catch { /* ignore */ }
  }

  const report = await runSmokeAutomation(
    {},
    {
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
          buttonGroup: { sample: 15 },
        },
      } as any,
      authentication: {
        enabled: true,
        provider: 'admin',
        loginUrl: '/login',
        username: authCredentials.username,
        password: authCredentials.password,
        usernameSelector: '[data-testid="login-email-input"], input[type="email"]',
        passwordSelector: '[data-testid="login-password-input"], input[type="password"]',
        submitSelector: '[data-testid="login-submit-button"]',
      },
    }
  );

  console.log('--- Mock Smoke Automation Completed ---');

  const reportsDir = path.join(__dirname, 'reports');
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`\n📄 Mock report saved to: ${reportPath}`);
})();
