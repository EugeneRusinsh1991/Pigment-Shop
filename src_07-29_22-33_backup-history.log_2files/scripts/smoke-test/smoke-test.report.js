const fs = require('fs');
const path = require('path');

function accumulateReportIssues(report) {
  for (const pageName in report.pages) {
    const pageData = report.pages[pageName];
    pageData.detectedErrors.forEach(err => {
      pageData.issues.push({
        description: err,
        reproductionPath: `Navigate to ${pageData.path}`
      });
      report.summary.totalIssuesFound++;
    });
  }

  if (report.globalErrors.length > 0) {
    report.globalErrors.forEach(() => {
      report.summary.totalIssuesFound++;
    });
  }
}

function formatListItems(items) {
  if (!items || items.length === 0) return '  - None\n';
  return items.map(item => `  - ${item}\n`).join('');
}

function formatPageMarkdownSection(pageName, pageData) {
  let md = `### ${pageName}\n`;
  md += `- **Route**: \`${pageData.path}\`\n`;
  md += `- **Tested Interactions**:\n${formatListItems(pageData.testedInteractions)}`;
  md += `- **Successful Interactions**:\n${formatListItems(pageData.successfulInteractions)}`;
  md += `- **Failed Interactions**: ${pageData.failedInteractions.length > 0 ? pageData.failedInteractions.join(', ') : 'None'}\n`;
  md += `- **Detected Errors**: ${pageData.detectedErrors.length > 0 ? pageData.detectedErrors.join('; ') : 'None'}\n`;

  if (pageData.screenshot) {
    const safePageName = pageName.replace(/[^a-zA-Z0-9]/g, '_');
    const relativeScreenshot = `./scripts/smoke-test/failures/${safePageName}_failure.jpg`;
    const relativeReport = `./scripts/smoke-test/failures/${safePageName}_failure.md`;
    md += `- **Screenshot of Failure**:\n\n![Failure on ${pageName}](${relativeScreenshot})\n\n`;
    md += `- **Detailed Failure Document**: [Open failure details doc](${relativeReport})\n\n`;
  }
  md += `---\n\n`;
  return md;
}

function formatSmokeTestMarkdown(report) {
  let md = `# Smoke Test Report\n\n`;
  md += `## About this Smoke Test\n`;
  md += `This automated test suite uses Playwright to verify the core user flows of the PigmentShop application.\n\n`;
  md += `Last execution: ${new Date().toISOString()}\n\n`;
  md += `---\n\n## 1. Page Results\n\n`;

  for (const pageName in report.pages) {
    md += formatPageMarkdownSection(pageName, report.pages[pageName]);
  }

  md += `## Summary\n\n`;
  md += `- **Pages Visited**: ${report.summary.pagesVisited}\n`;
  md += `- **Pages Skipped**: ${report.summary.pagesSkipped}\n`;
  md += `- **Total Interactions Attempted**: ${report.summary.totalInteractionsAttempted}\n`;
  md += `- **Successful Interactions**: ${report.summary.successfulInteractions}\n`;
  md += `- **Failed Interactions**: ${report.summary.failedInteractions}\n`;
  md += `- **Total Issues Found**: ${report.summary.totalIssuesFound}\n`;

  return md;
}

function saveSmokeTestReport(report) {
  accumulateReportIssues(report);

  const outPath = path.join(__dirname, 'smoke-test-results.json');
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));

  const mdPath = path.join(__dirname, '../../Smoke Test Report.md');
  fs.writeFileSync(mdPath, formatSmokeTestMarkdown(report));

  if (report.summary.totalIssuesFound === 0) {
    console.log(`✅ Smoke test passed: ${report.summary.pagesVisited} pages checked, ${report.summary.successfulInteractions} interactions successful, 0 issues found.`);
  } else {
    console.log(`❌ Smoke test failed: ${report.summary.totalIssuesFound} issues found! Details in Smoke Test Report.md.`);
  }
}

module.exports = { saveSmokeTestReport };
