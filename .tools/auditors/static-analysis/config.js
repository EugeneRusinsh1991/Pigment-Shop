const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../../../..');
const LOGS_DIR = path.join(ROOT_DIR, '.logs', 'static-analysis');

const PROFILES = {
  full: {
    name: 'Full Repository',
    description: 'Analyze the entire repository',
    targets: ['.'],
    includePaths: [] // empty means include all non-ignored
  },
  project: {
    name: 'Application Source Code',
    description: 'Analyze only application source code',
    targets: ['src', 'app', 'index.js', 'app.config.js', 'app.json'],
    includePaths: ['src/', 'app/', 'index.js', 'app.config.js', 'app.json']
  },
  tools: {
    name: 'Internal Tooling & Automation',
    description: 'Analyze only internal tooling and scripts',
    targets: ['.tools', 'scripts'],
    includePaths: ['.tools/', 'scripts/']
  }
};

const DEFAULT_IGNORES = [
  'node_modules/**',
  'dist/**',
  '.expo/**',
  '.git/**',
  '.logs/**',
  '.venv/**',
  '.playwright/**',
  'test-results/**'
];

const CATEGORIES = {
  UNUSED_CODE: 'Unused Code & Dependencies',
  CODE_QUALITY: 'Code Quality & Linting',
  TYPE_SECURITY: 'Type & Security',
  SYNTAX_BEST_PRACTICES: 'Syntax & Best Practices',
  OTHER: 'Other Findings'
};

module.exports = {
  ROOT_DIR,
  LOGS_DIR,
  PROFILES,
  DEFAULT_IGNORES,
  CATEGORIES
};
