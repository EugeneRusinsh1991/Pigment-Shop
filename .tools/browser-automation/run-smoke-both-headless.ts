import { spawn } from 'child_process';
import * as path from 'path';

const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m'
};

function runProcess(name: string, script: string, color: string) {
  return new Promise<void>((resolve) => {
    const proc = spawn('npx', ['tsx', script], {
      cwd: process.cwd(),
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: true,
      windowsHide: true,
      env: { ...process.env, SMOKE_HEADLESS: 'true' }
    });

    proc.stdout?.on('data', (data) => {
      const lines = data.toString().split('\n').filter(line => line.trim());
      lines.forEach(line => {
        console.log(`${color}[${name}]${colors.reset} ${line}`);
      });
    });

    proc.stderr?.on('data', (data) => {
      const lines = data.toString().split('\n').filter(line => line.trim());
      lines.forEach(line => {
        console.log(`${color}[${name}]${colors.reset} ${line}`);
      });
    });

    proc.on('close', (code) => {
      console.log(`${color}[${name}] Process exited with code ${code}${colors.reset}`);
      resolve();
    });
  });
}

(async () => {
  console.log(`${colors.cyan}--- Starting Dual Smoke Test (Admin + Guest) - HEADLESS ---${colors.reset}\n`);

  const adminScript = path.join(__dirname, 'run-admin-nav.ts');
  const guestScript = path.join(__dirname, 'run-smoke-guest.ts');

  // Run sequentially to avoid multiple terminal windows
  await runProcess('ADMIN', adminScript, colors.green);
  await runProcess('GUEST', guestScript, colors.yellow);

  console.log(`\n${colors.cyan}--- Both Smoke Tests Completed ---${colors.reset}`);
})();
