import * as fs from 'fs';
import * as path from 'path';

interface Violation {
  url: string;
  message: string;
  selector?: string;
  [key: string]: any;
}

const seenViolations = new Set<string>();
const seenUrls = new Set<string>();

export function clearSeenViolations() {
  seenViolations.clear();
  seenUrls.clear();
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
  const filesFilePath = path.join(dirPath, `${baseFileName}-files.log`);

  const newViolations = violations.filter(v => {
    const key = `${auditorPrefix}:${auditorName}:${scope}:${sessionId || ''}:${v.url}:${v.message}:${v.selector || ''}`;
    if (seenViolations.has(key)) {
      return false;
    }
    seenViolations.add(key);
    return true;
  });

  if (newViolations.length === 0) {
    return;
  }

  const groupedByUrl = newViolations.reduce((acc, violation) => {
    if (!acc[violation.url]) {
      acc[violation.url] = [];
    }
    acc[violation.url].push(violation);
    return acc;
  }, {} as Record<string, Violation[]>);

  const affectedUrls = Object.keys(groupedByUrl);

  let reportContent = '';
  const fileExists = fs.existsSync(violationsFilePath);
  if (!fileExists) {
    reportContent += `---
type: dynamic-audit
auditor: ${auditorName}
scope: ${scope}
date: ${new Date().toISOString()}
---\n`;
  }

  affectedUrls.forEach(url => {
    reportContent += `\n### URL: ${url}\n`;
    groupedByUrl[url].forEach(v => {
      reportContent += `- ${v.message}\n`;
      if (v.selector) {
        reportContent += `  Selector: \`${v.selector}\`\n`;
      }
    });
  });

  fs.appendFileSync(violationsFilePath, reportContent, 'utf-8');

  affectedUrls.forEach(url => seenUrls.add(`${auditorPrefix}:${auditorName}:${scope}:${sessionId || ''}:${url}`));
  const scopePrefix = `${auditorPrefix}:${auditorName}:${scope}:${sessionId || ''}:`;
  const totalUrlsCount = Array.from(seenUrls).filter(k => k.startsWith(scopePrefix)).length;

  if (totalUrlsCount > 10) {
    const filesFileExists = fs.existsSync(filesFilePath);
    let filesContent = '';
    if (!filesFileExists) {
      filesContent += `---
type: dynamic-audit-urls
auditor: ${auditorName}
scope: ${scope}
date: ${new Date().toISOString()}
---\n\n`;
      const currentScopeUrls = Array.from(seenUrls)
        .filter(k => k.startsWith(scopePrefix))
        .map(k => k.replace(scopePrefix, ''));
      
      currentScopeUrls.forEach(url => {
        filesContent += `- ${url}\n`;
      });
      fs.writeFileSync(filesFilePath, filesContent, 'utf-8');
    } else {
      affectedUrls.forEach(url => {
        filesContent += `- ${url}\n`;
      });
      fs.appendFileSync(filesFilePath, filesContent, 'utf-8');
    }
  }
}

