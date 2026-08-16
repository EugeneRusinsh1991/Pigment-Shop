# Feature Specification: Auth Module (`src/features/auth/`)

> [!NOTE]
> Specification for user authentication flows, sign-in, registration, password recovery, and auth state modals.

---

## 1. Domain Responsibility

The **Auth Feature** handles user authentication and identity management:
- **Sign In / Sign Up**: Customer login, new user registration forms.
- **Auth Modal Wrapper**: Overlay dialog for seamless in-place authentication during checkout or account actions.
- **Password Management**: Reset password workflows and email notifications.
- **Session Bridge**: Integration with `src/context/AuthContext.js` and Firebase Auth repository services.

---

## 2. Directory Layout

```text
src/features/auth/
├── AuthModal.js             # Overlay container for login/register modals
├── LoginForm.js             # Email & password authentication form
├── RegisterForm.js          # Customer registration form
├── ForgotPasswordForm.js    # Password recovery trigger form
├── authStyles.js            # Shared auth form styling
├── useAuthFlow.js           # Auth submission & validation hook
└── index.js                 # Public API exports
```

---

## 3. Public API Contract (`index.js`)

```javascript
export { default as AuthModal } from './AuthModal';
export { default as LoginForm } from './LoginForm';
```
