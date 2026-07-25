# Scripts & Utilities

## Responsibility
Standalone Node.js build, backup, crawling, and developer scripts.

## When to use
Open when modifying build scripts, updating the test server, or running custom operations.

## Logical Modules

### Core Utilities
- **Purpose**: Backup systems, restore managers, and cleanups.
- **Files**:
  - [scripts/cleanOldFiles.js](file:///d:/Magazine/_PigmentShop/scripts/cleanOldFiles.js)
  - [scripts/compare-backup.js](file:///d:/Magazine/_PigmentShop/scripts/compare-backup.js)
  - [scripts/restore-all.js](file:///d:/Magazine/_PigmentShop/scripts/restore-all.js)
  - [scripts/restore-docs.js](file:///d:/Magazine/_PigmentShop/scripts/restore-docs.js)
  - [scripts/restore-wps.js](file:///d:/Magazine/_PigmentShop/scripts/restore-wps.js)

### Crawling & Media
- **Purpose**: Crawling utilities and media generators.
- **Files**:
  - [scripts/crawl.js](file:///d:/Magazine/_PigmentShop/scripts/crawl.js)
  - [scripts/generateMediaManifest.js](file:///d:/Magazine/_PigmentShop/scripts/generateMediaManifest.js)
  - [scripts/manifestHelpers.js](file:///d:/Magazine/_PigmentShop/scripts/manifestHelpers.js)
  - [scripts/manifestSettings.js](file:///d:/Magazine/_PigmentShop/scripts/manifestSettings.js)

### Playwright & Testing
- **Purpose**: Playwright config generators and runner stubs.
- **Files**:
  - [scripts/open-playwright.js](file:///d:/Magazine/_PigmentShop/scripts/open-playwright.js)
  - [scripts/playwright.helpers.js](file:///d:/Magazine/_PigmentShop/scripts/playwright.helpers.js)

### Server & Database
- **Purpose**: Local HTTP servers, mock databases, and generators.
- **Files**:
  - [scripts/dev-server.js](file:///d:/Magazine/_PigmentShop/scripts/dev-server.js)
  - [scripts/devServerReport.js](file:///d:/Magazine/_PigmentShop/scripts/devServerReport.js)
  - [scripts/regenerateDatabase.js](file:///d:/Magazine/_PigmentShop/scripts/regenerateDatabase.js)
