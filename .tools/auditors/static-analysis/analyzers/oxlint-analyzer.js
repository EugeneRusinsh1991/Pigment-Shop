const BaseAnalyzer = require('./base-analyzer');
const { createNormalizedFinding } = require('../normalizer');

class OxlintAnalyzer extends BaseAnalyzer {
  constructor() {
    super({
      id: 'oxlint',
      name: 'Oxlint',
      description: 'High-performance JavaScript/TypeScript linter written in Rust'
    });
  }

  getCommand(profile, profileConfig) {
    const targets = profileConfig.targets.join(' ');
    return `npx oxlint --format=json ${targets}`;
  }

  normalize(rawOutput) {
    if (!rawOutput || !rawOutput.trim()) return [];
    let parsed = [];
    try {
      parsed = JSON.parse(rawOutput);
    } catch (e) {
      const jsonStart = rawOutput.indexOf('[');
      const jsonEnd = rawOutput.lastIndexOf(']') + 1;
      if (jsonStart >= 0 && jsonEnd > jsonStart) {
        parsed = JSON.parse(rawOutput.slice(jsonStart, jsonEnd));
      } else {
        return [];
      }
    }

    const findings = [];
    if (!Array.isArray(parsed)) return [];

    for (const item of parsed) {
      const filePath = item.filename || item.file || item.path || 'unknown';
      let line = 1;
      let column = 1;

      if (item.labels && Array.isArray(item.labels) && item.labels.length > 0) {
        const label = item.labels[0];
        if (label && label.span) {
          if (label.span.line) line = label.span.line;
          if (label.span.column) column = label.span.column;
        }
      } else if (item.location && item.location.start) {
        line = item.location.start.line || 1;
        column = item.location.start.column || 1;
      }

      const severity =
        item.severity === 'error' ? 'error' : item.severity === 'warning' ? 'warning' : 'info';

      findings.push(
        createNormalizedFinding({
          filePath,
          line,
          column,
          severity,
          message: item.message || 'Oxlint diagnostic issue',
          ruleId: item.code || item.ruleId || 'oxlint/general',
          detectedBy: [this.name]
        })
      );
    }

    return findings;
  }
}

module.exports = OxlintAnalyzer;
