const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../../src');
const AUDITS_DIR = path.join(__dirname, '../../.docs/audits/audits');
const CONFIG_FILE = path.join(__dirname, 'hardcode-search-patterns.json');

// Конфигурация паттернов для поиска
const DEFAULT_PATTERNS = [
  {
    name: 'BORDER_WIDTH',
    description: 'Хардкод ширины границ',
    patterns: [
      { regex: /\bborderWidth\s*:\s*(\d+)/g, example: 'borderWidth: 1' },
      { regex: /\bborder(?:Top|Bottom|Left|Right)?Width\s*:\s*(\d+)/g, example: 'borderTopWidth: 2' }
    ],
    excludeFiles: ['tokens.js', 'theme.js', 'styles.js']
  },
  {
    name: 'BORDER_COLOR',
    description: 'Хардкод цветов границ',
    patterns: [
      { regex: /\bborderColor\s*:\s*['"]\w+['"]/g, example: 'borderColor: "white"' },
      { regex: /\bborder(?:Top|Bottom|Left|Right)?Color\s*:\s*['"]\w+['"]/g, example: 'borderTopColor: "black"' }
    ],
    excludeFiles: ['tokens.js', 'theme.js', 'colors.js']
  },
  {
    name: 'BORDER_RADIUS',
    description: 'Хардкод радиуса границ',
    patterns: [
      { regex: /\bborderRadius\s*:\s*(\d+)/g, example: 'borderRadius: 8' }
    ],
    excludeFiles: ['tokens.js', 'theme.js']
  },
  {
    name: 'MARGIN_PADDING',
    description: 'Хардкод отступов',
    patterns: [
      { regex: /\b(margin|padding)(?:Top|Bottom|Left|Right|Vertical|Horizontal)?\s*:\s*(\d+)/g, example: 'margin: 10' }
    ],
    excludeFiles: ['tokens.js', 'theme.js']
  },
  {
    name: 'COLOR_HEX',
    description: 'Хардкод HEX цветов',
    patterns: [
      { regex: /#(?:[0-9a-fA-F]{3}){1,2}\b/g, example: '#ffffff' }
    ],
    excludeFiles: ['tokens.js', 'theme.js', 'colors.js']
  },
  {
    name: 'COLOR_RGB',
    description: 'Хардкод RGB/RGBA цветов',
    patterns: [
      { regex: /rgba?\([^)]+\)/gi, example: 'rgba(0,0,0,0.5)' }
    ],
    excludeFiles: ['tokens.js', 'theme.js', 'colors.js']
  },
  {
    name: 'FONT_SIZE',
    description: 'Хардкод размера шрифта',
    patterns: [
      { regex: /\bfontSize\s*:\s*(\d+)/g, example: 'fontSize: 16' }
    ],
    excludeFiles: ['tokens.js', 'theme.js', 'typography.js']
  },
  {
    name: 'FONT_WEIGHT',
    description: 'Хардкод веса шрифта',
    patterns: [
      { regex: /\bfontWeight\s*:\s*['"]?\d+['"]?/g, example: 'fontWeight: 700' }
    ],
    excludeFiles: ['tokens.js', 'theme.js', 'typography.js']
  },
  {
    name: 'Z_INDEX',
    description: 'Хардкод z-index',
    patterns: [
      { regex: /\bzIndex\s*:\s*(\d{2,})/g, example: 'zIndex: 999' }
    ],
    excludeFiles: ['tokens.js', 'theme.js']
  },
  {
    name: 'OPACITY',
    description: 'Хардкод прозрачности',
    patterns: [
      { regex: /\bopacity\s*:\s*[0-9.]+/g, example: 'opacity: 0.5' }
    ],
    excludeFiles: ['tokens.js', 'theme.js']
  }
];

function loadConfig() {
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
      return config.patterns || DEFAULT_PATTERNS;
    } catch (e) {
      console.warn('[Universal Hardcode Searcher] Error loading config, using defaults');
      return DEFAULT_PATTERNS;
    }
  }
  return DEFAULT_PATTERNS;
}

function shouldExcludeFile(filePath, excludePatterns) {
  const fileName = path.basename(filePath);
  return excludePatterns.some(pattern => fileName.includes(pattern));
}

function scanFile(filePath, patterns) {
  const relPath = path.relative(path.join(__dirname, '../..'), filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const violations = [];

  patterns.forEach(patternGroup => {
    if (shouldExcludeFile(filePath, patternGroup.excludeFiles)) {
      return;
    }

    lines.forEach((line, index) => {
      patternGroup.patterns.forEach(pattern => {
        const matches = line.match(pattern.regex);
        if (matches) {
          matches.forEach(match => {
            violations.push({
              type: patternGroup.name,
              description: patternGroup.description,
              location: `${relPath}:${index + 1}`,
              match: match,
              line: line.trim(),
              example: pattern.example
            });
          });
        }
      });
    });
  });

  return violations;
}

function walkDir(dirPath, patterns, violations) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, patterns, violations);
    } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.jsx') || entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      const fileViolations = scanFile(fullPath, patterns);
      violations.push(...fileViolations);
    }
  }
}

function generateCategoryReport(type, description, violations) {
  let report = '===================================================================\n';
  report += `         ${type} - ${description}              \n`;
  report += `Timestamp: ${new Date().toLocaleString('ru-RU')}\n`;
  report += '===================================================================\n';
  report += '[PROMPT FOR AGENT]: Refactor hardcoded values to use design tokens.\n';
  report += '===================================================================\n\n';

  if (violations.length === 0) {
    report += '✅ No hardcoded values found.\n';
    return report;
  }

  report += `Found ${violations.length} violation(s):\n\n`;

  // Группировка по файлам
  const byFile = {};
  violations.forEach(v => {
    const [filePath] = v.location.split(':');
    if (!byFile[filePath]) byFile[filePath] = [];
    byFile[filePath].push(v);
  });

  Object.entries(byFile).forEach(([filePath, items]) => {
    report += `File: ${filePath}\n`;
    items.forEach(item => {
      report += `  ${item.location} | ${item.match} | ${item.line}\n`;
    });
    report += '\n';
  });

  return report;
}

function generateSummaryReport(violations, patterns) {
  let report = '===================================================================\n';
  report += '         UNIVERSAL HARDCODE SEARCH SUMMARY                         \n';
  report += `Timestamp: ${new Date().toLocaleString('ru-RU')}\n`;
  report += '===================================================================\n\n';

  if (violations.length === 0) {
    report += '✅ No hardcoded values found.\n';
    return report;
  }

  // Группировка по типам паттернов
  const groupedByType = {};
  violations.forEach(v => {
    if (!groupedByType[v.type]) {
      groupedByType[v.type] = {
        description: v.description,
        violations: []
      };
    }
    groupedByType[v.type].violations.push(v);
  });

  report += `Found ${violations.length} hardcoded value(s) across ${Object.keys(groupedByType).length} pattern type(s):\n\n`;

  Object.entries(groupedByType).forEach(([type, data]) => {
    report += `- ${type}: ${data.violations.length} violations\n`;
  });

  report += '\nDetailed reports available in individual category files.\n';

  return report;
}

function runUniversalHardcodeSearch(disableDynamicAudits = false) {
  if (disableDynamicAudits) {
    console.log('[13 Universal Hardcode Search] Skipped (dynamic audits disabled)');
    return;
  }

  if (!fs.existsSync(AUDITS_DIR)) fs.mkdirSync(AUDITS_DIR, { recursive: true });

  const patterns = loadConfig();
  const violations = [];
  walkDir(SRC_DIR, patterns, violations);

  // Группировка по типам паттернов
  const groupedByType = {};
  violations.forEach(v => {
    if (!groupedByType[v.type]) {
      groupedByType[v.type] = {
        description: v.description,
        violations: []
      };
    }
    groupedByType[v.type].violations.push(v);
  });

  // Создание отдельных файлов для каждой категории
  Object.entries(groupedByType).forEach(([type, data]) => {
    const fileName = type.toLowerCase().replace(/_/g, '-');
    const logFile = path.join(AUDITS_DIR, `13-${fileName}-violations.log`);
    const report = generateCategoryReport(type, data.description, data.violations);
    fs.writeFileSync(logFile, report);
  });

  // Создание суммарного отчета
  const summaryFile = path.join(AUDITS_DIR, '13-universal-hardcode-search-summary.log');
  const summaryReport = generateSummaryReport(violations, patterns);
  fs.writeFileSync(summaryFile, summaryReport);

  console.log(`[13 Universal Hardcode Search] Finished (${violations.length} violations across ${Object.keys(groupedByType).length} categories) -> .docs/audits/audits/`);
}

module.exports = { runUniversalHardcodeSearch };

if (require.main === module) runUniversalHardcodeSearch();
