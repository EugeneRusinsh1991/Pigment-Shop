# Playwright Debug Hotkeys

This document lists the custom debug and automation hotkeys available when running the application within a Playwright browser environment.

## Available Hotkeys

### Alt + 1
* **Action**: Capture Screenshot & State
* **Description**: Takes a screenshot of the current page and dumps the React Context state into the `.browserLog` folder.
* **Triggered From**: [DevDebugOverlay.js](file:///d:/Magazine/_PigmentShop/debug/DevDebugOverlay.js)

### Alt + 3
* **Action**: Crawl Main Catalog & Breadcrumbs
* **Description**: Navigates from Home page to Catalog, travels down the first main category branch to the deepest subcategory, interacts with product cards (like + add to cart), opens the first product, and backtracks step-by-step through every breadcrumb crumb back to Home.
* **Triggered From**: [DevDebugOverlay.js](file:///d:/Magazine/_PigmentShop/debug/DevDebugOverlay.js)

### Alt + 5
* **Action**: Test All Products Page & Filters
* **Description**: Navigates to `/products`, adjusts price sliders, toggles stock, sale, and new checkboxes, selects 3 category filters, interacts with product card buttons, opens product detail, tests back button, resets filters, and returns to Home.
* **Triggered From**: [DevDebugOverlay.js](file:///d:/Magazine/_PigmentShop/debug/DevDebugOverlay.js)
