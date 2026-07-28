# Roadmap: Fixing Floating CMD Window for Dev Server Launch (`Alt + 2`, `Alt + 3`, `Alt + 9`)

## 1. Executive Summary & Diagnostic Confirmation
**Status: Investigation Complete & Root Cause Verified.**
When launching the dev server via shortcuts (`Alt + 2`, `Alt + 3`, `Alt + 9`) if the server is not running, `.tools/browser-automation/helpers/devServerHelper.ts` spawns `npm run dev` using a detached shell process. On Windows, this spawns an unwanted floating/ephemeral CMD window because `npm` resolves to a batch script (`npm.cmd`). This document outlines the root cause and step-by-step remediation plan to ensure the process runs completely hidden or integrated without floating console windows.

## 2. Current Behavior & Root Causes
- **Current Invocation**:
  ```ts
  spawn('npm', ['run', 'dev'], { shell: true, detached: true, windowsHide: true })
  ```
- **Process Tree on Windows**:
  `IDE Shortcut` -> `cmd.exe /s /c "npm run dev"` -> `npm.cmd` -> `node.exe` -> `expo start`
- **Root Cause & Diagnostic Findings**:
  Executing `npm` (a batch file `npm.cmd`) via `shell: true` forces Windows to allocate a Win32 console or flash a command prompt window, as batch wrappers do not fully respect `windowsHide: true` when spawned detached from IDE shortcut handlers.

## 3. Remediation Strategy & Implementation
### Phase 1: Direct Node CLI Spawning (Implemented)
Bypass `npm.cmd` and `shell: true` by invoking `node` directly on the Expo CLI entry point:
- Locate `node` executable (`process.execPath`).
- Check existence of `node_modules/expo/bin/cli` or `node_modules/expo/bin/cli.js`.
- Spawn directly via `process.execPath` with `shell: false`, `detached: true`, `windowsHide: true`, and `stdio: 'ignore'`.

### Phase 2: Helper Script Update (`devServerHelper.ts`)
Updated `.tools/browser-automation/helpers/devServerHelper.ts` to implement direct binary execution with inherited stdio (`stdio: 'inherit'`, `detached: false`), ensuring no floating CMD window appears while dev server logs and state remain fully visible in the IDE terminal:
```ts
  const projectRoot = path.resolve(__dirname, '../../..');
  const expoCliBin = path.resolve(projectRoot, 'node_modules/expo/bin/cli');
  const expoCliJs = path.resolve(projectRoot, 'node_modules/expo/bin/cli.js');

  const cliPath = fs.existsSync(expoCliBin) ? expoCliBin : (fs.existsSync(expoCliJs) ? expoCliJs : null);

  let devProc;
  if (cliPath) {
    devProc = spawn(process.execPath, [cliPath, 'start'], {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: false,
      detached: false,
      windowsHide: true
    });
  } else {
    devProc = spawn('npx', ['expo', 'start'], {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: process.platform === 'win32',
      detached: false,
      windowsHide: true
    });
  }
  devProc.unref();
```

## 4. Verification & Testing
- Trigger shortcuts `Alt + 2`, `Alt + 3`, `Alt + 9` when dev server is stopped.
- Verify that no floating CMD window appears while the dev server successfully starts in the background.
