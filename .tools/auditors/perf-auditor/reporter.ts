import fs from 'fs';
import path from 'path';
import { LagRecord } from './logger';

const LAG_TYPE_LABELS: Record<string, string> = {
  longtask: 'Long Task (Main Thread Blocked)',
  action_delay: 'Action Delay (Slow UI Response)',
  cdp_longtask: 'CDP Long Task (Engine-Level)',
  layout_thrash: 'Layout Thrashing',
  paint_stall: 'Paint / Composite Stall',
  frame_drop: 'Frame Drop',
};

function formatLagType(type: string): string {
  return LAG_TYPE_LABELS[type] || type;
}

export function generateHtmlReport(lags: LagRecord[], outputPath: string): void {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Performance Audit Lag Report</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #f8fafc; padding: 2rem; }
    h1 { color: #38bdf8; }
    .lag-card { background: #1e293b; border-left: 4px solid #ef4444; padding: 1rem; margin-bottom: 1rem; border-radius: 4px; }
    .meta { font-size: 0.875rem; color: #94a3b8; }
    .badge { background: #ef4444; color: white; padding: 2px 8px; border-radius: 4px; font-weight: bold; }
    img { max-width: 100%; border: 1px solid #334155; margin-top: 0.5rem; border-radius: 4px; }
    .stack-trace { background: #0f172a; padding: 1rem; border-radius: 4px; font-family: monospace; font-size: 0.8rem; margin-top: 0.5rem; white-space: pre-wrap; overflow-x: auto; color: #cbd5e1; }
  </style>
</head>
<body>
  <h1>Performance Lag Audit Report</h1>
  <p>Total performance violations detected: <strong>${lags.length}</strong></p>
  ${lags.length === 0 ? '<p style="color: #22c55e;">No UI lag violations detected!</p>' : ''}
  ${lags.map((lag) => {
    const actionTarget = lag.userAction?.targetSelector || lag.selector || lag.action || 'N/A';
    const callStackHtml = lag.callStack?.length 
      ? `<div class="stack-trace">${lag.callStack.map(frame => `at ${frame.functionName} (${frame.scriptUrl}:${frame.lineNumber}:${frame.columnNumber})`).join('\n')}</div>`
      : '';
    return `
    <div class="lag-card">
      <div><span class="badge">${lag.durationMs}ms</span> (Threshold: ${lag.thresholdMs}ms) - <strong>${formatLagType(lag.type)}</strong>${lag.traceName ? ` <em style="color:#64748b;">[${lag.traceName}]</em>` : ''}</div>
      <div class="meta">
        <div><strong>Action/Selector:</strong> ${actionTarget}</div>
        <div><strong>URL:</strong> ${lag.url || 'N/A'}</div>
        <div><strong>Timestamp:</strong> ${lag.timestamp}</div>
      </div>
      ${callStackHtml}
      ${lag.screenshotPath ? `<div><img src="screenshots/${path.basename(lag.screenshotPath)}" alt="Lag Screenshot" /></div>` : ''}
    </div>
  `}).join('')}
</body>
</html>
  `;
  fs.writeFileSync(outputPath, html, 'utf-8');

  const mdSummary = `# Performance Audit Summary\n\nTotal violations: ${lags.length}\n\n` + lags.map(lag => {
    const actionTarget = lag.userAction?.targetSelector || lag.selector || lag.action || 'N/A';
    let entry = `## Lag: ${lag.durationMs}ms (Threshold: ${lag.thresholdMs}ms)\n`;
    entry += `- **Action/Selector:** \`${actionTarget}\`\n`;
    entry += `- **URL:** ${lag.url}\n`;
    if (lag.callStack && lag.callStack.length > 0) {
      entry += `- **Call Stack (Top 5):**\n`;
      lag.callStack.forEach(frame => {
        entry += `  - \`${frame.functionName}\` at [${path.basename(frame.scriptUrl)}](file://${frame.scriptUrl}#L${frame.lineNumber})\n`;
      });
    }
    return entry;
  }).join('\n');
  const mdOutputPath = outputPath.replace('.html', '.md');
  fs.writeFileSync(mdOutputPath, mdSummary, 'utf-8');
}
