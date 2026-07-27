# Feature Specification: Profile Module (`src/features/profile/`)

> [!NOTE]
> Specification for customer account management, personal details editing, address book, and application preferences.

---

## 1. Domain Responsibility

The **Profile Feature** manages customer account settings:
- **Account Overview (`ProfilePage.js`)**: Account summary, avatar, membership status.
- **Personal Details (`ProfileForm.js`)**: First name, last name, phone, email preferences.
- **Address Book (`AddressBook.js`)**: Saved shipping addresses management.
- **Security Settings (`ChangePasswordModal.js`)**: Password change and security options.

---

## 2. Directory Layout

```text
src/features/profile/
├── ProfilePage.js           # Account overview root screen
├── ProfileForm.js           # Personal details edit form
├── AddressBook.js           # Shipping address management
├── ChangePasswordModal.js   # Password update modal
├── profileStyles.js         # Account page styling
└── index.js                 # Public API exports
```

---

## 3. Public API Contract (`index.js`)

```javascript
export { default as ProfilePage } from './ProfilePage';
```
