import * as fs from 'fs';
import * as path from 'path';
import { runSmokeAutomation } from './smoke-automation';
import { ensureDevServer } from './helpers/devServerHelper';

(async () => {
  console.log('--- Starting Guest Smoke Automation ---');
  await ensureDevServer('http://localhost:8081', 50);

  // Clean up old smoke report if it exists
  const reportPath = path.join(__dirname, 'reports', 'smoke-report-guest.json');
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
      context: 'guest',
      interactionPolicyConfig: {
        policies: {
          listGroup: { sample: 1, strategy: 'first-n' },
          gridGroup: { sample: 1, strategy: 'first-n' },
          carouselGroup: { sample: 1, strategy: 'first-n' },
          buttonGroup: { sample: 15 }
        }
      } as any,
      authentication: {
        enabled: false
      }
    }
  );
  console.log('--- Guest Smoke Automation Completed ---');

  // Save report to disk
  const reportsDir = path.join(__dirname, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const filePath = path.join(reportsDir, 'smoke-report-guest.json');
  fs.writeFileSync(filePath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`\n📄 Report saved to file: ${filePath}`);
})();
