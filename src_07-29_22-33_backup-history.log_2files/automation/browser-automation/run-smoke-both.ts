import * as path from 'path';
import { clearReportsDirectory } from './helpers/reportCleaner';
import { colors, runProcess } from './helpers/processRunner';


(async () => {
  console.log(`${colors.cyan}--- Starting Dual Smoke Test (Admin + Guest) ---${colors.reset}\n`);

  // Clear reports directory before run
  const reportsDir = path.join(__dirname, 'reports');
  clearReportsDirectory(reportsDir);

  const adminScript = path.join(__dirname, 'run-admin-nav.ts');
  const guestScript = path.join(__dirname, 'run-smoke-guest.ts');

  // Run sequentially to avoid multiple terminal windows
  await runProcess('ADMIN', adminScript, colors.green);
  await runProcess('GUEST', guestScript, colors.yellow);

  console.log(`\n${colors.cyan}--- Both Smoke Tests Completed ---${colors.reset}`);
})();
