# Automation & Testing

## Responsibility
Browser automation suite, end-to-end smoke tests, and UI explorer scripts.

## When to use
Open when investigating smoke test failures, modifying the automation bot, or verifying UI state.

## Logical Modules

### Core Execution
- **Purpose**: Main entry points for the automation runner and smoke tests.
- **Files**:
  - [browser-automation/index.ts](file:///d:/Magazine/_PigmentShop/browser-automation/index.ts)
  - [browser-automation/run.ts](file:///d:/Magazine/_PigmentShop/browser-automation/run.ts)
  - [browser-automation/run-smoke.ts](file:///d:/Magazine/_PigmentShop/browser-automation/run-smoke.ts)
  - [browser-automation/smoke-automation.ts](file:///d:/Magazine/_PigmentShop/browser-automation/smoke-automation.ts)

### Explorer & Scanners
- **Purpose**: DOM inspection, element fingerprinting, state management, and navigation.
- **Files**:
  - [browser-automation/explorer/UIExplorer.ts](file:///d:/Magazine/_PigmentShop/browser-automation/explorer/UIExplorer.ts)
  - [browser-automation/explorer/ElementScanner.ts](file:///d:/Magazine/_PigmentShop/browser-automation/explorer/ElementScanner.ts)
  - [browser-automation/explorer/ActionDepthTracker.ts](file:///d:/Magazine/_PigmentShop/browser-automation/explorer/ActionDepthTracker.ts)

### Execution Context
- **Purpose**: Page managers, Playwright utilities, and environment configuration.
- **Files**:
  - [browser-automation/execution-context/](file:///d:/Magazine/_PigmentShop/browser-automation/execution-context/)

### Observability
- **Purpose**: Centralized event dispatching, metadata extraction, and report generation (JSON, Markdown, Console).
- **Files**:
  - [browser-automation/explorer/observability/](file:///d:/Magazine/_PigmentShop/browser-automation/explorer/observability/)

### Plugins & Reports
- **Purpose**: Subsystem hooks and generated run reports.
- **Files**:
  - [browser-automation/plugins/](file:///d:/Magazine/_PigmentShop/browser-automation/plugins/)
  - [browser-automation/reports/](file:///d:/Magazine/_PigmentShop/browser-automation/reports/)
