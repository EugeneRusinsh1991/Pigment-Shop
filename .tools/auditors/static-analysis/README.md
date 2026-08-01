# 🔍 Reusable Static Analysis Pipeline

A modular, extensible static analysis pipeline that orchestrates multiple industry-standard static analysis tools ([ESLint](file:///d:/Magazine/_PigmentShop/.tools/auditors/static-analysis/analyzers/eslint-analyzer.js), [Oxlint](file:///d:/Magazine/_PigmentShop/.tools/auditors/static-analysis/analyzers/oxlint-analyzer.js), and [Knip](file:///d:/Magazine/_PigmentShop/.tools/auditors/static-analysis/analyzers/knip-analyzer.js)), aggregates and deduplicates their findings, and produces a single unified Markdown report.

---

## 🏗️ Pipeline Architecture

The pipeline is organized into decoupled modules with clear single responsibilities:

```
.tools/auditors/static-analysis/
├── index.js                     # CLI Entrypoint & Argument Parser
├── pipeline.js                  # StaticAnalysisPipeline Orchestrator
├── config.js                    # Execution Profiles, Target Paths, Categories & Ignore Lists
├── normalizer.js                # Finding Standardization & Cross-Analyzer Deduplication
├── categorizer.js               # Logical Categorization Rules
├── analyzers/
│   ├── base-analyzer.js         # BaseAnalyzer Abstract Class
│   ├── eslint-analyzer.js       # ESLint Integration
│   ├── oxlint-analyzer.js       # Oxlint Integration
│   ├── knip-analyzer.js         # Knip Integration
│   └── index.js                 # Analyzer Registry
└── reporters/
    ├── markdown-reporter.js     # GitHub-Flavored Markdown Report Generator
    └── index.js                 # Report Manager & Log Directory Handler
```

### Core Responsibilities
- **[config.js](file:///d:/Magazine/_PigmentShop/.tools/auditors/static-analysis/config.js)** — Defines execution profiles (`full`, `project`, `tools`), target paths, and default ignore patterns.
- **[base-analyzer.js](file:///d:/Magazine/_PigmentShop/.tools/auditors/static-analysis/analyzers/base-analyzer.js)** — Abstract interface defining `run(profile, config)` and `normalize(rawOutput, profile)` for consistent tool execution.
- **[normalizer.js](file:///d:/Magazine/_PigmentShop/.tools/auditors/static-analysis/normalizer.js)** — Converts absolute paths to relative paths, hashes finding IDs, and merges duplicate findings from different analyzers reporting on the same file/line.
- **[categorizer.js](file:///d:/Magazine/_PigmentShop/.tools/auditors/static-analysis/categorizer.js)** — Classifies findings into logical categories (`Code Quality & Linting`, `Unused Code & Dependencies`, `Type & Security`, `Syntax & Best Practices`, `Other Findings`).
- **[reporters/](file:///d:/Magazine/_PigmentShop/.tools/auditors/static-analysis/reporters/index.js)** — Formats and writes the unified Markdown report and raw analyzer JSON logs to `.logs/static-analysis/`.

---

## ⚡ Execution Flow

1. **CLI Invocation**: `index.js` parses the requested execution profile (`--profile=full|project|tools` or positional argument).
2. **Analyzer Resolution**: `pipeline.js` queries `getAnalyzers()` from `analyzers/index.js` to retrieve all registered analyzers.
3. **Parallel Execution**: All analyzers run concurrently using `Promise.allSettled`. If an individual analyzer fails or encounters a syntax error, its failure is captured in `analyzerStats` without crashing the pipeline.
4. **Normalization**: Each analyzer converts its raw JSON output into standard finding objects with `{ id, filePath, line, column, severity, message, ruleId, category, detectedBy }`.
5. **Deduplication**: `deduplicateFindings()` groups findings by file, line, and similar rule/message, combining the `detectedBy` array (e.g. `['ESLint', 'Oxlint']`).
6. **Categorization**: `categorizeFindings()` assigns each unique finding to a logical category group.
7. **Reporting**: The reporter generates `.logs/static-analysis/latest-report.md`, `.logs/static-analysis/unified-report-<profile>.md`, timestamped historical reports in `.logs/static-analysis/reports/`, and raw JSON payloads in `.logs/static-analysis/raw/`.

---

## 🚀 How to Execute Analysis Profiles

The pipeline supports three execution profiles via npm scripts or direct CLI invocation:

### 1. Full Profile (`full`)
Analyzes the entire repository (excluding `node_modules`, `dist`, `.logs`, etc.).
```bash
npm run audit:static
# or
npm run audit:static:full
# or directly via node:
node .tools/auditors/static-analysis/index.js --profile=full
```

### 2. Project Profile (`project`)
Analyzes only the application source code (`src/`, `app/`, `index.js`, `app.config.js`, `app.json`).
```bash
npm run audit:static:project
# or directly via node:
node .tools/auditors/static-analysis/index.js --profile=project
```

### 3. Tools Profile (`tools`)
Analyzes only internal tooling and automation scripts (`.tools/`, `scripts/`).
```bash
npm run audit:static:tools
# or directly via node:
node .tools/auditors/static-analysis/index.js --profile=tools
```

---

## 🔌 How to Add New Analyzers in the Future

The architecture is built for zero-modality extension. To add a new analyzer (e.g. **Madge**, **Biome**, **ts-prune**, or **depcheck**):

1. **Create an Analyzer Class**:  
   Create a new file in [analyzers/](file:///d:/Magazine/_PigmentShop/.tools/auditors/static-analysis/analyzers/) (e.g., `biome-analyzer.js`) extending [BaseAnalyzer](file:///d:/Magazine/_PigmentShop/.tools/auditors/static-analysis/analyzers/base-analyzer.js):
   ```javascript
   const BaseAnalyzer = require('./base-analyzer');
   const { createNormalizedFinding } = require('../normalizer');

   class BiomeAnalyzer extends BaseAnalyzer {
     constructor() {
       super({
         id: 'biome',
         name: 'Biome',
         description: 'Fast formatter and linter for JavaScript, TypeScript, and JSX'
       });
     }

     getCommand(profile, profileConfig) {
       const targets = profileConfig.targets.join(' ');
       return `npx @biomejs/biome lint --reporter=json ${targets}`;
     }

     normalize(rawOutput, profile) {
       const parsed = JSON.parse(rawOutput || '[]');
       const findings = [];
       // Parse tool-specific output into standard format using createNormalizedFinding(...)
       return findings;
     }
   }

   module.exports = BiomeAnalyzer;
   ```

2. **Register in `analyzers/index.js`**:  
   Import and add the analyzer to `defaultAnalyzers` in [analyzers/index.js](file:///d:/Magazine/_PigmentShop/.tools/auditors/static-analysis/analyzers/index.js#L6-L10):
   ```javascript
   const BiomeAnalyzer = require('./biome-analyzer');

   const defaultAnalyzers = [
     new ESLintAnalyzer(),
     new OxlintAnalyzer(),
     new KnipAnalyzer(),
     new BiomeAnalyzer() // <-- Newly added analyzer
   ];
   ```

No changes are needed to the orchestrator, normalizer, categorizer, or Markdown reporter — the new tool's findings will automatically be executed, deduplicated, categorized, and included in the unified report.

---

## 📁 Report Output Location

All reports are saved inside `.logs/static-analysis/`:
- **`latest-report.md`** — Always points to the most recent run report.
- **`unified-report-<profile>.md`** — Latest report for a specific profile (`full`, `project`, `tools`).
- **`reports/unified-<profile>-<timestamp>.md`** — Historical timestamped Markdown reports.
- **`raw/<id>-<profile>.json`** — Raw analyzer outputs for auditing or debugging.
