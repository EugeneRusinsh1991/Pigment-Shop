# Complexity Multipliers

**Change Type Multipliers:**
- `move/rename`: ×0.5 (mechanical, low risk)
- `find-replace`: ×0.3 (simple pattern replacement)
- `refactor`: ×1.5 (requires understanding)
- `new feature`: ×2.0 (requires design decisions)

**Code Volume (per file):**
- <50 lines: ×0.8
- 50-200 lines: ×1.0
- 200-500 lines: ×1.3
- >500 lines: ×1.5

**File Coupling:**
- Independent files: ×0.7
- Moderate dependencies: ×1.0
- High coupling: ×1.4

**Adaptive Safety Margin:**
- Simple types (move/find-replace): ×1.1
- Complex types (refactor/new feature): ×1.3

**Final Score Calculation:**
`(f + d + ctx) × Type × Volume × Coupling × AdaptiveMargin`
