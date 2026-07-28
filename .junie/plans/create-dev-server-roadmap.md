---
sessionId: session-260728-200122-3j89
---

# Requirements

### Overview & Goals
- Maintain the comprehensive dev-server floating CMD window fix roadmap directly inside `.todos/dev-server-floating-cmd-fix.md` as requested.
- Document exact Windows process tree execution mechanics (`cmd.exe` -> `npm.cmd` -> `node.exe` -> `expo start`) and why `windowsHide: true` fails with batch wrappers.
- Detail concrete remediation paths: Direct Node CLI execution vs PowerShell hidden window wrapper.

### Scope
- **In Scope**:
  - Roadmap synchronization in `.junie/plans/create-dev-server-roadmap.md` and `.todos/dev-server-floating-cmd-fix.md`.
- **Out of Scope**:
  - Direct modification of source code or helper scripts prior to full review.

# Technical Design

### Detailed Diagnostic Findings & Root Cause Analysis
1. **Windows Process Spawning Mechanics**:
   - When `.tools/browser-automation/helpers/devServerHelper.ts` calls `spawn('npm', ['run', 'dev'], { shell: true, detached: true, windowsHide: true })`, Node.js invokes `cmd.exe /s /c "npm run dev"`.
   - On Windows, `npm` resolves to a batch script (`npm.cmd`). Executing a `.cmd` or `.bat` file via `cmd.exe` forces Win32 console allocation unless the hosting parent process explicitly suppresses window creation at the startup info level.
   - Even with `windowsHide: true`, the intermediate `cmd.exe` instance spawned by `shell: true` flashes a transient or persistent floating console window if invoked from non-console contexts (like IDE keyboard shortcuts `Alt + 2`, `Alt + 3`, `Alt + 9`).
2. **Process Tree Hierarchy**:
   - `IDE / Shortcut Trigger` -> `cmd.exe (shell)` -> `npm.cmd` -> `node.exe` -> `expo start`.
   - The detached group creation (`detached: true`) combined with `cmd.exe` causes Windows to treat the process as a top-level console application, surfacing a floating console window.

### Comprehensive Remediation Options
- **Option A (Direct CLI Node Execution)**: Bypass `npm.cmd` and `shell: true` entirely by locating and spawning `node` directly with `node_modules/expo/bin/cli.js start` with `shell: false`.
- **Option B (PowerShell Hidden Wrapper)**: Wrap the invocation using `powershell.exe -WindowStyle Hidden -Command "npm run dev"` or background job invocation.
- **Option C (IDE Integrated Terminal / Run Configuration)**: Map shortcuts to IDE run configurations or integrated terminal API windows (analogous to `Alt + 1`).

### Todo Document Reference (`.todos/dev-server-floating-cmd-fix.md`)
- Maintained as the primary active tracking document for the dev server floating CMD fix roadmap.