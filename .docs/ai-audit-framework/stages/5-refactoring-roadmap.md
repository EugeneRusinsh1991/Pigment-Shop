# Stage 5 — Refactoring Roadmap Index

## 📍 Overview
- **Target Scope**: `.tools/browser-automation/`
- **Total Tasks**: 8 granular subtasks across 4 core phases
- **Audit Profile**: Architecture

## 🗺️ Execution Roadmap

| Task ID | Task Title | Complexity | File Link | Dependencies | Recommended Model |
|---|---|---|---|---|---|
| **TASK-001A** | Decouple Driver Interfaces from Recovery/Readiness | 2/5 | 📄 **[task-001a-decouple-driver-interfaces.md](file:///d:/Magazine/_PigmentShop/.docs/ai-audit-framework/tasks/task-001a-decouple-driver-interfaces.md)** | None | 🟢 Gemini 3.6 Flash (Medium) |
| **TASK-001B** | Eliminate Circular Callbacks Across Exploration Controllers | 3/5 | 📄 **[task-001b-remove-circular-callbacks.md](file:///d:/Magazine/_PigmentShop/.docs/ai-audit-framework/tasks/task-001b-remove-circular-callbacks.md)** | TASK-001A | 🟠 Gemini 3.6 Flash (High) |
| **TASK-002A** | Modularize In-Browser Evaluation in ElementScanner | 3/5 | 📄 **[task-002a-refactor-element-scanner-evaluation.md](file:///d:/Magazine/_PigmentShop/.docs/ai-audit-framework/tasks/task-002a-refactor-element-scanner-evaluation.md)** | TASK-001B | 🟠 Gemini 3.6 Flash (High) |
| **TASK-002B** | Centralize Timeout Magic Numbers in ExplorerConfig | 2/5 | 📄 **[task-002b-centralize-timeout-config.md](file:///d:/Magazine/_PigmentShop/.docs/ai-audit-framework/tasks/task-002b-centralize-timeout-config.md)** | TASK-002A | 🟢 Gemini 3.6 Flash (Medium) |
| **TASK-003A** | Fix Event Loop Timers & Auth Race | 2/5 | 📄 **[task-003a-fix-watchdog-timer-and-auth-race.md](file:///d:/Magazine/_PigmentShop/.docs/ai-audit-framework/tasks/task-003a-fix-watchdog-timer-and-auth-race.md)** | TASK-002B | 🟢 Gemini 3.6 Flash (Medium) |
| **TASK-003B** | Bounded Cache & Unified Tracking | 3/5 | 📄 **[task-003b-bounded-cache-and-unified-tracking.md](file:///d:/Magazine/_PigmentShop/.docs/ai-audit-framework/tasks/task-003b-bounded-cache-and-unified-tracking.md)** | TASK-003A | 🟠 Gemini 3.6 Flash (High) |
| **TASK-004A** | Entrypoint Hardening & Subprocess Decoupling | 2/5 | 📄 **[task-004a-entrypoint-srp-and-credential-security.md](file:///d:/Magazine/_PigmentShop/.docs/ai-audit-framework/tasks/task-004a-entrypoint-srp-and-credential-security.md)** | TASK-003B | 🟢 Gemini 3.6 Flash (Medium) |
| **TASK-004B** | Consolidate Lifecycle Hooks & Reporting Formats | 2/5 | 📄 **[task-004b-cleanup-inspector-hooks-and-reporting.md](file:///d:/Magazine/_PigmentShop/.docs/ai-audit-framework/tasks/task-004b-cleanup-inspector-hooks-and-reporting.md)** | TASK-004A | 🟢 Gemini 3.6 Flash (Medium) |
