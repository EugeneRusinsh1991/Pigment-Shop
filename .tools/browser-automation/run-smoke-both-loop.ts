import { spawn } from 'child_process';
import * as path from 'path';
import { clearReportsDirectory } from './helpers/reportCleaner';

const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

const LOOP_DELAY_MS = 5000; // 5 seconds between iterations
const MAX_ITERATIONS = Infinity; // Set to number to limit, or Infinity for endless

function runProcess(name: string, script: string, color: string) {
  const proc = spawn('npx', ['tsx', script], {
    cwd: process.cwd(),
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: true,
    env: { 
      ...process.env, 
      SMOKE_HEADLESS: 'true',
      DISABLE_MD_REPORT: 'true' // Disable MD report generation in loop mode
    }
  });

  proc.stdout?.on('data', (data) => {
    const lines = data.toString().split('\n').filter((line: string) => line.trim());
    lines.forEach((line: string) => {
      console.log(`${color}[${name}]${colors.reset} ${line}`);
    });
  });

  proc.stderr?.on('data', (data) => {
    const lines = data.toString().split('\n').filter((line: string) => line.trim());
    lines.forEach((line: string) => {
      console.log(`${color}[${name}]${colors.reset} ${line}`);
    });
  });

  return proc;
}

async function runIteration(iteration: number): Promise<void> {
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}=== LOOP ITERATION #${iteration} ===${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════════${colors.reset}\n`);

  const adminScript = path.join(__dirname, 'run-admin-nav.ts');
  const guestScript = path.join(__dirname, 'run-smoke-guest.ts');

  const adminProc = runProcess('ADMIN', adminScript, colors.green);
  const guestProc = runProcess('GUEST', guestScript, colors.yellow);

  await Promise.all([
    new Promise<void>((resolve) => {
      adminProc.on('close', () => resolve());
    }),
    new Promise<void>((resolve) => {
      guestProc.on('close', () => resolve());
    })
  ]);

  console.log(`\n${colors.green}✅ Iteration #${iteration} completed${colors.reset}`);

  // Clean old JSON reports by type (keep 3 per type)
  const reportsDir = path.join(__dirname, 'reports');
  cleanOldReportsByType(reportsDir, 3);
}

(async () => {
  console.log(`${colors.cyan}--- Starting Infinite Loop Smoke Test (Admin + Guest) - HEADLESS ---${colors.reset}`);
  console.log(`${colors.yellow}⚠️  Press Ctrl+C to stop the loop${colors.reset}\n`);

  // Clear reports directory before starting loop
  const reportsDir = path.join(__dirname, 'reports');
  clearReportsDirectory(reportsDir);

  let iteration = 0;

  try {
    while (iteration < MAX_ITERATIONS) {
      iteration++;
      await runIteration(iteration);

      if (iteration < MAX_ITERATIONS) {
        console.log(`${colors.yellow}⏳ Waiting ${LOOP_DELAY_MS / 1000}s before next iteration...${colors.reset}`);
        await new Promise(resolve => setTimeout(resolve, LOOP_DELAY_MS));
      }
    }

    console.log(`\n${colors.green}=== Loop completed after ${iteration} iterations ===${colors.reset}`);
  } catch (error: any) {
    console.error(`${colors.red}❌ Loop stopped due to error: ${error.message}${colors.reset}`);
    process.exit(1);
  }
})();
