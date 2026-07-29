import * as path from 'path';
import { colors, runProcess } from './helpers/processRunner';

(async () => {
  console.log(`${colors.cyan}--- Starting Dual Smoke Test (Admin + Guest) - HEADLESS ---${colors.reset}\n`);

  const adminScript = path.join(__dirname, 'run-admin-nav.ts');
  const guestScript = path.join(__dirname, 'run-smoke-guest.ts');

  // Run sequentially to avoid multiple terminal windows
  await runProcess('ADMIN', adminScript, colors.green, { SMOKE_HEADLESS: 'true' });
  await runProcess('GUEST', guestScript, colors.yellow, { SMOKE_HEADLESS: 'true' });


  console.log(`\n${colors.cyan}--- Both Smoke Tests Completed ---${colors.reset}`);
})();
