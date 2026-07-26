# Migration Tasks: Admin Feature Page

## Overview
Move Admin UI from `src/components/Admin` into a dedicated feature module `src/features/admin` to conform to feature-based architecture (alongside `catalog`, `cart`, `profile`, etc.).

## Recommended Models
- **Execution:** 🟢 Gemini 3.6 Flash (Low)

## Step 1: Create Feature Directory Structure
- Create `src/features/admin/` with:
  - `components/` (sub-components like tabs, forms, modals)
  - `hooks/` (admin domain hooks)
  - `styles/` (feature specific styles)
  - `index.js` (feature root export)

## Step 2: Migrate Components & Re-exports
- Move components from `src/components/Admin/` to `src/features/admin/components/`.
- Provide temporary backward-compatibility re-exports in `src/components/Admin/index.js` if needed during migration.

## Step 3: Update Imports across App
- Update router/shell imports to consume Admin as a feature page from `@features/admin` or `src/features/admin`.

## Step 4: Clean Up & Verification
- Remove legacy `src/components/Admin/` folder once all imports are updated.
- Run UI audit and health checks (`npm run audit:ui`, `npm run health`).
