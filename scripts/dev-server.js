const http = require('http');
const fs = require('fs');
const path = require('path');
const { cleanOldFiles } = require('./cleanOldFiles');
const { generateMarkdownReport } = require('./devServerReport');

const PORT = 8082;
const BASE_LOG_DIR = process.env.LOG_DIR || path.join(__dirname, '..', '.logs');
const SCREENSHOTS_DIR = path.join(BASE_LOG_DIR, 'screenshots');
const LOGS_DIR = path.join(BASE_LOG_DIR, 'logs');
const STATE_DIR = path.join(BASE_LOG_DIR, 'state');
const REPORTS_DIR = path.join(BASE_LOG_DIR, 'reports');

const MAX_HISTORY_FILES = 5;
const MAX_PAYLOAD_BYTES = 10 * 1024 * 1024; // 10MB limit

[SCREENSHOTS_DIR, LOGS_DIR, STATE_DIR, REPORTS_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const pendingStates = new Map();

function sendJsonResponse(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function handleSaveState(parsedBody, res) {
  const { state, diagnostics, timestamp } = parsedBody;
  pendingStates.set(timestamp, { state, diagnostics });

  const latestStatePath = path.join(STATE_DIR, 'state.json');
  fs.writeFileSync(latestStatePath, JSON.stringify(state, null, 2), 'utf8');

  const historyStatePath = path.join(STATE_DIR, `state_${timestamp}.json`);
  fs.writeFileSync(historyStatePath, JSON.stringify(state, null, 2), 'utf8');

  cleanOldFiles(STATE_DIR, MAX_HISTORY_FILES, '.json');
  sendJsonResponse(res, 200, { success: true });
}

function handleSaveScreenshot(parsedBody, res) {
  const { image, timestamp } = parsedBody;
  if (!image) {
    sendJsonResponse(res, 400, { error: 'No image data' });
    return;
  }

  const base64Data = image.replace(/^data:image\/jpeg;base64,/, '');

  const latestScreenshotPath = path.join(SCREENSHOTS_DIR, 'screenshot.jpg');
  fs.writeFileSync(latestScreenshotPath, base64Data, 'base64');

  const historyScreenshotPath = path.join(SCREENSHOTS_DIR, `screenshot_${timestamp}.jpg`);
  fs.writeFileSync(historyScreenshotPath, base64Data, 'base64');

  cleanOldFiles(SCREENSHOTS_DIR, MAX_HISTORY_FILES, '.jpg');

  const pending = pendingStates.get(timestamp);
  if (pending) {
    const reportContent = generateMarkdownReport(
      timestamp,
      pending.diagnostics,
      pending.state,
      SCREENSHOTS_DIR,
      STATE_DIR
    );

    const historyReportPath = path.join(REPORTS_DIR, `report_${timestamp}.md`);
    fs.writeFileSync(historyReportPath, reportContent, 'utf8');

    const latestReportPath = path.join(REPORTS_DIR, 'latest_report.md');
    fs.writeFileSync(latestReportPath, reportContent, 'utf8');

    cleanOldFiles(REPORTS_DIR, MAX_HISTORY_FILES, '.md');
    pendingStates.delete(timestamp);
  }

  sendJsonResponse(res, 200, { success: true });
}

function handleSaveLog(parsedBody, res) {
  const { type, message } = parsedBody;
  const logTimestamp = new Date().toISOString();
  const logLine = `[${logTimestamp}] [${type.toUpperCase()}] ${message}\n`;

  const logFilePath = path.join(LOGS_DIR, 'browser.log');
  fs.appendFileSync(logFilePath, logLine);

  sendJsonResponse(res, 200, { success: true });
}

function routeRequest(req, res, parsedBody) {
  if (req.method !== 'POST') {
    res.writeHead(404);
    res.end();
    return;
  }

  switch (req.url) {
    case '/save-state':
      handleSaveState(parsedBody, res);
      break;
    case '/save-screenshot':
      handleSaveScreenshot(parsedBody, res);
      break;
    case '/save-log':
      handleSaveLog(parsedBody, res);
      break;
    default:
      res.writeHead(404);
      res.end();
      break;
  }
}

const serverHandler = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  let body = '';
  let bodySize = 0;
  let destroyed = false;

  req.on('data', (chunk) => {
    if (destroyed) return;
    bodySize += chunk.length;
    if (bodySize > MAX_PAYLOAD_BYTES) {
      destroyed = true;
      res.writeHead(413, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Payload size limit exceeded' }));
      req.destroy();
      return;
    }
    body += chunk.toString();
  });

  req.on('end', () => {
    if (destroyed) return;
    try {
      const parsedBody = body ? JSON.parse(body) : {};
      routeRequest(req, res, parsedBody);
    } catch (err) {
      console.error('[DevServer] Error:', err);
      sendJsonResponse(res, 500, { error: err.message });
    }
  });
};

const finalServer = http.createServer(serverHandler);
finalServer.listen(PORT, () => {
  console.log(`[DevServer] Listening on http://localhost:${PORT}`);
  console.log(`[DevServer] Diagnostic hub is active in ${BASE_LOG_DIR}`);
});

