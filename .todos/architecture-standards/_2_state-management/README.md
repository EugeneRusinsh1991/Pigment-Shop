# State Management & Context Architecture Standard

## 🎯 Goal
Establish strict architectural rules for React Context in `src/context/` to prevent unnecessary re-renders, standardize selector patterns, and isolate side-effects.

## 📌 Target Scope
- `src/context/CartContext.js`
- `src/context/AuthContext.js`
- `src/context/CatalogContext.js`
- `src/context/FavoritesContext.js`
- `src/context/ToastContext.js`
- `src/context/LanguageContext.js`
- `src/context/ThemeContext.js`

## 🛠️ Tasks
1. **Spec Creation**: Create `.docs/architecture-standards/state-module-spec.md` defining split-context patterns (state vs dispatch), action standards, and hooks isolation.
2. **Audit**: Audit existing React Context files for re-render risks and state leaks.
3. **Refactoring Roadmap**: Formulate refactoring tasks for high-risk context providers.
