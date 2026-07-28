import { spawn } from 'child_process';
import * as http from 'http';
import * as path from 'path';

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

export async function ensureDevServer(urlStr: string = 'http://localhost:8081', maxWaitSeconds = 50): Promise<void> {
  const isUp = await isServerRunning(urlStr);
  if (isUp) {
    console.log(`✓ Dev server is already running at ${urlStr}`);
    return;
  }

  console.log(`⚠️ Dev server is not running at ${urlStr}. Starting it in background...`);
  const devProc = spawn('npm', ['run', 'dev'], {
    cwd: path.resolve(__dirname, '../../..'),
    stdio: 'ignore',
    shell: true,
    detached: true,
    windowsHide: true
  });
  devProc.unref();

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
