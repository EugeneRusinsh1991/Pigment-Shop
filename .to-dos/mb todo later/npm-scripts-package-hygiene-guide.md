# NPM Scripts and Package Hygiene Guide

## Executive Summary
This document defines standards for dependency classification and `scripts` configuration in [package.json](file:///d:/Magazine/_PigmentShop/package.json). Cleaning up unused commands and fixing dependency scopes ensures reliable production builds and clean developer workflows.

---

## 1. Dependency Scope Correction

### A. Problem
The following runtime packages are incorrectly placed in `devDependencies`:
- `expo-av` (Audio/Video playback runtime)
- `expo-video` (Next-gen Video player runtime)

If these libraries are bundled into production web/mobile builds, putting them under `devDependencies` can cause resolution failures during CI/CD build pipelines or deployment step trimming.

### B. Resolution
Move `expo-av` and `expo-video` into `dependencies`:

```json
"dependencies": {
  "expo-av": "~15.0.2",
  "expo-video": "~2.0.5",
  "..."
}
```

---

## 2. Standardizing NPM Scripts

### A. Current Cluttered Scripts
Currently `package.json` contains redundant, obsolete, and broken script entries (`audit:ui`, `audit:dynamic`, `smoke:mocks`, `health`, `pack`).

### B. Standardized Clean `scripts` Blueprint

```json
{
  "scripts": {
    "start": "expo start",
    "dev": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    
    "type-check": "tsc --noEmit",
    "test:e2e": "playwright test",
    
    "backup": "node .tools/core/backuper/backup.js",
    "restore": "node .tools/core/backuper/restore.js",
    
    "media:generate": "node scripts/generateMediaManifest.js",
    "db:regenerate": "node scripts/regenerateDatabase.js",
    "db:regenerate:low": "node scripts/regenerateDatabase.js --low"
  }
}
```

---

## 3. Action Items

1. Move `expo-av` and `expo-video` to `dependencies` in `package.json`.
2. Remove unused custom audit/health scripts from `package.json`.
3. Standardize command prefixes (`test:`, `db:`, `media:`).
4. Run `npm install` to update `package-lock.json`.
