# Project Commands Reference (`Commands.md`)

This document serves as the single source of truth for all documented, scriptable, and utility commands available in the project.

---

## 🚀 1. Development & Application Shell

Commands for starting the local development server, launching on target platforms, and checking TypeScript types.

| Command | Description | When to Use | Found In (Source) | Shortcut | Notes / Prerequisites |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `npm run dev` | Starts the Metro bundler / Expo development server. | Everyday local development and live preview. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L23) | — | Default dev server runs at `http://localhost:8081`. |
| `npm start` | Alias for `expo start`. | Alternative entry point to launch Expo dev server. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L22) | — | Requires Node environment. |
| `npm run web` | Launches Expo dev server tailored specifically for web environment. | When testing web-specific features or debugging React Native Web. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L26) | — | Opens web platform bundler. |
| `npm run android` | Starts Expo dev server and attempts launch on Android emulator/device. | Mobile testing on Android. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L24) | — | Requires Android SDK / emulator running. |
| `npm run ios` | Starts Expo dev server and attempts launch on iOS simulator. | Mobile testing on iOS (macOS only). | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L25) | — | Requires macOS and Xcode Simulator. |
| `npm run type-check` | Runs TypeScript compiler in non-emitting type checking mode (`tsc --noEmit`). | Validating type correctness across `.ts`/`.tsx` files without producing JS output. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L43) | — | Requires TypeScript setup. |
| `node .tools/scripts/dev-server.js` | Launches helper HTTP dev server with fallback static asset serving. | Local static testing or headless server environments. | [.tools/scripts/dev-server.js](file:///d:/Magazine/_PigmentShop/.tools/scripts/dev-server.js) | — | Standalone Node script. |

---

## 📦 2. Build & Production Deployment

Commands for building static assets and preparing production bundles.

| Command | Description | When to Use | Found In (Source) | Shortcut | Notes / Prerequisites |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `npm run build` | Exports static web bundle (`expo export -p web`) and copies `media/` directory into `dist/media`. | Creating a static production build in `dist/`. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L27) | — | Overwrites existing `dist/` bundle. |
| `npm run vercel-build` | Alias script executed by Vercel deployment pipeline. | Automated CI/CD builds on Vercel platform. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L28) | — | Configured in `vercel.json`. |

---

## 🛡️ 3. Core Project Management & Life Cycle (`.tools/core`)

Lifecycle utility commands for environment health, backup/restore, cache cleaning, and codebase archiving.

| Command | Description | When to Use | Found In (Source) | Shortcut | Notes / Prerequisites |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `npm run backup` | Creates an automated timestamped backup of codebase files in parent folder while logging diffs. | Before risky refactoring or major architectural shifts. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L29), [.tools/README.md](file:///d:/Magazine/_PigmentShop/.tools/README.md#L34) | `Ctrl+Alt+Shift+B` | Protects `.tools` directory from cleanup. |
| `npm run restore` | Opens interactive CLI menu to select and restore from 20 most recent backups. | Reverting workspace state to a prior safety snapshot. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L30), [.tools/README.md](file:///d:/Magazine/_PigmentShop/.tools/README.md#L35) | `Ctrl+Alt+Shift+V` | Automatically creates safety snapshot before restoring. |
| `npm run restore <backup_path>` | Direct restore from a specific backup folder path. | Automated or non-interactive restoration of a known backup path. | [.tools/README.md](file:///d:/Magazine/_PigmentShop/.tools/README.md#L36) | — | Path must point to valid backup folder. |
| `npm run clean` | Cleans temporary build artifacts, Expo cache (`.expo`), `dist`, `coverage`, and temporary snapshots. | Resolving build glitches, cache corruption, or freeing disk space. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L37), [.tools/README.md](file:///d:/Magazine/_PigmentShop/.tools/README.md#L50) | `Ctrl+Alt+Shift+C` | Deletes build outputs; run `npm run dev` afterwards. |
| `npm run health` | Validates Node environment, `package.json`, environment keys, and relative JS/TS imports. | Diagnosing workspace environment integrity or import breakages. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L38), [.tools/README.md](file:///d:/Magazine/_PigmentShop/.tools/README.md#L58) | `Ctrl+Alt+Shift+H` | Reports missing packages or unresolved relative paths. |
| `npm run pack` | Creates clean, production-ready timestamped ZIP archive of project codebase in parent directory. | Archiving codebase or sharing clean snapshot excluding dependencies/cache. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L39), [.tools/README.md](file:///d:/Magazine/_PigmentShop/.tools/README.md#L66) | `Ctrl+Alt+Shift+P` | Excludes `node_modules`, `.git`, `.expo`, `dist`. |

---

## 🔍 4. Static Code Audits & Diagnostics (`.tools/auditors`)

Static analysis tools verifying design tokens, UI architecture, i18n, performance, imports, and code hygiene.

| Command | Description | When to Use | Found In (Source) | Shortcut | Notes / Prerequisites |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `npm run audit` | Runs `fallow` static analysis auditor and exports markdown reports to `.audits/`. | High-level architectural hygiene check. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L31), [.tools/README.md](file:///d:/Magazine/_PigmentShop/.tools/README.md#L75) | `Ctrl+Alt+Shift+A` | Generates logs in `.tools/.audits/`. |
| `npm run audit:ui` | Runs complete UI System Audit Suite (architecture, hardcoded colors/text, typography, service isolation). | Comprehensive check of UI design system compliance and token usage. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L32), [.tools/auditors/ui-auditor/README.md](file:///d:/Magazine/_PigmentShop/.tools/auditors/ui-auditor/README.md#L12) | — | Writes detailed log files into `.docs/audits/`. |
| `npm run audit:perf` | Executes performance auditor across components. | Detecting rendering bottlenecks or heavy re-render loops. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L34) | — | Uses `tsx` runner. |
| `npm run audit:perf:interactive` | Runs performance auditor in interactive prompt mode. | Detailed interactive performance analysis step-by-step. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L35) | — | Interactive CLI session. |
| `node .tools/i18n-audit.js` | Audits codebase for raw unlocalized i18n keys and string literals. | Verifying localization coverage across screens and components. | [.tools/i18n-audit.js](file:///d:/Magazine/_PigmentShop/.tools/i18n-audit.js) | — | Outputs missing translations report. |
| `node .tools/scripts/verify-typography.js` | Checks compliance of text primitives against central design system tokens. | Catching custom inline font sizes or weight overrides. | [.tools/scripts/verify-typography.js](file:///d:/Magazine/_PigmentShop/.tools/scripts/verify-typography.js) | — | Scans `src/components/`. |
| `node find-broken-imports.js` | Scans `src/`, `app/`, and `components/` for non-existent relative import paths. | Finding dead/broken relative import references. | [find-broken-imports.js](file:///d:/Magazine/_PigmentShop/find-broken-imports.js) | — | Outputs JSON list of broken imports. |
| `node fix-imports.js` | Automatically fixes known broken imports across domain/UI component paths. | Automated resolution of structural relocation import paths. | [fix-imports.js](file:///d:/Magazine/_PigmentShop/fix-imports.js) | — | Mutates target component files. |
| `node replace_tokens.js` | Batch replaces legacy theme token property names with modern system tokens. | Refactoring old token references across `src/`. | [replace_tokens.js](file:///d:/Magazine/_PigmentShop/replace_tokens.js) | — | Skips `tokens.js` itself. |

---

## 🤖 5. Browser Automation & E2E Exploration (`.tools/automation`)

Playwright-based autonomous UI crawlers, navigation explorer suites, and manual browser inspectors.

| Command | Description | When to Use | Found In (Source) | Shortcut | Notes / Prerequisites |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `npm run audit:dynamic` | Runs dynamic E2E browser audit via Playwright automation. | Automated browser-level runtime exploration and exception monitoring. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L33) | — | Requires local dev server running (`npm run dev`). |
| `npm run smoke:mocks` | Executes smoke test suite utilizing mocked data API layer. | Fast UI exploration without hitting live Firebase backend. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L36) | — | Runs headless Playwright. |
| `npx tsx .tools/automation/browser-automation/run-full.ts` | Runs full E2E exploration (Admin explorer + guest smoke suite). | Deep regression verification of storefront and admin panel. | [.tools/README.md](file:///d:/Magazine/_PigmentShop/.tools/README.md#L83) | — | Requires dev server running at `localhost:8081`. |
| `npx tsx .tools/automation/browser-automation/run-smoke.ts` | Runs event-driven storefront smoke exploration suite. | Quick smoke check of user-facing storefront routes. | [.tools/automation/browser-automation/run-smoke.ts](file:///d:/Magazine/_PigmentShop/.tools/automation/browser-automation/run-smoke.ts) | `Ctrl+Alt+Shift+E` | Generates report in `browser-automation/reports/`. |
| `npx tsx .tools/automation/browser-automation/run-admin-nav.ts` | Runs targeted exploration of Admin Dashboard views and routes. | Verifying administrative panel features and navigation boundaries. | [.tools/automation/browser-automation/run-admin-nav.ts](file:///d:/Magazine/_PigmentShop/.tools/automation/browser-automation/run-admin-nav.ts) | `Ctrl+Alt+Shift+R` | Checks admin auth credentials. |
| `npx tsx .tools/automation/browser-automation/run-smoke-guest.ts` | Runs smoke suite specifically targeting guest user pathways. | Testing storefront catalog, product details, and checkout flow as guest. | [.tools/automation/browser-automation/run-smoke-guest.ts](file:///d:/Magazine/_PigmentShop/.tools/automation/browser-automation/run-smoke-guest.ts) | — | Guest state testing. |
| `npx tsx .tools/automation/browser-automation/run-smoke-both.ts` | Runs combined smoke test covering guest and authenticated user states. | Comprehensive dual-state smoke validation. | [.tools/automation/browser-automation/run-smoke-both.ts](file:///d:/Magazine/_PigmentShop/.tools/automation/browser-automation/run-smoke-both.ts) | — | Spawns parallel context explorers. |
| `npx tsx .tools/automation/browser-automation/run-smoke-both-headless.ts` | Headless execution of dual-state smoke test suite. | Automated background/CI environment smoke testing. | [.tools/automation/browser-automation/run-smoke-both-headless.ts](file:///d:/Magazine/_PigmentShop/.tools/automation/browser-automation/run-smoke-both-headless.ts) | — | Runs without visual browser UI. |
| `npx tsx .tools/automation/browser-automation/run-smoke-both-loop.ts` | Continuous loop execution of dual-state smoke tests. | Stress-testing application stability and checking for memory leaks over time. | [.tools/automation/browser-automation/run-smoke-both-loop.ts](file:///d:/Magazine/_PigmentShop/.tools/automation/browser-automation/run-smoke-both-loop.ts) | — | Terminate with `Ctrl+C`. |
| `node .tools/scripts/smoke-test/smoke-test.runner.js` | Legacy smoke test runner script. | Alternative smoke test execution pipeline. | [.tools/scripts/smoke-test/smoke-test.runner.js](file:///d:/Magazine/_PigmentShop/.tools/scripts/smoke-test/smoke-test.runner.js) | — | Generates JSON results. |
| `node .tools/scripts/open-playwright.js [url]` | Launches interactive Chromium browser with attached manual inspector (default: `http://localhost:8081`). | Live visual inspection, manual UI state capture, and debugging. | [.tools/README.md](file:///d:/Magazine/_PigmentShop/.tools/README.md#L88) | `Alt + 1` (in browser window) | Saves screenshots & state dumps to `.logs/manual-browser-log/`. |

---

## 🛠️ 6. Data & Media Management Utilities (`.tools/scripts`)

Scripts for media manifests, database regeneration, web crawling, and backup comparison.

| Command | Description | When to Use | Found In (Source) | Shortcut | Notes / Prerequisites |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `npm run generate-media` | Scans `media/` directory and generates centralized media manifest. | Whenever new image or asset files are added to `media/`. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L40) | — | Updates media references index. |
| `npm run regenerate-database` | Seeds and regenerates local data repository databases with full dataset. | Resetting database state or generating initial dummy data. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L41) | — | Overwrites existing seed database. |
| `npm run regenerate-database-low` | Seeds database using compact / low-memory dataset footprint. | Lightweight local database initialization. | [package.json](file:///d:/Magazine/_PigmentShop/package.json#L42) | — | Faster seeding with fewer entities. |
| `node .tools/scripts/crawl.js` | Crawls local application links and outputs route link map. | Extracting comprehensive route graph or discovering unlinked pages. | [.tools/scripts/crawl.js](file:///d:/Magazine/_PigmentShop/.tools/scripts/crawl.js) | — | Outputs `crawl-results.json`. |
| `node .tools/scripts/compare-backup.js` | Compares two backup directories and prints file structural diff log. | Investigating differences between two backup snapshots. | [.tools/scripts/compare-backup.js](file:///d:/Magazine/_PigmentShop/.tools/scripts/compare-backup.js) | — | Requires backup paths as arguments. |
| `node .tools/scripts/cleanOldFiles.js` | Purges outdated log files and obsolete test artifacts. | Maintenance and disk space optimization. | [.tools/scripts/cleanOldFiles.js](file:///d:/Magazine/_PigmentShop/.tools/scripts/cleanOldFiles.js) | — | Cleans `.logs` and `test-results`. |

---

## 🔀 7. Version Control & Git Operations

Standardized Git workflow commands for feature branching, stashing, and rollbacks.

| Command | Description | When to Use | Found In (Source) | Shortcut | Notes / Prerequisites |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `git status` | Displays working tree status (modified, staged, untracked files). | Checking current branch state before committing or switching. | [.docs/git-branching-guide.md](file:///d:/Magazine/_PigmentShop/.docs/git-branching-guide.md#L23) | — | Safe read-only command. |
| `git checkout -b <branch>` | Creates and switches to a new working branch. | Starting work on a new feature or experiment. | [.docs/git-branching-guide.md](file:///d:/Magazine/_PigmentShop/.docs/git-branching-guide.md#L36) | — | Branch naming convention: `feature/name`. |
| `git add .` | Stages all current file modifications and additions. | Preparing files for commit. | [.docs/git-branching-guide.md](file:///d:/Magazine/_PigmentShop/.docs/git-branching-guide.md#L51) | — | Stages all unstaged changes. |
| `git commit -m "<msg>"` | Records staged changes to local repository history with message. | Saving a checkpoint of completed work. | [.docs/git-branching-guide.md](file:///d:/Magazine/_PigmentShop/.docs/git-branching-guide.md#L52) | — | Use semantic commit messages. |
| `git push -u origin <branch>` | Pushes local branch to remote repository and sets upstream tracking. | Publishing a new branch to GitHub. | [.docs/git-branching-guide.md](file:///d:/Magazine/_PigmentShop/.docs/git-branching-guide.md#L64) | — | Requires remote repository access. |
| `git merge <branch>` | Merges specified feature branch into current branch. | Integrating completed feature branch into `main`. | [.docs/git-branching-guide.md](file:///d:/Magazine/_PigmentShop/.docs/git-branching-guide.md#L80) | — | Run on target branch (e.g., `main`). |
| `git branch -D <branch>` | Force deletes specified local branch. | Discarding an abandoned experiment branch. | [.docs/git-branching-guide.md](file:///d:/Magazine/_PigmentShop/.docs/git-branching-guide.md#L94) | — | Unmerged changes will be lost. |
| `git restore .` | Discards all local unstaged workspace modifications. | Reverting modified files back to last commit state. | [.docs/git-branching-guide.md](file:///d:/Magazine/_PigmentShop/.docs/git-branching-guide.md#L115) | — | Destructive to unstaged changes. |
| `git stash -u` | Stashes uncommitted changes (including untracked files) to temporary shelf. | Context switching to another urgent task without committing WIP. | [.docs/git-branching-guide.md](file:///d:/Magazine/_PigmentShop/.docs/git-branching-guide.md#L145) | — | Cleans workspace temporarily. |
| `git stash pop` | Re-applies most recently stashed changes and removes from stash shelf. | Resuming work after context switch. | [.docs/git-branching-guide.md](file:///d:/Magazine/_PigmentShop/.docs/git-branching-guide.md#L149) | — | May produce merge conflicts if files changed. |
| `git commit --amend --no-edit` | Merges staged changes into previous commit without changing commit message. | Including forgotten files in the most recent commit. | [.docs/git-branching-guide.md](file:///d:/Magazine/_PigmentShop/.docs/git-branching-guide.md#L162) | — | Alters local commit history. |
| `git reset --soft HEAD~1` | Reverts last commit while keeping modified changes staged in workspace. | Undoing a commit to rewrite or re-organize changes. | [.docs/git-branching-guide.md](file:///d:/Magazine/_PigmentShop/.docs/git-branching-guide.md#L176) | — | Preserves file edits. |
| `git reset --hard HEAD~1` | Completely discards last commit and all associated file edits. | Reverting completely past the last commit. | [.docs/git-branching-guide.md](file:///d:/Magazine/_PigmentShop/.docs/git-branching-guide.md#L179) | — | Destructive action; cannot be undone easily. |
| `git log --graph` | Displays visual graph of commit history and branch merges. | Inspecting branch structure and commit history. | [.docs/git-branching-guide.md](file:///d:/Magazine/_PigmentShop/.docs/git-branching-guide.md#L231) | — | Interactive pager view. |

---

## ⌨️ 8. Hotkeys & IDE Shortcuts Summary

Quick reference table for keyboard shortcuts across VS Code tasks and Playwright browser sessions.

| Shortcut / Hotkey | Scope / Context | Command Executed | Purpose |
| :--- | :--- | :--- | :--- |
| `Alt + 1` | Playwright Chromium Browser | Interactive Inspector Capture | Instant snapshot capture, rendering timestamp banner and JSON state dump to `.logs/manual-browser-log/`. |
| `Alt + 2` | Playwright Chromium Browser | Toggle Live Highlight Mode | Toggles real-time DOM element highlighting on hover (green bounding box and tag/selector badge overlay). |
| `Ctrl + Shift + G` | VS Code IDE | Source Control Panel | Opens VS Code Git management side panel. |
| `Ctrl + Alt + Shift + B` | VS Code IDE Task | `npm run backup` | Trigger automated project backup task. |
| `Ctrl + Alt + Shift + V` | VS Code IDE Task | `npm run restore` | Launch interactive restore menu task. |
| `Ctrl + Alt + Shift + A` | VS Code IDE Task | `npm run audit` | Run codebase audit task. |
| `Ctrl + Alt + Shift + C` | VS Code IDE Task | `npm run clean` | Run cache & build artifact cleanup task. |
| `Ctrl + Alt + Shift + H` | VS Code IDE Task | `npm run health` | Run health and import check task. |
| `Ctrl + Alt + Shift + P` | VS Code IDE Task | `npm run pack` | Pack codebase into timestamped ZIP archive task. |
| `Ctrl + Alt + Shift + E` | VS Code IDE Task | `npx tsx .tools/automation/browser-automation/run-smoke.ts` | Launch automation storefront smoke explorer task. |
| `Ctrl + Alt + Shift + R` | VS Code IDE Task | `npx tsx .tools/automation/browser-automation/run-admin-nav.ts` | Launch automation admin panel explorer task. |

