# Standardizing Internal Tooling Guide

## Executive Summary
This document provides a plan to replace custom internal audit, backup, and automation scripts inside [.tools/](file:///d:/Magazine/_PigmentShop/.tools) with standard, community-maintained developer tooling (ESLint, Prettier, TypeScript, Playwright).

---

## 1. Problem Analysis

Current issues with custom tooling in `.tools/`:
1. **Resolution & Import Failures**: Custom Node/TS scripts frequently fail due to broken path resolution (e.g. `ERR_MODULE_NOT_FOUND` on execution).
2. **Maintenance Overhead**: Writing custom AST static analyzers and diff-trackers requires continuous maintenance.
3. **Flaky Runners**: Custom automation loops wrapper around Playwright create unnecessary abstraction layers.

---

## 2. Migration Strategy

### A. Static Analysis & Design Audits
- **Current Custom Solution**: `.tools/auditors/` (custom JS AST scanners checking design tokens and typography).
- **Standardized Replacement**: 
  - Use **ESLint** with custom rules or `eslint-plugin-react-native`.
  - Use **Stylelint** or strict **TypeScript** types for design token enforcement.
- **Command**: `npx eslint .` / `npx tsc --noEmit`.
- **Benefits**:
  - **Real-Time IDE Feedback**: Design token violations and syntax issues are highlighted immediately in the editor.
  - **Zero Maintenance Cost**: Eliminates the need to maintain fragile custom Node.js AST parsers.
  - **Auto-Fixing**: Standard tooling supports automated correction via `--fix` flags.

### B. End-to-End & Smoke Testing
- **Current Custom Solution**: `.tools/automation/browser-automation/` custom TS wrappers around Playwright.
- **Standardized Replacement**: 
  - Standard **Playwright Test Runner** (`@playwright/test`).
  - Configure `playwright.config.ts` in root directory.
  - Write test specs in `tests/e2e/`.
- **Command**: `npx playwright test`.
- **Benefits**:
  - **Execution Reliability**: Fixes frequent path resolution failures (`ERR_MODULE_NOT_FOUND`) caused by custom wrappers.
  - **Rich Tooling**: Native access to trace viewers, HTML reports, and interactive UI debugging (`--ui`).
  - **CI/CD Integration**: Seamless integration with standard automation pipelines without custom setup scripts.

### C. Data & Media Generation Scripts
- **Current Custom Solution**: Split between `scripts/` and `.tools/scripts/`.
- **Standardized Replacement**: 
  - Consolidate domain-specific data generators (e.g., `generateMediaManifest.js`, `regenerateDatabase.js`) directly inside a single `scripts/` folder at project root.
- **Benefits**:
  - **Single Source of Truth**: Eliminates confusion between duplicated script folders (`scripts/` vs `.tools/scripts/`).
  - **Clean Architecture**: Enables full deprecation and cleanup of the legacy `.tools/` directory.

---

## 3. Recommended Roadmap

1. **Delete Dead/Broken Scripts**: Remove non-functional runners from `.tools/automation/` and obsolete auditors.
2. **Setup Native Playwright**: Configure `playwright.config.ts` and migrate smoke test scenarios to `tests/e2e/smoke.spec.ts`.
3. **Consolidate Utility Scripts**: Move useful database/media scripts to `scripts/` and delete unnecessary subfolders in `.tools/`.
