const BaseAnalyzer = require('./base-analyzer');
const { createNormalizedFinding } = require('../normalizer');

class KnipAnalyzer extends BaseAnalyzer {
  constructor() {
    super({
      id: 'knip',
      name: 'Knip',
      description: 'Analyzer for unused files, dependencies, and exports'
    });
  }

  getCommand(profile, profileConfig) {
    return 'npx knip --reporter=json';
  }

  shouldIncludeFile(filePath, profile, profileConfig) {
    if (!filePath) return false;
    if (profile === 'full') return true;

    const norm = filePath.replace(/\\/g, '/');
    const prefixes = profileConfig.includePaths || [];
    if (prefixes.length === 0) return true;

    return prefixes.some(
      (p) =>
        norm.startsWith(p) || norm === p.replace(/\/$/, '') || norm.endsWith(`/${p.replace(/\/$/, '')}`)
    );
  }

  normalize(rawOutput, profile) {
    if (!rawOutput || !rawOutput.trim()) return [];
    let parsed = {};
    try {
      parsed = JSON.parse(rawOutput);
    } catch (e) {
      const jsonStart = rawOutput.indexOf('{');
      const jsonEnd = rawOutput.lastIndexOf('}') + 1;
      if (jsonStart >= 0 && jsonEnd > jsonStart) {
        parsed = JSON.parse(rawOutput.slice(jsonStart, jsonEnd));
      } else {
        return [];
      }
    }

    const findings = [];
    const { PROFILES } = require('../config');
    const profileConfig = PROFILES[profile] || PROFILES.full;

    // Unused files
    const files = parsed.files || [];
    if (Array.isArray(files)) {
      for (const file of files) {
        if (this.shouldIncludeFile(file, profile, profileConfig)) {
          findings.push(
            createNormalizedFinding({
              filePath: file,
              line: 1,
              column: 1,
              severity: 'warning',
              message: 'File is unused in the repository',
              ruleId: 'knip/unused-file',
              detectedBy: [this.name]
            })
          );
        }
      }
    }

    // Issues array (exports, types, duplicates, etc.)
    const issues = parsed.issues || [];
    if (Array.isArray(issues)) {
      for (const issue of issues) {
        const file = issue.file || 'unknown';
        if (this.shouldIncludeFile(file, profile, profileConfig)) {
          const type = issue.type || 'unused-export';
          const name = issue.name ? `'${issue.name}'` : 'export';
          findings.push(
            createNormalizedFinding({
              filePath: file,
              line: issue.line || 1,
              column: issue.col || issue.column || 1,
              severity: 'warning',
              message: `Unused ${type}: ${name}`,
              ruleId: `knip/${type}`,
              detectedBy: [this.name]
            })
          );
        }
      }
    }

    // Dependencies / devDependencies / unlisted
    const depCategories = [
      { key: 'dependencies', msg: 'Unused dependency' },
      { key: 'devDependencies', msg: 'Unused devDependency' },
      { key: 'unlisted', msg: 'Unlisted dependency used in code' }
    ];

    for (const { key, msg } of depCategories) {
      const items = parsed[key] || [];
      if (Array.isArray(items)) {
        for (const item of items) {
          const depName = typeof item === 'string' ? item : item.name || JSON.stringify(item);
          if (profile === 'full' || profile === 'project') {
            findings.push(
              createNormalizedFinding({
                filePath: 'package.json',
                line: 1,
                column: 1,
                severity: 'warning',
                message: `${msg}: ${depName}`,
                ruleId: `knip/${key}`,
                detectedBy: [this.name]
              })
            );
          }
        }
      }
    }

    return findings;
  }
}

module.exports = KnipAnalyzer;
