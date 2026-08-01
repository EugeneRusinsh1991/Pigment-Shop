const { CATEGORIES } = require('../config');

function formatDuration(ms) {
  if (ms < 1000) return `${ms} ms`;
  return `${(ms / 1000).toFixed(2)} s`;
}

function generateMarkdownReport({
  profile,
  profileName,
  targets,
  totalDuration,
  analyzerStats,
  uniqueFindings
}) {
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';

  let totalRawFindings = 0;
  for (const stat of analyzerStats) {
    totalRawFindings += stat.count || 0;
  }

  const errorCount = uniqueFindings.filter((f) => f.severity === 'error').length;
  const warningCount = uniqueFindings.filter((f) => f.severity === 'warning').length;
  const infoCount = uniqueFindings.filter((f) => f.severity === 'info').length;

  const lines = [];

  lines.push('# 🔍 Static Analysis Unified Report');
  lines.push('');
  lines.push(`> **Generated At**: \`${now}\``);
  lines.push(`> **Execution Profile**: \`${profileName} (${profile})\``);
  lines.push(`> **Analyzed Scope**: \`${targets.join(', ')}\``);
  lines.push('');

  // 1. Execution Summary
  lines.push('## 📊 Execution Summary');
  lines.push('');
  lines.push('| Metric | Value |');
  lines.push('| :--- | :--- |');
  lines.push(`| **Profile** | \`${profileName}\` |`);
  lines.push(`| **Target Paths** | \`${targets.join(', ')}\` |`);
  lines.push(`| **Total Duration** | \`${formatDuration(totalDuration)}\` |`);
  lines.push(`| **Analyzers Executed** | \`${analyzerStats.length}\` |`);
  lines.push(`| **Total Raw Findings** | \`${totalRawFindings}\` |`);
  lines.push(`| **Unique Findings** | \`${uniqueFindings.length}\` |`);
  lines.push(`| **Severity Breakdown** | 🔴 \`${errorCount}\` Error(s), 🟡 \`${warningCount}\` Warning(s), 🔵 \`${infoCount}\` Info |`);
  lines.push('');

  // 2. Analyzers Executed & Statistics
  lines.push('## 🛠️ Analyzers Executed');
  lines.push('');
  lines.push('| Analyzer | Status | Findings Count | Duration | Details |');
  lines.push('| :--- | :---: | :---: | :---: | :--- |');
  for (const stat of analyzerStats) {
    const statusIcon = stat.status === 'success' ? '✅ Success' : '⚠️ Failed';
    const detailMsg = stat.error ? `Error: ${stat.error}` : 'Completed cleanly';
    lines.push(
      `| **${stat.name}** | ${statusIcon} | \`${stat.count}\` | \`${formatDuration(stat.duration)}\` | ${detailMsg} |`
    );
  }
  lines.push('');

  // 3. Categorized Findings
  lines.push('## 🗂️ Categorized Findings Summary');
  lines.push('');
  const categoryMap = new Map();
  for (const catName of Object.values(CATEGORIES)) {
    categoryMap.set(catName, []);
  }

  for (const finding of uniqueFindings) {
    const cat = finding.category || CATEGORIES.OTHER;
    if (!categoryMap.has(cat)) categoryMap.set(cat, []);
    categoryMap.get(cat).push(finding);
  }

  lines.push('| Category | Findings Count | Breakdown |');
  lines.push('| :--- | :---: | :--- |');
  for (const [catName, list] of categoryMap.entries()) {
    const errors = list.filter((f) => f.severity === 'error').length;
    const warns = list.filter((f) => f.severity === 'warning').length;
    lines.push(
      `| **${catName}** | \`${list.length}\` | 🔴 ${errors} Error(s), 🟡 ${warns} Warning(s) |`
    );
  }
  lines.push('');

  // 4. Unified List of Unique Findings
  lines.push('## 📋 Unified List of Unique Findings');
  lines.push('');
  if (uniqueFindings.length === 0) {
    lines.push('🎉 **No static analysis findings detected in this scope!**');
    lines.push('');
  } else {
    lines.push('| File : Line | Sev | Category | Rule ID | Message | Detected By |');
    lines.push('| :--- | :---: | :--- | :--- | :--- | :--- |');
    for (const finding of uniqueFindings) {
      const sevIcon =
        finding.severity === 'error' ? '🔴' : finding.severity === 'warning' ? '🟡' : '🔵';
      const loc = `\`${finding.filePath}:${finding.line}\``;
      const rule = `\`${finding.ruleId}\``;
      const msg = finding.message.replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
      const detBy = finding.detectedBy.map((d) => `\`${d}\``).join(', ');
      lines.push(
        `| ${loc} | ${sevIcon} | ${finding.category} | ${rule} | ${msg} | ${detBy} |`
      );
    }
    lines.push('');
  }

  return lines.join('\n');
}

module.exports = {
  generateMarkdownReport
};
