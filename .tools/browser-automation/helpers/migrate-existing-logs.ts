import * as fs from 'fs';
import * as path from 'path';

interface Violation {
  url: string;
  message: string;
  selector?: string;
  [key: string]: any;
}

function getProblemTitleAndDetail(message: string): { title: string; detail?: string } {
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

function migrateJsonToGroupedLog(jsonFilePath: string, logFilePath: string) {
  if (!fs.existsSync(jsonFilePath)) {
    console.log(`Skipping: ${jsonFilePath} not found`);
    return;
  }

  let data: { violations: Record<string, Violation[]>; urls?: string[] };
  try {
    data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
  } catch {
    console.error(`Failed to parse: ${jsonFilePath}`);
    return;
  }

  const state = data.violations || {};
  const logName = path.basename(logFilePath);
  
  // Extract auditor info from filename
  const match = logName.match(/^(\d+)-dynamic-([^-]+(?:-[^-]+)*?)-([^-]+)-([^-]+)-violations/);
  const auditorName = match ? match[2] : 'unknown';
  const scope = match ? match[3] : 'unknown';

  // Build problem groups
  const problemsMap: Map<string, { url: string; selector?: string; detail?: string }[]> = new Map();

  Object.keys(state).forEach(url => {
    state[url].forEach((v: Violation) => {
      const { title, detail } = getProblemTitleAndDetail(v.message);
      if (!problemsMap.has(title)) {
        problemsMap.set(title, []);
      }
      problemsMap.get(title)!.push({ url, selector: v.selector, detail });
    });
  });

  const totalViolations = Object.values(state).reduce((sum, arr) => sum + arr.length, 0);
  const totalProblems = problemsMap.size;

  let reportContent = `---
type: dynamic-audit
auditor: ${auditorName}
scope: ${scope}
date: ${new Date().toISOString()}
total_violations: ${totalViolations}
total_problem_types: ${totalProblems}
---\n`;

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

  fs.writeFileSync(logFilePath, reportContent, 'utf-8');
  console.log(`Migrated: ${logName} (${totalProblems} problem types, ${totalViolations} violations)`);
}

const baseDir = path.resolve(process.cwd(), '.docs/audits/dynamic-audits');
const docsDir = path.join(baseDir, 'docs');
const jsonDir = path.join(baseDir, 'json');

if (!fs.existsSync(jsonDir)) {
  console.error('json/ directory not found. Run audit migration first.');
  process.exit(1);
}

const jsonFiles = fs.readdirSync(jsonDir).filter(f => f.endsWith('-violations.json'));

jsonFiles.forEach(jsonFile => {
  const jsonPath = path.join(jsonDir, jsonFile);
  const logFile = jsonFile.replace('.json', '.log');
  const logPath = path.join(docsDir, logFile);
  migrateJsonToGroupedLog(jsonPath, logPath);
});

console.log(`\nMigration complete. ${jsonFiles.length} files processed.`);
