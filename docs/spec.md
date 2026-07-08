# Belle Beaute E-Commerce Web Application Specification

This document provides a detailed specification and step-by-step implementation roadmap for the Belle Beaute e-commerce application based on the design mockups.

---

## 1. Overview
Belle Beaute is a premium beauty cosmetics store selling materials and pigments for cosmetic professionals. The website must be a clean, modern, minimal, and responsive e-commerce web application featuring high usability, theme customization, multi-language support, and a structured catalog checkout flow.

---

## 2. Core Feature Roadmap & Priority

To ensure efficient development, features are divided into phases based on their priority. Core UI structure, catalog, theme toggling, and multi-language support are prioritized first, while authentication and advanced checkout systems are planned for later phases.

### Phase 1: Core Shell & Navigation (High Priority)
*   **Header Bar**:
    *   Left: Logo ("Belle Beaute").
    *   Center: Quick links ("Main", "Catalog").
    *   Right: Utilities including Theme Toggle, Language Selector, Cart Icon, and User Profile.
*   **Language Selector**: Dropdown supporting Russian (Русский), Ukrainian (Українська), and English.
*   **Theme Switcher**: Smooth transition between a clean light mode and a dark slate mode.

### Phase 2: Catalog & Navigation Hierarchy (High Priority)
*   **Hero Banner**: Large aesthetic banner promoting materials and pigments.
*   **Category Grid**: Displaying root level categories (e.g., "Materials", "Pigments") with thumbnail cards.
*   **Nested Hierarchy**: Ability to navigate from categories into subcategories (up to 7 steps deep if necessary) to locate specific products.
*   **Product Grid**: Cards displaying product images, labels (e.g., brand name like CHEYENNE, PERMA BLEND), prices, and "Add to Cart" buttons.

### Phase 3: Cart Management (Medium Priority)
*   **Interactive Cart Page**:
    *   Listing selected items with details (image, name, price, quantity).
    *   Increment/decrement counter for quantity.
    *   Remove item button.
    *   Checkout summary pane showing item count, total price, and "Checkout" button.
*   **State Persistence**: Cart state saved in local storage or global context.

### Phase 4: User Authentication & Checkout Integration (Low Priority / Deferred)
*   **User Menu**: Dropdown showing a "Login" button.
*   **Authentication Flow**: Login modal or page.
*   **Checkout Completion**: Form to fill in shipping/payment details.

---

## 3. UI Component Specifications

### 3.1 Theme Presets
*   **Light Theme**: Soft off-white backgrounds (`#FAF9F6`), charcoal text (`#1E1E1E`), clean borders.
*   **Dark Theme**: Deep midnight/slate backgrounds (`#0F172A`), sky blue or warm accent text, slate cards (`#1E293B`).

### 3.2 Key Components
1.  **Header**: Fixed header with backdrop-filter (blur).
2.  **ProductCard**: Image placeholder, brand name badge, title text, price indicator, and inline "Add to Cart" button.
3.  **DropdownMenu**: For language selection and login menu.
4.  **CartItemRow**: Horizontal layout showing product details and a counter controls.

---

## 4. Implementation Steps

3.  **Catalog Page & Product Flow**:
    *   Design clean grid templates.
    *   Construct subcategory navigation mechanics.
4.  **Cart Integration**:
    *   Implement standard cart operations (Add, Remove, Update quantities).
    *   Formulate checkout summary calculation logic.
5.  **Deferred Integrations (Auth & API bindings)**:
    *   Integrate login functionality.
    *   Connect checkout actions to payment APIs.
