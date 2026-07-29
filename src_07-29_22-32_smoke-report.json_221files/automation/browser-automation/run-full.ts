import { execSync } from 'child_process';
import * as path from 'path';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

(async () => {
  console.log('==============================================');
  console.log('🚀 Starting Full Project Browser Automation');
  console.log('==============================================\n');

  console.log('--- Phase 1: Running Admin Explorer ---');
  try {
    execSync('npx tsx .tools/automation/browser-automation/run-admin-nav.ts', {
      cwd: path.resolve(__dirname, '../..'),
      stdio: 'inherit'
    });
  } catch (error) {
    console.error('⚠️ Admin Explorer completed with warnings or errors.');
  }

  console.log('\n⏳ Waiting 5 seconds before starting main application exploration...\n');
  await delay(5000);

  console.log('--- Phase 2: Running Standard Smoke Explorer ---');
  try {
    execSync('npx tsx .tools/automation/browser-automation/run-smoke.ts', {
      cwd: path.resolve(__dirname, '../..'),
      stdio: 'inherit'
    });
  } catch (error) {
    console.error('⚠️ Smoke Explorer completed with warnings or errors.');
  }

  console.log('\n==============================================');
  console.log('✓ Full Project Browser Automation Completed');
  console.log('==============================================\n');
})();
