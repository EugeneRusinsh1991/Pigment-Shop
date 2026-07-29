import { spawn } from 'child_process';

const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m'
};

export function attachPrefixedLogging(proc: { stdout: any; stderr: any }, prefix: string) {
  const handler = (data: any) => {
    const lines = data.toString().split('\n').filter((line: string) => line.trim());
    lines.forEach((line: string) => {
      console.log(`${prefix} ${line}`);
    });
  };
  proc.stdout?.on('data', handler);
  proc.stderr?.on('data', handler);
}

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
      attachPrefixedLogging(proc, `${color}[${name}]${colors.reset}`);
    }

    proc.on('close', (code) => {
      console.log(`${color}[${name}] Process exited with code ${code}${colors.reset}`);
      resolve();
    });
  });
}
