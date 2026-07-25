# 🧠 Application Knowledge Graph (V3)

## 🏗 Application Overview
- **Base URL**: http://localhost:8081
- **Graph Version**: 3.0.0
- **Discovered Pages**: 12
- **Containers**: 17
- **Interactive Elements**: 179
- **Navigation Edges**: 25

## 🗺 Navigation Graph
- **/**
  - ➔ **Catalog** (via `/-element-btn|Каталог`)
  - ➔ **Catalog Cat-[id]** (via `/-element-link|/catalog/cat-root-0`)
  - ➔ **Catalog** (via `/-element-testid|breadcrumb-item-0`)
  - ➔ **Profile** (via `/-element-link|/profile|Профиль`)
  - ➔ **Login** (via `/-element-link|/login|Войти`)
  - ➔ **Catalog** (via `/-element-link|/catalog|Перейти в каталог`)
- **/catalog**
  - ➔ **Home** (via `/catalog-element-testid|breadcrumb-home`)
  - ➔ **Catalog Cat-[id]** (via `/catalog-element-link|/catalog/cat-root-0-sub-0`)
  - ➔ **Catalog Cat-[id]** (via `/catalog-element-link|/catalog/cat-root-1-sub-0`)
  - ➔ **Home** (via `/catalog-element-testid|product-fav-button`)
- **/catalog/cat-[id]**
  - ➔ **Products** (via `/catalog/cat-[id]-element-btn|Все товары`)
  - ➔ **Home** (via `/catalog/cat-[id]-element-testid|breadcrumb-home`)
  - ➔ **Products** (via `/catalog/cat-[id]-element-link|/products|Все товары`)
- **/products**
  - ➔ **Contact** (via `/products-element-btn|Контакты`)
  - ➔ **Product Prod-[id]** (via `/products-element-link|/product/prod-1-2-2-1`)
  - ➔ **Contact** (via `/products-element-link|/contact|Контакты`)
- **/contact**
  - ➔ **Catalog** (via `/contact-element-link|/catalog|Каталог`)
  - ➔ **Home** (via `/contact-element-icon|Icon Button`)
- **/product/prod-[id]**
  - ➔ **Products** (via `/product/prod-[id]-element-card|Card|/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[3]`)
- **/profile**
  - ➔ **Favorites** (via `/profile-element-link|/favorites|Избранное`)
- **/favorites**
  - ➔ **Orders** (via `/favorites-element-link|/orders|Мои заказы`)
- **/orders**
  - ➔ **Admin** (via `/orders-element-link|/admin|Админ-панель`)
- **/admin**
  - ➔ **Home** (via `/admin-element-btn|Выйти`)
- **/login**
  - ➔ **Cart** (via `/login-element-link|/cart`)
- **/cart**
  - ➔ **Home** (via `/cart-element-card|Card|/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/input[1]`)

## 📄 Pages & Structure
### Home (`/`)
- **Depth**: 0
- **Visits**: 15
- **Status**: Discovered

**Containers & Elements:**
- 🎨 **State**: Default (Base UI state without interactions)

### Catalog (`/catalog`)
- **Depth**: 2
- **Visits**: 5
- **Status**: Discovered

**Containers & Elements:**
- 🎨 **State**: Default (Base UI state without interactions)

### Catalog Cat-[id] (`/catalog/cat-[id]`)
- **Depth**: 3
- **Visits**: 8
- **Status**: Discovered

**Containers & Elements:**
- 🎨 **State**: Default (Base UI state without interactions)

### Products (`/products`)
- **Depth**: 2
- **Visits**: 30
- **Status**: Discovered

**Containers & Elements:**
- 🎨 **State**: Default (Base UI state without interactions)

### Contact (`/contact`)
- **Depth**: 2
- **Visits**: 2
- **Status**: Discovered

**Containers & Elements:**
- 🎨 **State**: Default (Base UI state without interactions)

### Product Prod-[id] (`/product/prod-[id]`)
- **Depth**: 3
- **Visits**: 6
- **Status**: Discovered

**Containers & Elements:**
- 🎨 **State**: Default (Base UI state without interactions)

### Profile (`/profile`)
- **Depth**: 2
- **Visits**: 1
- **Status**: Discovered

**Containers & Elements:**
- 🎨 **State**: Default (Base UI state without interactions)

### Favorites (`/favorites`)
- **Depth**: 2
- **Visits**: 1
- **Status**: Discovered

**Containers & Elements:**
- 🎨 **State**: Default (Base UI state without interactions)

### Orders (`/orders`)
- **Depth**: 2
- **Visits**: 1
- **Status**: Discovered

**Containers & Elements:**
- 🎨 **State**: Default (Base UI state without interactions)

### Admin (`/admin`)
- **Depth**: 2
- **Visits**: 5
- **Status**: Discovered

**Containers & Elements:**
- 🎨 **State**: Default (Base UI state without interactions)

### Login (`/login`)
- **Depth**: 3
- **Visits**: 1
- **Status**: Discovered

**Containers & Elements:**
- 🎨 **State**: Default (Base UI state without interactions)

### Cart (`/cart`)
- **Depth**: 1
- **Visits**: 1
- **Status**: Discovered

**Containers & Elements:**
- 🎨 **State**: Default (Base UI state without interactions)

## ⚡ Semantic Capabilities
- ✅ **Authentication** (Confidence: 0.9): User login, registration, and session management.
- ✅ **Checkout & Cart** (Confidence: 0.9): Shopping cart and checkout flows.
- ✅ **Catalog Browsing** (Confidence: 0.9): Product listing and category navigation.
- ✅ **Filtering** (Confidence: 0.9): Searching and refining data sets.
