import { spawn } from 'child_process';
import * as path from 'path';
import { clearReportsDirectory } from './helpers/reportCleaner';

const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m'
};

function runProcess(name: string, script: string, color: string) {
  const proc = spawn('npx', ['tsx', script], {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: true
  });

  proc.on('close', (code) => {
    console.log(`${color}[${name}] Process exited with code ${code}${colors.reset}`);
  });

  return proc;
}

(async () => {
  console.log(`${colors.cyan}--- Starting Dual Smoke Test (Admin + Guest) ---${colors.reset}\n`);

  // Clear reports directory before run
  const reportsDir = path.join(__dirname, 'reports');
  clearReportsDirectory(reportsDir);

  const adminScript = path.join(__dirname, 'run-admin-nav.ts');
  const guestScript = path.join(__dirname, 'run-smoke-guest.ts');

  const adminProc = runProcess('ADMIN', adminScript, colors.green);
  const guestProc = runProcess('GUEST', guestScript, colors.yellow);

  // Wait for both processes to complete
  await Promise.all([
    new Promise<void>((resolve) => {
      adminProc.on('close', () => resolve());
    }),
    new Promise<void>((resolve) => {
      guestProc.on('close', () => resolve());
    })
  ]);

  console.log(`\n${colors.cyan}--- Both Smoke Tests Completed ---${colors.reset}`);
})();
