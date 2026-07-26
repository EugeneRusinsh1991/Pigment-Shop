# Roadmap: Dynamic UI Auditor (.tools/browser-automation)

## 📋 System Architecture

- **Isolation:** Project codebase (`src/`) remains 100% untouched and unaware of browser automation auditors.
- **Report Destination:** Saved to `.docs/audits/dynamic-audits/`
- **Context Prefixing (Admin vs Public):** 
  - Each auditor generates separate logs based on scope context (`public` vs `admin`):
    - Public Mode: `XX-dynamic-<name>-public-violations.log`
    - Admin Mode: `XX-dynamic-<name>-admin-violations.log`
- **Logging Standard:** 
  - If 0 issues: delete report files for that context.
  - If <= 10 files affected: generate `XX-dynamic-<name>-<scope>-violations.log`.
  - If > 10 files affected: generate both `XX-dynamic-<name>-<scope>-violations.log` and `XX-dynamic-<name>-<scope>-files.log`.

---

## 🛣 Phase 1: Core Infrastructure (`.tools/browser-automation/auditors/`)

1. **Collector Architecture:**
   - Auditor base plugin system accepting a `scope` context (`'public' | 'admin'`) and listening to Playwright browser events.
2. **Suite Runner:**
   - `.tools/browser-automation/run-dynamic-audit.ts` — main entrypoint executing Playwright crawlers for public & admin suites.
3. **Dynamic Report Writer:**
   - `.tools/browser-automation/helpers/dynamic-report-writer.ts` — report generator accepting `scope` (`'public'` or `'admin'`) to write isolated logs.

---

## 🛣 Phase 2: 4 Dynamic Catchers (Auditors)

### 🔵 Catcher 1: `01-dynamic-ui-architecture-auditor`
* **Target Logs:** `01-dynamic-ui-architecture-public-violations.log` / `01-dynamic-ui-architecture-admin-violations.log`
* **Detection Scope:**
  - Interactive elements (buttons, inputs, links) missing design-system attributes (`data-ui`, `data-component`).
  - Elements rendered with inline `style="..."` attributes.
  - Custom UI controls lacking proper WAI-ARIA roles/accessibility labels.

### 🟣 Catcher 2: `02-dynamic-raw-i18n-auditor`
* **Target Logs:** `02-dynamic-raw-i18n-public-violations.log` / `02-dynamic-raw-i18n-admin-violations.log`
* **Detection Scope:**
  - Raw untranslated camelCase keys (e.g. `productAddToCart`, `btnBackLabel`) rendered in DOM `innerText`.
  - Raw runtime fallback strings (`undefined`, `null`, `NaN`, `[object Object]`).
  - Placeholder strings (`Lorem ipsum`, `TODO`, `FIXME`).

### 🔴 Catcher 3: `03-dynamic-broken-ui-auditor`
* **Target Logs:** `03-dynamic-broken-ui-public-violations.log` / `03-dynamic-broken-ui-admin-violations.log`
* **Detection Scope:**
  - Overlapped / intercepted clickable UI elements (pointer-events blocking).
  - Overflow and visual clipping (`scrollWidth > clientWidth`).
  - Broken media resources (404 images or `naturalWidth === 0`).

### 🟡 Catcher 4: `04-dynamic-runtime-health-auditor`
* **Target Logs:** `04-dynamic-runtime-health-public-violations.log` / `04-dynamic-runtime-health-admin-violations.log`
* **Detection Scope:**
  - Unhandled browser console errors (`console.error`, unhandled rejections).
  - HTTP 4xx / 5xx network request failures triggered during UI interaction flows.

---

## 🛣 Phase 3: Integration & Execution

1. **npm Script:**
   ```json
   "audit:dynamic": "ts-node .tools/browser-automation/run-dynamic-audit.ts"
   ```
2. **CI / Local Suite Integration:**
   - Independent execution after static audits.

---

## 📌 Step-by-Step Implementation Tasks

* **Parent Task Recommendation:** 🔴 Gemini 3.1 Pro (High) - 7 files

### 🎯 Prompt 1: Core Base & Fast Auditors (with Scope Separation)
* **Recommended Model:** 🟠 Gemini 3.6 Flash (High) - 3 files
- [x] **Task 1.1:** Create `.tools/browser-automation/helpers/dynamic-report-writer.ts` supporting scope isolation (`public` vs `admin`) and standard `.docs/audits/dynamic-audits/` log rules.
- [x] **Task 1.2:** Create `.tools/browser-automation/auditors/02-dynamic-raw-i18n-auditor.ts` (detects `camelCase` keys, `undefined`, `null`, `NaN`, `Lorem ipsum` in DOM innerText, isolated by scope).
- [x] **Task 1.3:** Create `.tools/browser-automation/auditors/04-dynamic-runtime-health-auditor.ts` (captures browser `console.error` and HTTP 4xx/5xx network failures, isolated by scope).

### 🎯 Prompt 2: Visual DOM Auditors & Suite Integration
* **Recommended Model:** 🟠 Gemini 3.6 Flash (High) - 4 files
- [x] **Task 2.1:** Create `.tools/browser-automation/auditors/01-dynamic-ui-architecture-auditor.ts` (detects elements missing `data-ui`/`data-component`, inline styles, missing ARIA, isolated by scope).
- [x] **Task 2.2:** Create `.tools/browser-automation/auditors/03-dynamic-broken-ui-auditor.ts` (detects element click overlap/interception, text overflow clipping, broken 404 images, isolated by scope).
- [x] **Task 2.3:** Create `.tools/browser-automation/run-dynamic-audit.ts` to orchestrate both `public` and `admin` runs without log collisions.
- [x] **Task 2.4:** Add `"audit:dynamic": "ts-node .tools/browser-automation/run-dynamic-audit.ts"` to `package.json`.

