import * as fs from 'fs';
import * as path from 'path';

interface Violation {
  url: string;
  message: string;
  selector?: string;
  [key: string]: any;
}

const loadedState = new Set<string>();
const memoryViolations: Record<string, Record<string, Violation[]>> = {};
const memoryUrls: Record<string, Set<string>> = {};

export function clearSeenViolations() {
  loadedState.clear();
  Object.keys(memoryViolations).forEach(k => delete memoryViolations[k]);
  Object.keys(memoryUrls).forEach(k => delete memoryUrls[k]);
}

export function writeDynamicReport(
  auditorPrefix: string,
  auditorName: string,
  scope: 'public' | 'admin',
  violations: Violation[],
  sessionId?: string
) {
  const dirPath = path.resolve(process.cwd(), '.docs/audits/dynamic-audits');
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const sessionSuffix = sessionId ? `-${sessionId}` : '';
  const baseFileName = `${auditorPrefix}-dynamic-${auditorName}-${scope}${sessionSuffix}`;
  const violationsFilePath = path.join(dirPath, `${baseFileName}-violations.log`);
  const jsonFilePath = path.join(dirPath, `${baseFileName}-violations.json`);
  const filesFilePath = path.join(dirPath, `${baseFileName}-files.log`);

  if (!loadedState.has(baseFileName)) {
    loadedState.add(baseFileName);
    memoryViolations[baseFileName] = {};
    memoryUrls[baseFileName] = new Set<string>();
    
    if (fs.existsSync(jsonFilePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        memoryViolations[baseFileName] = data.violations || {};
        const urls = data.urls || [];
        urls.forEach((u: string) => memoryUrls[baseFileName].add(u));
      } catch (e) {
        console.error('Failed to parse existing dynamic audit state:', e);
      }
    }
  }

  const state = memoryViolations[baseFileName];
  const urlState = memoryUrls[baseFileName];
  let hasNew = false;
  let hasNewUrls = false;

  violations.forEach(v => {
    if (!state[v.url]) {
      state[v.url] = [];
    }
    const isDuplicate = state[v.url].some((existing: Violation) => 
      existing.message === v.message && existing.selector === v.selector
    );
    if (!isDuplicate) {
      state[v.url].push(v);
      hasNew = true;
    }
    if (!urlState.has(v.url)) {
      urlState.add(v.url);
      hasNewUrls = true;
    }
  });

  if (!hasNew && !hasNewUrls) {
    return;
  }

  fs.writeFileSync(jsonFilePath, JSON.stringify({
    violations: state,
    urls: Array.from(urlState)
  }, null, 2), 'utf-8');

  if (hasNew) {
    let reportContent = `---
type: dynamic-audit
auditor: ${auditorName}
scope: ${scope}
date: ${new Date().toISOString()}
---\n`;

    Object.keys(state).forEach(url => {
      if (state[url].length === 0) return;
      reportContent += `\n### URL: ${url}\n`;
      state[url].forEach((v: Violation) => {
        reportContent += `- ${v.message}\n`;
        if (v.selector) {
          reportContent += `  Selector: \`${v.selector}\`\n`;
        }
      });
    });

    fs.writeFileSync(violationsFilePath, reportContent, 'utf-8');
  }

  if (urlState.size > 10 && hasNewUrls) {
    let filesContent = `---
type: dynamic-audit-urls
auditor: ${auditorName}
scope: ${scope}
date: ${new Date().toISOString()}
---\n\n`;

    Array.from(urlState).forEach(url => {
      filesContent += `- ${url}\n`;
    });
    
    fs.writeFileSync(filesFilePath, filesContent, 'utf-8');
  }
}

