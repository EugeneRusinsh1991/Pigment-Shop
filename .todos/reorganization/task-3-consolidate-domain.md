# Task 3: Consolidate Domain Layer

🟡 G 3.6 F (M) — 2d | 1f | +3r

## Overview
Merge domain contract into services layer to consolidate architecture.

## File to Move
- `catalogEntityContract.ts` → `src/services/` (merge with service contracts)

## Details
**From:** `src/domain/catalogEntityContract.ts`
**To:** `src/services/` (merge with service contracts)

**View changes:** Check `src/domain/catalogEntityContract.ts` (removed) and `src/services/` (merged content)
**UI impact:** No visual changes - file reorganization only

## Notes
- Review the contract content to determine appropriate merge location
- Update imports from `src/domain/` to `src/services/`
- Consider if other domain files should also be consolidated
- Run tests to ensure no breaking changes
