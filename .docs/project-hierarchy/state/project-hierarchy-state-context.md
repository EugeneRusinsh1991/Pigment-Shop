# State & Context Layer

## Responsibility
React Context state providers (`src/context/`) and custom hooks (`src/hooks/`).

## When to use
Open when tracing global application state, cart sync, theme state, authentication context, or custom React hooks.

## Key Modules

### Global Context Providers (`src/context/`)
- **ThemeContext**: Active theme state and mode toggle.
- **CartContext**: Shopping cart persistence, items management, checkout state.
- **AuthContext**: User authentication state, token storage, login/logout actions.
- **LanguageContext**: Localization and language state.
- **ToastContext**: Notification toasts dispatching.

### Custom React Hooks (`src/hooks/`)
- Custom React hooks for business operations, screen sizing, and state bindings (`src/hooks/`).
