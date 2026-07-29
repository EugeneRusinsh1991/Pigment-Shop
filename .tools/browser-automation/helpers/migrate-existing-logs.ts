import * as fs from 'fs';
import * as path from 'path';
import { getProblemTitleAndDetail, formatProblemsReport } from './dynamic-report-writer';

interface Violation {
  url: string;
  message: string;
  selector?: string;
  [key: string]: any;
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
---\n` + formatProblemsReport(problemsMap);

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
