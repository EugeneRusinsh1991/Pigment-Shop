# Project Developer Tools (`.tools`)

This directory contains standalone, project-agnostic developer tools and automated helpers. It can be copied into any project workspace as a plug-and-play directory.

---

## Included Modules

### 1. `.backuper` — Smart Backup & Restore Engine
Provides automated backup creation, diff logging, and safe project restoration.

- **Commands**:
  - `npm run backup` — Creates an automated timestamped backup in the parent directory.
  - `npm run restore` — Opens an interactive CLI menu (arrow keys) to select and restore from the 20 most recent backups or create quick/commented backups.
  - `npm run restore <backup_path>` — Restores directly from a specific backup folder.
- **Key Features**:
  - **Universal Project Discovery**: Automatically backs up project root files while ignoring standard build folders (`node_modules`, `dist`, `.git`, `.next`, `coverage`, etc.). Optional `.backuper.json` file can customize includes/excludes.
  - **JSON Diff Logging**: Every backup calculates file additions (`+`), deletions (`-`), and modifications (`~`) relative to the previous backup, saved in `.backuper/log/diff-history.json`.
  - **Safety & Protection**:
    - The `.tools` directory is **strictly protected** and never deleted during restore operations.
    - Automatic safety snapshot (`_backup_before_restore_<timestamp>`) is created prior to any file overwrite/cleanup.

---

### 2. `.auditor` — Static Analysis & Codebase Health
Runs static analysis via `fallow` and generates structured Markdown reports.

- **Commands**:
  - `npm run audit` — Runs static analysis and generates reports in `.auditor-reports/`.
- **Outputs**:
  - `.auditor-reports/project/Codebase-Audit-Report.md` (High/Critical health findings, dead exports, unused dependencies, code duplication).

---

### 3. `.cleaner` — Project Artifact & Cache Cleaner
Safely removes cache and temporary build directories (`.expo`, `dist`, `web-build`, `test-results`, `coverage`, `.cache`, `_backup_before_restore_*`).

- **Commands**:
  - `npm run clean` — Cleans all build artifacts and temporary snapshots.

---

### 4. `.health` — Environment & Integrity Validator
Checks Node.js environment, `package.json` syntax, `.env` vs `.env.example` key syncing, and scans for broken relative JS/TS imports.

- **Commands**:
  - `npm run health` — Runs comprehensive project environment and import diagnostics.

---

### 5. `.packer` — Standalone Codebase Archiver
Creates a clean, production-ready `.zip` archive of the project codebase (excluding `node_modules`, `.git`, build/cache dirs, and existing archives).

- **Commands**:
  - `npm run pack` — Packages the codebase into a clean timestamped ZIP file in the parent folder.

---

### 6. `browser-automation` — Event-Driven Browser Exploration Suite
Provides autonomous UI exploration, smoke testing, and deep diagnostics using Playwright.

- **Commands**:
  - `npx tsx .tools/browser-automation/run-full.ts` — Executes full project exploration (runs Admin explorer, waits 5s, then runs standard smoke explorer).
  - `npx tsx .tools/browser-automation/run-smoke.ts` — Executes event-driven smoke test suite (ensures dev server readiness, runs authenticated admin & catalog exploration, generates `smoke-report.json`).
  - `npx tsx .tools/browser-automation/run-admin-nav.ts` — Executes targeted navigation tests across admin dashboard views.
  - `npx tsx .tools/browser-automation/run.ts` — Launches generic UI Explorer engine.
  - `node scripts/open-playwright.js [url]` — Launches interactive Playwright Chromium browser session with persistent profile & manual inspector attached (default: `http://localhost:8081`).
- **Key Features**:
  - **Narrative Console Reporter**: Streamlined real-time terminal output focusing on page transitions and semantic interactions.
  - **Environment & Auth Validation**: Validates `SMOKE_ADMIN_USERNAME` and `SMOKE_ADMIN_PASSWORD` credentials before starting automated contexts.
  - **Structured Reports**: Generates detailed execution reports in `.tools/browser-automation/reports/`.

---

### 7. `manual-browser-inspector` — On-Demand Debug & Screenshot Inspector
Enables on-demand UI state snapshotting and diagnostics directly from the browser window during Playwright sessions.

- **Shortcut / Activation**:
  - Press `Alt + 1` in Playwright browser window to trigger instant capture.
- **Key Features**:
  - **Descriptive File Naming**: Generates filesystem-safe, timestamped names formatted as `S_HH-MM-SS_Section_Page_View.jpg`.
  - **On-Image Text Overlay**: Automatically renders a crisp location context banner (`Location > Hierarchy | HH:MM:SS`) on the captured screenshot.
  - **State & Report Dumps**: Saves raw JSON application state dumps and Markdown debug reports to `.docs/browserLog/`.
  - **Auto Retention**: Retains up to 10 recent screenshots, state dumps, and debug reports automatically.

---

## How to Port `.tools` to Another Project

1. Copy the `.tools` directory to the root of the target project.
2. Add scripts to `package.json`:
   ```json
   "scripts": {
     "backup": "node .tools/.backuper/backup.js",
     "restore": "node .tools/.backuper/restore.js",
     "audit": "node .tools/.auditor/run-audit.cjs",
     "clean": "node .tools/.cleaner/run-clean.cjs",
     "health": "node .tools/.health/run-health.cjs",
     "pack": "node .tools/.packer/run-pack.cjs"
   }
   ```
3. (Optional) Create `.backuper.json` in the project root if custom exclude/include paths are required:
   ```json
   {
     "exclude": ["custom_tmp_folder"],
     "include": ["extra_dir"]
   }
   ```

---

## Ready-to-Copy VS Code Configurations

### A. `.vscode/tasks.json` (Project tasks)
Copy and paste into your project's `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Tools: Backup",
      "type": "shell",
      "command": "npm run backup",
      "presentation": { "reveal": "always", "panel": "shared" },
      "problemMatcher": []
    },
    {
      "label": "Tools: Restore Menu",
      "type": "shell",
      "command": "npm run restore",
      "presentation": { "reveal": "always", "panel": "dedicated", "focus": true },
      "problemMatcher": []
    },
    {
      "label": "Tools: Audit Codebase",
      "type": "shell",
      "command": "npm run audit",
      "presentation": { "reveal": "always", "panel": "shared" },
      "problemMatcher": []
    },
    {
      "label": "Tools: Clean Cache & Artifacts",
      "type": "shell",
      "command": "npm run clean",
      "presentation": { "reveal": "always", "panel": "shared" },
      "problemMatcher": []
    },
    {
      "label": "Tools: Health Check",
      "type": "shell",
      "command": "npm run health",
      "presentation": { "reveal": "always", "panel": "shared" },
      "problemMatcher": []
    },
    {
      "label": "Tools: Pack Codebase ZIP",
      "type": "shell",
      "command": "npm run pack",
      "presentation": { "reveal": "always", "panel": "shared" },
      "problemMatcher": []
    },
    {
      "label": "Tools: Automation Smoke Explorer",
      "type": "shell",
      "command": "npx tsx .tools/browser-automation/run-smoke.ts",
      "presentation": { "reveal": "always", "panel": "dedicated", "focus": true },
      "problemMatcher": []
    },
    {
      "label": "Tools: Automation Admin Explorer",
      "type": "shell",
      "command": "npx tsx .tools/browser-automation/run-admin-nav.ts",
      "presentation": { "reveal": "always", "panel": "dedicated", "focus": true },
      "problemMatcher": []
    }
  ]
}
```

### B. VS Code `keybindings.json` (Global shortcuts)
Open **File > Preferences > Keyboard Shortcuts (JSON)** (`keybindings.json`) and paste:

```json
[
  {
    "key": "ctrl+alt+shift+b",
    "command": "workbench.action.tasks.runTask",
    "args": "Tools: Backup"
  },
  {
    "key": "ctrl+alt+shift+v",
    "command": "workbench.action.tasks.runTask",
    "args": "Tools: Restore Menu"
  },
  {
    "key": "ctrl+alt+shift+a",
    "command": "workbench.action.tasks.runTask",
    "args": "Tools: Audit Codebase"
  },
  {
    "key": "ctrl+alt+shift+c",
    "command": "workbench.action.tasks.runTask",
    "args": "Tools: Clean Cache & Artifacts"
  },
  {
    "key": "ctrl+alt+shift+h",
    "command": "workbench.action.tasks.runTask",
    "args": "Tools: Health Check"
  },
  {
    "key": "ctrl+alt+shift+p",
    "command": "workbench.action.tasks.runTask",
    "args": "Tools: Pack Codebase ZIP"
  },
  {
    "key": "ctrl+alt+shift+e",
    "command": "workbench.action.tasks.runTask",
    "args": "Tools: Automation Smoke Explorer"
  },
  {
    "key": "ctrl+alt+shift+r",
    "command": "workbench.action.tasks.runTask",
    "args": "Tools: Automation Admin Explorer"
  }
]
```
