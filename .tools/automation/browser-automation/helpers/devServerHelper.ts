// @ts-ignore
const devServerJS = require('./devServerHelper.js');

export async function isServerRunning(urlStr: string): Promise<boolean> {
  return devServerJS.isServerRunning(urlStr);
}

export async function ensureDevServer(
  urlStr: string = 'http://localhost:8081',
  maxWaitSeconds = 50
): Promise<void> {
  return devServerJS.ensureDevServer(urlStr, maxWaitSeconds);
}

