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

export function getProblemTitleAndDetail(message: string): { title: string; detail?: string } {
  if (message.includes('. Size: ')) {
    const parts = message.split('. Size: ');
    return { title: parts[0], detail: `Size: ${parts[1]}` };
  }
  if (message.startsWith('i18n: Potential hardcoded text string found:')) {
    return { title: 'i18n: Potential hardcoded text string found without data-i18n tracking', detail: message };
  }
  if (message.startsWith('Found raw camelCase i18n key:')) {
    return { title: 'Raw camelCase i18n key found', detail: message };
  }
  if (message.startsWith('Found raw runtime fallback string:')) {
    return { title: 'Raw runtime fallback string found', detail: message };
  }
  if (message.startsWith('Found placeholder string:')) {
    return { title: 'Placeholder string found', detail: message };
  }
  if (message.startsWith('Found hardcoded text without i18n key:')) {
    return { title: 'Hardcoded text without i18n key', detail: message };
  }
  if (message.startsWith('Browser console.error:')) {
    return { title: 'Browser console error', detail: message };
  }
  if (message.startsWith('Unhandled exception:')) {
    return { title: 'Unhandled page exception', detail: message };
  }
  if (message.startsWith('Network failure')) {
    return { title: 'Network request failure', detail: message };
  }
  return { title: message };
}

export function groupViolationsByProblemTitle(state: Record<string, Violation[]>): Map<string, { url: string; selector?: string; detail?: string }[]> {
  const problemsMap: Map<string, { url: string; selector?: string; detail?: string }[]> = new Map();

  Object.keys(state).forEach(url => {
    state[url].forEach((v: Violation) => {
      const { title, detail } = getProblemTitleAndDetail(v.message);
      if (!problemsMap.has(title)) {
        problemsMap.set(title, []);
      }
      problemsMap.get(title)!.push({
        url,
        selector: v.selector,
        detail
      });
    });
  });

  return problemsMap;
}

export function formatProblemsReport(problemsMap: Map<string, { url: string; selector?: string; detail?: string }[]>): string {
  let reportContent = '';
  problemsMap.forEach((items, problemTitle) => {
    reportContent += `\n### Problem: ${problemTitle}\n\n`;

    const urlGroup: Record<string, { selector?: string; detail?: string }[]> = {};
    items.forEach(item => {
      if (!urlGroup[item.url]) {
        urlGroup[item.url] = [];
      }
      urlGroup[item.url].push(item);
    });

    Object.keys(urlGroup).forEach(url => {
      reportContent += `- URL: \`${url}\`\n`;
      urlGroup[url].forEach(entry => {
        const infoParts: string[] = [];
        if (entry.detail) infoParts.push(entry.detail);
        if (entry.selector) infoParts.push(`Selector: \`${entry.selector}\``);

        if (infoParts.length > 0) {
          reportContent += `  - ${infoParts.join(' | ')}\n`;
        }
      });
    });
  });
  return reportContent;
}

export function writeDynamicReport(
  auditorPrefix: string,
  auditorName: string,
  scope: 'public' | 'admin',
  violations: Violation[],
  sessionId?: string
) {
  const baseDir = path.resolve(process.cwd(), '.docs/audits/dynamic-audits');
  const docsDir = path.join(baseDir, 'docs');
  const jsonDir = path.join(baseDir, 'json');
  
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir, { recursive: true });
  }

  const sessionSuffix = sessionId ? `-${sessionId}` : '';
  const baseFileName = `${auditorPrefix}-dynamic-${auditorName}-${scope}${sessionSuffix}`;
  const violationsFilePath = path.join(docsDir, `${baseFileName}-violations.log`);
  const jsonFilePath = path.join(jsonDir, `${baseFileName}-violations.json`);
  const filesFilePath = path.join(docsDir, `${baseFileName}-files.log`);

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
    const problemsMap = groupViolationsByProblemTitle(state);

    let reportContent = `---
type: dynamic-audit
auditor: ${auditorName}
scope: ${scope}
date: ${new Date().toISOString()}
---\n` + formatProblemsReport(problemsMap);

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
