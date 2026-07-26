# 🗺️ Roadmap: Service Layer Architecture — Step-by-Step Implementation

> **Spec**: `.docs/architecture-standards/services/services-module-spec.md`
> **Scope**: `src/services/` — all services, repositories, transforms
> **How to use**: copy the prompt from each step and paste it into the chat. Each step is independent — execute in order.

---

## ✅ PROGRESS STATUS

> ⚠️ **Parent Task**: BREAK DOWN INTO SUBTASKS — 20+ files, execute strictly step by step.

| Step | Task | Model | Status |
|------|------|-------|--------|
| 1 | Audit `serviceContract.js` and `collections.js` | 🟡 Gemini 3.6 Flash (Medium) - 2 files | ⬜ |
| 2 | Audit repositories | 🔴 Gemini 3.1 Pro (High) - 6 files | ⬜ |
| 3 | Audit `adminCatalogService.js` + transforms | 🟠 Gemini 3.6 Flash (High) - 3 files | ⬜ |
| 4 | Audit `adminOrdersService.js` | 🟡 Gemini 3.6 Flash (Medium) - 1 file | ⬜ |
| 5 | Audit `adminUsersService.js` | 🟡 Gemini 3.6 Flash (Medium) - 1 file | ⬜ |
| 6 | Audit `authService.js` | 🟡 Gemini 3.6 Flash (Medium) - 1 file | ⬜ |
| 7 | Audit `checkoutService.js` | 🟡 Gemini 3.6 Flash (Medium) - 1 file | ⬜ |
| 8 | Audit transform files + analysis of all services | 🔴 Gemini 3.1 Pro (High) - 8 files | ⬜ |
| 9 | Refactor identified violations | 🔴 Gemini 3.1 Pro (High) - 6+ files | ⬜ |
| 10 | Final compliance check | 🔴 Gemini 3.1 Pro (High) - 10+ files | ⬜ |

---

## STEP 1 — Audit Core Infrastructure (`serviceContract.js`, `collections.js`) · 🟡 Gemini 3.6 Flash (Medium)

**What we check:**
- `serviceContract.js` exports the `withServiceContract` HOF
- `withServiceContract` returns `{ success, data, error, code, originalError }`
- `collections.js` exports a `COLLECTIONS` object with constants for all collections

**📋 PROMPT:**

```
Read the files `src/services/serviceContract.js` and `src/services/collections.js`.

Check compliance with the standard `.docs/architecture-standards/services/services-module-spec.md`:

1. `serviceContract.js`:
   - Exports a function `withServiceContract(fn, defaultErrorMessage)`
   - The returned wrapper function returns a Promise resolving to `{ success: boolean, data?, error?, code?, originalError? }`
   - On success: `{ success: true, data: <result of fn> }`
   - On error: `{ success: false, error: <message>, code?, originalError: <original error> }`
   - Error routing: maps domain error codes (e.g. `NOT_FOUND`, `UNAUTHORIZED`, `VALIDATION_ERROR`) or passes original codes

2. `collections.js`:
   - Exports a `COLLECTIONS` constant with all Firestore collection names
   - No hardcoded string literals like `products` outside this file

Output: list of violations (if any) and list of compliant items. If no violations — write "✅ Core infrastructure complies with the standard".
```

---

## STEP 2 — Audit Repository Layer (`src/services/repositories/`) · 🔴 Gemini 3.1 Pro (High)

**What we check:**
- All repositories are functional modules (no classes)
- All use `COLLECTIONS` instead of hardcoded strings
- Repositories throw exceptions (do not return `{ success, data }`)
- No business logic — only Firestore queries

**📋 PROMPT:**

```
Read all files in `src/services/repositories/`:
- authRepository.js
- catalogRepository.js
- catalogQueryBuilder.js
- favoritesRepository.js
- ordersRepository.js
- usersRepository.js

For each file, check compliance with `.docs/architecture-standards/services/services-module-spec.md`, section 4:

1. No classes — only exported functions or objects with functions
2. No hardcoded collection strings (`products`, `orders`, etc.) — must use `COLLECTIONS` from `../collections.js`
3. No `{ success, data }` in return values — repositories throw errors, they do not wrap them
4. Error routing — repositories throw typed/standardized errors or pass Firestore error codes intact
5. No business logic — only Firestore SDK calls (`getDoc`, `getDocs`, `setDoc`, `addDoc`, `writeBatch`, `query`, `where`)


Output a table: file | violation | line | what to fix. If the file is clean — mark ✅.
```

---

## STEP 3 — Audit `adminCatalogService.js` · 🟠 Gemini 3.6 Flash (High)

**📋 PROMPT:**

```
Read the files:
- `src/services/adminCatalogService.js`
- `src/services/adminCategoriesTransforms.js`
- `src/services/adminProductsTransforms.js`

Check `adminCatalogService.js` against the standard `.docs/architecture-standards/services/services-module-spec.md`:

1. Every exported function MUST be wrapped with `withServiceContract`. Is there any exported async function without a wrapper?
2. Error routing — verifies that errors specify clear error codes/messages for `withServiceContract`
3. The file MUST NOT have direct imports from `firebase/firestore`. All DB requests must go through `repositories/`.

3. Transforms (`toDTO`, `toEntity`) must be called from `*Transforms.js` files, not written inline.

For the transform files check:
- `toDTO(docSnap)` — accepts a Firestore snapshot, returns a clean JS object
- `toEntity(dto)` — strips UI fields before saving to DB

Output: list of violations with line numbers and specific fixes.
```

---

## STEP 4 — Audit `adminOrdersService.js` · 🟡 Gemini 3.6 Flash (Medium)

**📋 PROMPT:**

```
Read the file `src/services/adminOrdersService.js`.

Check compliance with `.docs/architecture-standards/services/services-module-spec.md`:

1. All exported functions are wrapped with `withServiceContract` — no bare async functions in exports
2. No direct imports from `firebase/firestore` — all requests go through `repositories/ordersRepository.js`
3. No hardcoded collection strings
4. If it performs inline data mapping — that is a violation (requires `adminOrdersTransforms.js`)

Output: list of violations (file, line, description, what to fix). If no violations — ✅.
```

---

## STEP 5 — Audit `adminUsersService.js` · 🟡 Gemini 3.6 Flash (Medium)

**📋 PROMPT:**

```
Read the file `src/services/adminUsersService.js`.

Check compliance with `.docs/architecture-standards/services/services-module-spec.md`:

1. All exported functions are wrapped with `withServiceContract`
2. No direct imports from `firebase/firestore` — data flows through `repositories/usersRepository.js`
3. No hardcoded collection strings
4. If it performs inline data mapping — that is a violation (requires `adminUsersTransforms.js`)

Output: list of violations (file, line, description, what to fix). If no violations — ✅.
```

---

## STEP 6 — Audit `authService.js` · 🟡 Gemini 3.6 Flash (Medium)

**📋 PROMPT:**

```
Read the file `src/services/authService.js`.

Check compliance with `.docs/architecture-standards/services/services-module-spec.md`:

1. All exported functions are wrapped with `withServiceContract`
2. Firebase Auth SDK (`signInWithEmailAndPassword`, `signOut`, `onAuthStateChanged`) — allowed directly.
   BUT Firebase Firestore SDK (`getDoc`, `setDoc`, etc.) must go through `repositories/authRepository.js`
3. No hardcoded collection strings when accessing Firestore

Output: list of violations (file, line, description, what to fix). If no violations — ✅.
```

---

## STEP 7 — Audit `checkoutService.js` · 🟡 Gemini 3.6 Flash (Medium)

**📋 PROMPT:**

```
Read the file `src/services/checkoutService.js`.

Check compliance with `.docs/architecture-standards/services/services-module-spec.md`:

1. All exported functions are wrapped with `withServiceContract`
2. No direct imports from `firebase/firestore` — requests go through `repositories/ordersRepository.js` or `repositories/catalogRepository.js`
3. No hardcoded collection strings
4. Checkout business logic (order composition, totals calculation) — must be in the service, not the repository

Output: list of violations (file, line, description, what to fix). If no violations — ✅.
```

---

## STEP 8 — Audit Transform Files · 🔴 Gemini 3.1 Pro (High)

**📋 PROMPT:**

```
Read the files:
- `src/services/adminCategoriesTransforms.js`
- `src/services/adminProductsTransforms.js`

Check compliance with `.docs/architecture-standards/services/services-module-spec.md`, section 3:

1. Each file exports `toDTO` and `toEntity` functions (or equivalents in purpose)
2. `toDTO` — accepts a Firestore DocumentSnapshot, returns a clean JS object. The `id` field must be a string.
3. `toEntity` — accepts a DTO, returns an object without UI fields (no `selected`, temporary blob fields, computed flags). Ready for `setDoc`/`addDoc`.
4. Functions must be pure — no side effects, no DB calls.

Additionally: identify which services perform inline data mapping and need a new `*Transforms.js` file.

Output: list of violations + list of services that need new transform files.
```

---

## STEP 9 — Refactor Identified Violations · 🔴 Gemini 3.1 Pro (High)

> ⚠️ Execute AFTER steps 1–8. For each file with violations — a separate prompt.

**📋 PROMPT TEMPLATE (substitute file name and violations):**

```
Fix the violations in `src/services/<FILE_NAME>.js`.

Violations from audit:
[paste the list of violations for this file from steps 1-8]

Refactoring rules:
1. Fix ONLY the lines with violations, do not touch other code
2. Adding `withServiceContract` — pattern:
   async function _myFunction(args) { /* original code */ }
   export const myFunction = withServiceContract(_myFunction, 'Error description');
3. Extracting transforms — create `src/services/<name>Transforms.js` with `toDTO` and `toEntity` functions
4. Replacing hardcoded strings — use `COLLECTIONS.<NAME>` from `src/services/collections.js`
5. Delegating to repositories — extract raw Firestore operations to `repositories/`, keeping all business logic (validation, data orchestration) inside the service layer
6. Error routing — ensure errors thrown in service or repository set appropriate error codes (`code`) for UI/contract handling


After changes: a brief list of what was changed and at which lines.
```

---

## STEP 10 — Final Architecture Compliance Check · 🔴 Gemini 3.1 Pro (High)

**📋 PROMPT:**

```
Perform a final audit of the service layer against `.docs/architecture-standards/services/services-module-spec.md`, section 6 (Audit & Compliance Rules).

Check three rules:

1. No Untrapped Async Exports
   In `src/services/` (NOT in `repositories/`) find all files with the pattern:
   - `export async function` — without a preceding `withServiceContract`
   - `export const ... = async` — without a preceding `withServiceContract`

2. No Direct Firestore SDK in UI
   Find `from 'firebase/firestore'` imports outside `src/services/` — in `src/components/`, `src/pages/`, `src/hooks/`, `src/store/`.

3. No Direct Firestore SDK in Services (where Repository exists)
   Find services (not repositories) in `src/services/` that import from `firebase/firestore`.

Output a final report:
- ✅ Rules that are compliant
- ❌ Rules with violations (file, line, description)
- 📊 Summary: percentage of compliance with the standard
```

---

## 📌 Notes

- **Steps 1–8** — audit only (no code changes)
- **Step 9** — refactoring (one file at a time)
- **Step 10** — final verification
- Update the status table above after each completed step
