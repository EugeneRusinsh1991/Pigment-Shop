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

const TITLE_PREFIX_MAP: Array<[string, string]> = [
  ['i18n: Potential hardcoded text string found:', 'i18n: Potential hardcoded text string found without data-i18n tracking'],
  ['Found raw camelCase i18n key:', 'Raw camelCase i18n key found'],
  ['Found raw runtime fallback string:', 'Raw runtime fallback string found'],
  ['Found placeholder string:', 'Placeholder string found'],
  ['Found hardcoded text without i18n key:', 'Hardcoded text without i18n key'],
  ['Browser console.error:', 'Browser console error'],
  ['Unhandled exception:', 'Unhandled page exception'],
  ['Network failure', 'Network request failure'],
];

export function getProblemTitleAndDetail(message: string): { title: string; detail?: string } {
  if (message.includes('. Size: ')) {
    const [title, size] = message.split('. Size: ');
    return { title, detail: `Size: ${size}` };
  }

  const match = TITLE_PREFIX_MAP.find(([prefix]) => message.startsWith(prefix));
  return match ? { title: match[1], detail: message } : { title: message };
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

function initReportState(baseFileName: string, jsonFilePath: string) {
  if (loadedState.has(baseFileName)) return;
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

function mergeViolationsState(
  state: Record<string, Violation[]>,
  urlState: Set<string>,
  violations: Violation[]
) {
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

  return { hasNew, hasNewUrls };
}

function ensureReportDirs(...dirs: string[]) {
  dirs.forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  });
}

function makeYamlHeader(type: string, auditorName: string, scope: string) {
  return `---\ntype: ${type}\nauditor: ${auditorName}\nscope: ${scope}\ndate: ${new Date().toISOString()}\n---\n`;
}

function writeUrlListLog(filesFilePath: string, auditorName: string, scope: string, urlState: Set<string>) {
  let filesContent = makeYamlHeader('dynamic-audit-urls', auditorName, scope) + '\n';
  urlState.forEach(url => {
    filesContent += `- ${url}\n`;
  });
  fs.writeFileSync(filesFilePath, filesContent, 'utf-8');
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
  ensureReportDirs(docsDir, jsonDir);

  const sessionSuffix = sessionId ? `-${sessionId}` : '';
  const baseFileName = `${auditorPrefix}-dynamic-${auditorName}-${scope}${sessionSuffix}`;
  const jsonFilePath = path.join(jsonDir, `${baseFileName}-violations.json`);

  initReportState(baseFileName, jsonFilePath);
  const state = memoryViolations[baseFileName];
  const urlState = memoryUrls[baseFileName];
  const { hasNew, hasNewUrls } = mergeViolationsState(state, urlState, violations);

  if (!hasNew && !hasNewUrls) return;

  fs.writeFileSync(jsonFilePath, JSON.stringify({ violations: state, urls: Array.from(urlState) }, null, 2), 'utf-8');

  if (hasNew) {
    const violationsFilePath = path.join(docsDir, `${baseFileName}-violations.log`);
    const problemsMap = groupViolationsByProblemTitle(state);
    const reportContent = makeYamlHeader('dynamic-audit', auditorName, scope) + formatProblemsReport(problemsMap);
    fs.writeFileSync(violationsFilePath, reportContent, 'utf-8');
  }

  if (urlState.size > 10 && hasNewUrls) {
    writeUrlListLog(path.join(docsDir, `${baseFileName}-files.log`), auditorName, scope, urlState);
  }
}
