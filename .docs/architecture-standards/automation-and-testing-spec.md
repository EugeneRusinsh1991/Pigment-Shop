# Architecture Specification: Automation & Quality Inspection

> [!NOTE]
> Specification for end-to-end browser automation, Playwright integration, visual regression testing, and code hygiene auditors.

---

## 1. Overview & Directory Structure

Automation tools and architectural auditors reside in `.tools/`:
- `.tools/automation/`: Playwright test scripts and end-to-end browser automation suites.
- `.tools/auditors/`: Static code analysis and architectural compliance auditors.
- `.tools/scripts/`: Developer utility scripts for launching test runners.

---

## 2. Playwright E2E Automation (`.tools/automation/`)

Provides browser automation for testing critical user journeys:
- **Checkout Flow**: Validates cart operations, customer details entry, and order placement.
- **Admin Management**: Automates CRUD operations on products, categories, and banners.
- **Visual Regression**: Compares layout screenshots across standard viewport sizes.

---

## 3. Code Hygiene Auditors (`.tools/auditors/`)

Custom auditors enforce codebase standards prior to release:
- Checks for hardcoded style violations.
- Verifies token usage rules.
- Detects orphaned components or broken exports.
