# Feature Specification: Shell Module (`src/features/shell/`)

> [!NOTE]
> Specification for global application frame components, headers, footers, mobile navigation drawers, and root notification banners.

---

## 1. Domain Responsibility

The **Shell Feature** provides the global UI wrapper surrounding pages:
- **Header (`Header.js`)**: Logo, search trigger, main menu links, cart icon badge, user profile button.
- **Footer (`Footer.js`)**: Store information, category links, social media icons, copyright notice.
- **Mobile Navigation (`MobileNavDrawer.js`)**: Slide-out drawer menu for mobile screens.
- **Global Banners (`TopNotificationBanner.js`)**: Store announcement banner at the very top.

---

## 2. Directory Layout

```text
src/features/shell/
├── Header.js                # Primary application header
├── Footer.js                # Primary application footer
├── MobileNavDrawer.js       # Mobile navigation side drawer
├── TopNotificationBanner.js # Global promo announcement bar
├── shellStyles.js           # Frame layout styling
└── index.js                 # Public API exports
```

---

## 3. Public API Contract (`index.js`)

```javascript
export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as MobileNavDrawer } from './MobileNavDrawer';
```
