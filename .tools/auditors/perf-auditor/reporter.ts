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

function getActionTarget(lag: LagRecord): string {
  return lag.userAction?.targetSelector || lag.selector || lag.action || 'N/A';
}

function renderCallStackHtml(lag: LagRecord): string {
  if (!lag.callStack?.length) return '';
  const frames = lag.callStack.map(
    frame => `at ${frame.functionName} (${frame.scriptUrl}:${frame.lineNumber}:${frame.columnNumber})`
  );
  return `<div class="stack-trace">${frames.join('\n')}</div>`;
}

function renderSourceLocationHtml(lag: LagRecord): string {
  if (!lag.sourceLocation) return '';
  const file = lag.sourceLocation.scriptUrl.split('/').pop();
  return `<div class="source-loc">📍 <strong>Source:</strong> ${lag.sourceLocation.functionName} @ ${file}:${lag.sourceLocation.lineNumber}<br/><span style="color:#64748b;font-size:0.75rem;">${lag.sourceLocation.scriptUrl}</span></div>`;
}

function renderLagCardHtml(lag: LagRecord): string {
  const actionTarget = getActionTarget(lag);
  const traceNameHtml = lag.traceName ? ` <em style="color:#64748b;">[${lag.traceName}]</em>` : '';
  const url = lag.url || 'N/A';
  const screenshotHtml = lag.screenshotPath
    ? `<div><img src="screenshots/${path.basename(lag.screenshotPath)}" alt="Lag Screenshot" /></div>`
    : '';

  return `
    <div class="lag-card">
      <div><span class="badge">${lag.durationMs}ms</span> (Threshold: ${lag.thresholdMs}ms) - <strong>${formatLagType(lag.type)}</strong>${traceNameHtml}</div>
      <div class="meta">
        <div><strong>Action/Selector:</strong> ${actionTarget}</div>
        <div><strong>URL:</strong> ${url}</div>
        <div><strong>Timestamp:</strong> ${lag.timestamp}</div>
      </div>
      ${renderSourceLocationHtml(lag)}
      ${renderCallStackHtml(lag)}
      ${screenshotHtml}
    </div>
  `;
}

function renderSourceLocationMd(lag: LagRecord): string {
  if (!lag.sourceLocation) return '';
  const file = lag.sourceLocation.scriptUrl.split('/').pop();
  let text = `- **📍 Source:** \`${lag.sourceLocation.functionName}\` @ \`${file}:${lag.sourceLocation.lineNumber}\`\n`;
  text += `  - Full path: \`${lag.sourceLocation.scriptUrl}\`\n`;
  return text;
}

function renderCallStackMd(lag: LagRecord): string {
  if (!lag.callStack?.length) return '';
  let text = `- **Call Stack (Top ${Math.min(lag.callStack.length, 10)}):**\n`;
  lag.callStack.forEach(frame => {
    text += `  - \`${frame.functionName}\` at [${path.basename(frame.scriptUrl)}](file://${frame.scriptUrl}#L${frame.lineNumber})\n`;
  });
  return text;
}

function renderLagCardMd(lag: LagRecord): string {
  const actionTarget = getActionTarget(lag);
  const traceNameMd = lag.traceName ? ` [${lag.traceName}]` : '';
  let entry = `## Lag: ${lag.durationMs}ms (Threshold: ${lag.thresholdMs}ms)\n`;
  entry += `- **Type:** ${formatLagType(lag.type)}${traceNameMd}\n`;
  entry += `- **Action/Selector:** \`${actionTarget}\`\n`;
  entry += `- **URL:** ${lag.url}\n`;
  entry += renderSourceLocationMd(lag);
  entry += renderCallStackMd(lag);
  return entry;
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
    .source-loc { background: #312e81; border: 1px solid #4338ca; padding: 6px 10px; border-radius: 4px; margin-top: 0.5rem; font-family: monospace; font-size: 0.85rem; color: #a5b4fc; }
    .source-loc strong { color: #818cf8; }
    img { max-width: 100%; border: 1px solid #334155; margin-top: 0.5rem; border-radius: 4px; }
    .stack-trace { background: #0f172a; padding: 1rem; border-radius: 4px; font-family: monospace; font-size: 0.8rem; margin-top: 0.5rem; white-space: pre-wrap; overflow-x: auto; color: #cbd5e1; }
  </style>
</head>
<body>
  <h1>Performance Lag Audit Report</h1>
  <p>Total performance violations detected: <strong>${lags.length}</strong></p>
  ${lags.length === 0 ? '<p style="color: #22c55e;">No UI lag violations detected!</p>' : ''}
  ${lags.map(renderLagCardHtml).join('')}
</body>
</html>
  `;
  fs.writeFileSync(outputPath, html, 'utf-8');

  const mdSummary = `# Performance Audit Summary\n\nTotal violations: ${lags.length}\n\n` + lags.map(renderLagCardMd).join('\n');
  const mdOutputPath = outputPath.replace('.html', '.md');
  fs.writeFileSync(mdOutputPath, mdSummary, 'utf-8');
}
