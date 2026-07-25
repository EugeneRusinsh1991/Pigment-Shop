import * as path from 'path';
import * as http from 'http';
import { spawn } from 'child_process';

export async function isServerRunning(urlStr: string): Promise<boolean> {
  return new Promise((resolve) => {
    const req = http.get(urlStr, (res) => {
      resolve(res.statusCode !== undefined && res.statusCode < 500);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

export async function ensureDevServer(urlStr: string = 'http://localhost:8081', maxWaitSeconds = 45): Promise<void> {
  const isUp = await isServerRunning(urlStr);
  if (isUp) {
    console.log(`✓ Dev server is already running at ${urlStr}`);
    return;
  }

  console.log(`⚠️ Dev server is not running at ${urlStr}. Starting 'npm run dev' in a separate terminal window...`);
  if (process.platform === 'win32') {
    const devProc = spawn('cmd.exe', ['/c', 'start', 'cmd', '/k', 'npm run dev'], {
      cwd: path.resolve(__dirname, '../../..'),
      stdio: 'ignore',
      shell: true,
      detached: true
    });
    devProc.unref();
  } else {
    const devProc = spawn('npm', ['run', 'dev'], {
      cwd: path.resolve(__dirname, '../../..'),
      stdio: 'ignore',
      shell: true,
      detached: true
    });
    devProc.unref();
  }

  console.log(`⏳ Waiting up to ${maxWaitSeconds}s for dev server to respond...`);
  const startTime = Date.now();
  while (Date.now() - startTime < maxWaitSeconds * 1000) {
    await new Promise((res) => setTimeout(res, 2000));
    if (await isServerRunning(urlStr)) {
      console.log(`✓ Dev server is now ready at ${urlStr}!`);
      return;
    }
  }
  console.warn(`⚠️ Timeout waiting for dev server at ${urlStr}. Proceeding with smoke test...`);
}
