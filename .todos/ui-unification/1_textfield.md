# Unification Catalog: Text Field Elements

Based on [.docs/architecture-standards/01-reference-ui-module.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-standards/01-reference-ui-module.md).

## Complete Catalog of Text Field Elements Across Codebase

### 1. Global & Header Search
- **`SearchInput`** (`src/components/Search/SearchInput.js`): Main header search bar with leading search icon.

### 2. Catalog & Filter Inputs
- **Price Range Inputs (Min/Max)** (`src/features/catalog/SidebarUIComponents.js`): Catalog price range filter fields.

### 3. Product Page Inputs
- **Questions & Reviews Input/Textarea** (`src/features/product/ProductReviewSubcomponents.js`): User question and product review submission multiline fields.

### 4. Cart & Checkout Inputs
- **Promo Code & Order Note Inputs** (`src/features/cart/CartSummary.js`): Coupon code input and order instructions textarea.

### 5. Contact & Support Inputs
- **Contact Us Question Textarea** (`src/features/contact/ContactQuestionForm.js`): Public contact form message field.

### 6. User Profile & Address Inputs
- **Profile Fields (Name, Phone, Email)** (`src/features/profile/ProfileFormCard.js`): Personal information input fields.
- **Address & Security Form Fields** (`src/components/Profile/*`): Shipping address and password change inputs.

### 7. Authentication Forms
- **`LoginPage` Inputs** (`src/features/auth/LoginPage.js`): Login username, email, and password fields.
- **`LoginPageComponents` Inputs** (`src/features/auth/LoginPageComponents.js`): Secondary auth input components.

### 8. Admin Panel Form Inputs & Textareas
- **`FieldTextInput` / `FieldTextInputCore`** (`src/components/Admin/SharedFormComponents.js`): Base admin text input primitive.
- **`FieldTextArea` / `FieldTextAreaCore`** (`src/components/Admin/SharedFormComponents.js`): Base admin multiline textarea primitive.
- **`CategoryFormFields` Text Inputs** (`src/components/Admin/Categories/CategoryFormFields.js`): Category creation/edit fields.
- **`ProductFormFields` Inputs** (`src/components/Admin/Products/ProductFormFields.js`): Product title, price, SKU, stock, description inputs.
- **`ProductsManager` Filter Bar Input** (`src/components/Admin/Products/ProductsManager.js`): Admin product table search field.
- **`UsersManager` Filter Bar Input** (`src/components/Admin/Users/UsersManager.js`): Admin user search field.
