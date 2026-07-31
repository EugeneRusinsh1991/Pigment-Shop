// eslint-disable-next-line @typescript-eslint/no-var-requires
const { isServerRunning: isServerRunningCore, ensureDevServer: ensureDevServerCore } = require('./devServerCore.cjs');

export async function isServerRunning(urlStr: string): Promise<boolean> {
  return isServerRunningCore(urlStr);
}

export async function ensureDevServer(
  urlStr: string = 'http://localhost:8081',
  maxWaitSeconds = 50
): Promise<void> {
  return ensureDevServerCore(urlStr, maxWaitSeconds);
}

