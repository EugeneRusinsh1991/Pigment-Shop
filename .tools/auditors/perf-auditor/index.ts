import { spawnSync } from 'child_process';
import path from 'path';
import { runInteractiveMode } from './interactive-runner';

async function main() {
  const isInteractive = process.env.LAG_INTERACTIVE === 'true' || process.argv.includes('--interactive');

  if (isInteractive) {
    await runInteractiveMode();
  } else {
    console.log('[PERF AUDIT] Running automated Playwright performance audit spec...');
    const specPath = path.relative(process.cwd(), path.join(__dirname, 'lag-detector.spec.ts')).replace(/\\/g, '/');
    const result = spawnSync('npx', ['playwright', 'test', specPath], {
      stdio: 'inherit',
      shell: true,
      env: process.env,
    });
    process.exit(result.status ?? 0);
  }
}

main().catch((err) => {
  console.error('[PERF AUDIT FATAL]', err);
  process.exit(1);
});
