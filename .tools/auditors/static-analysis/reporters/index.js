const fs = require('fs');
const path = require('path');
const { LOGS_DIR } = require('../config');
const { generateMarkdownReport } = require('./markdown-reporter');

function ensureDirectories() {
  const reportsDir = path.join(LOGS_DIR, 'reports');
  const rawDir = path.join(LOGS_DIR, 'raw');
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  }
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  if (!fs.existsSync(rawDir)) {
    fs.mkdirSync(rawDir, { recursive: true });
  }
  return { reportsDir, rawDir };
}

function saveReports({
  profile,
  profileName,
  targets,
  totalDuration,
  analyzerStats,
  uniqueFindings
}) {
  const { reportsDir, rawDir } = ensureDirectories();

  // 1. Generate Markdown report
  const markdownContent = generateMarkdownReport({
    profile,
    profileName,
    targets,
    totalDuration,
    analyzerStats,
    uniqueFindings
  });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const profileReportPath = path.join(reportsDir, `unified-${profile}-${timestamp}.md`);
  const latestProfileReportPath = path.join(reportsDir, `unified-${profile}-latest.md`);
  const rootLatestReportPath = path.join(LOGS_DIR, 'latest-report.md');
  const rootProfileReportPath = path.join(LOGS_DIR, `unified-report-${profile}.md`);

  fs.writeFileSync(profileReportPath, markdownContent, 'utf8');
  fs.writeFileSync(latestProfileReportPath, markdownContent, 'utf8');
  fs.writeFileSync(rootLatestReportPath, markdownContent, 'utf8');
  fs.writeFileSync(rootProfileReportPath, markdownContent, 'utf8');

  // 2. Save raw tool outputs for auditing
  for (const stat of analyzerStats) {
    const rawFilePath = path.join(rawDir, `${stat.id}-${profile}.json`);
    const payload = {
      analyzer: stat.name,
      id: stat.id,
      profile,
      duration: stat.duration,
      status: stat.status,
      error: stat.error,
      rawOutput: stat.rawOutput
    };
    fs.writeFileSync(rawFilePath, JSON.stringify(payload, null, 2), 'utf8');
  }

  return {
    markdownReportPath: rootLatestReportPath,
    historicalReportPath: profileReportPath
  };
}

module.exports = {
  ensureDirectories,
  saveReports
};
