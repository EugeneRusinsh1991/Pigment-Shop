# Task 4: Move Admin Icons

🟡 G 3.6 F (M) — 2d | 1f | +4r

## Overview
Move admin-specific icons to the admin feature module if used exclusively by admin.

## File to Move
- `AdminIcons.js` → `src/features/admin/` (if used exclusively by admin)

## Details
**From:** `src/components/Icons/AdminIcons.js`
**To:** `src/features/admin/AdminIcons.js`

**View changes:** Check `src/components/Icons/AdminIcons.js` (removed) and `src/features/admin/AdminIcons.js` (added)
**UI impact:** No visual changes - file reorganization only

## Notes
- First verify that `AdminIcons.js` is only used by admin features
- Search codebase for imports of AdminIcons
- If used outside admin, consider keeping in shared location
- Update all import statements
- Run tests to ensure no breaking changes
