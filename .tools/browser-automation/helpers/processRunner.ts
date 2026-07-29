import { spawn } from 'child_process';

export const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m'
};

export function runProcess(name: string, script: string, color: string, extraEnv: Record<string, string> = {}) {
  return new Promise<void>((resolve) => {
    const isHeadless = !!extraEnv.SMOKE_HEADLESS;
    const proc = spawn('npx', ['tsx', script], {
      cwd: process.cwd(),
      stdio: isHeadless ? ['inherit', 'pipe', 'pipe'] : 'inherit',
      shell: true,
      windowsHide: true,
      env: { ...process.env, ...extraEnv }
    });

    if (isHeadless) {
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
    }

    proc.on('close', (code) => {
      console.log(`${color}[${name}] Process exited with code ${code}${colors.reset}`);
      resolve();
    });
  });
}
