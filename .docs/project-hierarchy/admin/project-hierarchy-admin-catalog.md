# Admin - Catalog management

## Purpose
Forms, rows, managers, and service hooks for catalog curation.

## Responsibility
Handles categories management, product editor dialogs, and catalog data services.

## When to use
Open when modifying category editor panels or product catalog grids.

## Files

- [src/components/Admin/Categories/AddSubcategorySection.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Categories/AddSubcategorySection.js) — Add Subcategory Section implementation module.
- [src/components/Admin/Categories/CategoriesManager.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Categories/CategoriesManager.js) — Manager view or workflow controller.
- [src/components/Admin/Categories/CategoriesStyles.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Categories/CategoriesStyles.js) — Style definitions for the surrounding feature.
- [src/components/Admin/Categories/CategoryFormContent.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Categories/CategoryFormContent.js) — Category Form Content implementation module.
- [src/components/Admin/Categories/CategoryFormFields.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Categories/CategoryFormFields.js) — Category Form Fields implementation module.
- [src/components/Admin/Categories/CategoryFormFooter.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Categories/CategoryFormFooter.js) — Category Form Footer implementation module.
- [src/components/Admin/Categories/categoryFormLogic.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Categories/categoryFormLogic.js) — Workflow or state logic for the surrounding feature.
- [src/components/Admin/Categories/CategoryFormModal.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Categories/CategoryFormModal.js) — Modal dialog or related interaction surface.
- [src/components/Admin/Categories/CategoryFormStyles.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Categories/CategoryFormStyles.js) — Style definitions for the surrounding feature.
- [src/components/Admin/Categories/CategoryProductSection.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Categories/CategoryProductSection.js) — Category Product Section implementation module.
- [src/components/Admin/Categories/CategoryRow.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Categories/CategoryRow.js) — Category Row implementation module.
- [src/components/Admin/Categories/CategoryRowElements.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Categories/CategoryRowElements.js) — Category Row Elements implementation module.
- [src/components/Admin/Categories/CategoryTree.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Categories/CategoryTree.js) — Category Tree implementation module.
- [src/components/Admin/Categories/useCategoriesWorkflow.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Categories/useCategoriesWorkflow.js) — Custom hook for categories workflow state and behavior.
- [src/components/Admin/Products/productFormConstants.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Products/productFormConstants.js) — Shared constants for the surrounding feature.
- [src/components/Admin/Products/productFormExtractors.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Products/productFormExtractors.js) — product Form Extractors implementation module.
- [src/components/Admin/Products/ProductFormFields.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Products/ProductFormFields.js) — Product Form Fields implementation module.
- [src/components/Admin/Products/productFormLogic.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Products/productFormLogic.js) — Workflow or state logic for the surrounding feature.
- [src/components/Admin/Products/ProductFormModal.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Products/ProductFormModal.js) — Modal dialog or related interaction surface.
- [src/components/Admin/Products/productFormParsers.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Products/productFormParsers.js) — product Form Parsers implementation module.
- [src/components/Admin/Products/ProductFormStyles.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Products/ProductFormStyles.js) — Style definitions for the surrounding feature.
- [src/components/Admin/Products/ProductRow.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Products/ProductRow.js) — Product Row implementation module.
- [src/components/Admin/Products/ProductRowComponents.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Products/ProductRowComponents.js) — Product Row Components implementation module.
- [src/components/Admin/Products/ProductRowVariants.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Products/ProductRowVariants.js) — Product Row Variants implementation module.
- [src/components/Admin/Products/ProductsFilterBar.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Products/ProductsFilterBar.js) — Toolbar or selection bar.
- [src/components/Admin/Products/ProductsManager.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Products/ProductsManager.js) — Manager view or workflow controller.
- [src/components/Admin/Products/productsSortFilter.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Products/productsSortFilter.js) — products Sort Filter implementation module.
- [src/components/Admin/Products/ProductsStyles.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Products/ProductsStyles.js) — Style definitions for the surrounding feature.
- [src/components/Admin/Products/ProductsTable.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Products/ProductsTable.js) — Products Table implementation module.
- [src/components/Admin/Products/useProductsWorkflow.js](file:///D:/Magazine/_PigmentShop/src/components/Admin/Products/useProductsWorkflow.js) — Custom hook for products workflow state and behavior.
- [src/services/adminCatalogService.js](file:///D:/Magazine/_PigmentShop/src/services/adminCatalogService.js) — Administrative catalog service for catalog management workflows.
- [src/services/adminCatalogState.js](file:///D:/Magazine/_PigmentShop/src/services/adminCatalogState.js) — admin Catalog State implementation module.