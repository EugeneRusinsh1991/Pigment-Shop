const http = require('http');

async function isServerRunning(urlStr) {
  return new Promise((resolve) => {
    try {
      const u = new URL(urlStr);
      const req = http.get(
        {
          hostname: u.hostname,
          port: u.port,
          path: u.pathname,
          timeout: 2000,
        },
        (res) => {
          resolve(res.statusCode !== undefined && res.statusCode < 500);
        }
      );
      req.on('error', () => resolve(false));
      req.on('timeout', () => {
        req.destroy();
        resolve(false);
      });
    } catch {
      resolve(false);
    }
  });
}

async function ensureDevServer(urlStr = 'http://localhost:8081', maxWaitSeconds = 50) {
  if (await isServerRunning(urlStr)) {
    console.log(`✓ Dev server is active at ${urlStr}`);
    return;
  }

  console.log(`⏳ Dev server not ready at ${urlStr}. Waiting up to ${maxWaitSeconds}s...`);
  const startTime = Date.now();
  while (Date.now() - startTime < maxWaitSeconds * 1000) {
    await new Promise((res) => setTimeout(res, 2000));
    if (await isServerRunning(urlStr)) {
      console.log(`✓ Dev server is now ready at ${urlStr}!`);
      return;
    }
  }
  console.warn(`⚠️ Dev server at ${urlStr} did not respond within ${maxWaitSeconds}s.`);
}

module.exports = { isServerRunning, ensureDevServer };
