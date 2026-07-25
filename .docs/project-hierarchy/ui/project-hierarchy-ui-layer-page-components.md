# UI Layer - Page Components

## Purpose
Storefront views, detail panels, filter sidebars, and carousels.

## Responsibility
Builds catalog layouts, product pages, search dropdowns, and cart views.

## When to use
Open when editing storefront layouts, filtering sliders, or product page reviews.

## Files

- [src/components/BaseCard.js](file:///D:/Magazine/_PigmentShop/src/components/BaseCard.js) — Card-style presentation component.
- [src/components/Button.js](file:///D:/Magazine/_PigmentShop/src/components/Button.js) — Interactive button component.
- [src/components/ButtonStyles.js](file:///D:/Magazine/_PigmentShop/src/components/ButtonStyles.js) — Style definitions for the surrounding feature.
- [src/components/CartItem.js](file:///D:/Magazine/_PigmentShop/src/components/CartItem.js) — Individual item component for a list or grid.
- [src/components/CartSummary.js](file:///D:/Magazine/_PigmentShop/src/components/CartSummary.js) — Cart Summary implementation module.
- [src/components/CartView/cartCheckoutLogic.js](file:///D:/Magazine/_PigmentShop/src/components/CartView/cartCheckoutLogic.js) — Workflow or state logic for the surrounding feature.
- [src/components/CartView/CartViewContent.js](file:///D:/Magazine/_PigmentShop/src/components/CartView/CartViewContent.js) — Cart View Content implementation module.
- [src/components/CartView/CartViewStyles.js](file:///D:/Magazine/_PigmentShop/src/components/CartView/CartViewStyles.js) — Style definitions for the surrounding feature.
- [src/components/CartView.js](file:///D:/Magazine/_PigmentShop/src/components/CartView.js) — Presentation view container.
- [src/components/Catalog/CatalogFilterSidebar.js](file:///D:/Magazine/_PigmentShop/src/components/Catalog/CatalogFilterSidebar.js) — Toolbar or selection bar.
- [src/components/Catalog/CatalogFilterSidebarStyles.js](file:///D:/Magazine/_PigmentShop/src/components/Catalog/CatalogFilterSidebarStyles.js) — Style definitions for the surrounding feature.
- [src/components/Catalog/CatalogPagination.js](file:///D:/Magazine/_PigmentShop/src/components/Catalog/CatalogPagination.js) — Catalog Pagination implementation module.
- [src/components/Catalog/CatalogSortBar.js](file:///D:/Magazine/_PigmentShop/src/components/Catalog/CatalogSortBar.js) — Toolbar or selection bar.
- [src/components/Catalog/CategoryFilterList.js](file:///D:/Magazine/_PigmentShop/src/components/Catalog/CategoryFilterList.js) — List rendering component.
- [src/components/Catalog/GridHeaderFooter.js](file:///D:/Magazine/_PigmentShop/src/components/Catalog/GridHeaderFooter.js) — Grid Header Footer implementation module.
- [src/components/Catalog/PriceRangeSlider.js](file:///D:/Magazine/_PigmentShop/src/components/Catalog/PriceRangeSlider.js) — Price Range Slider implementation module.
- [src/components/Catalog/ProductGrid.js](file:///D:/Magazine/_PigmentShop/src/components/Catalog/ProductGrid.js) — Grid layout component.
- [src/components/Catalog/SidebarContent.js](file:///D:/Magazine/_PigmentShop/src/components/Catalog/SidebarContent.js) — Sidebar Content implementation module.
- [src/components/Catalog/SidebarUIComponents.js](file:///D:/Magazine/_PigmentShop/src/components/Catalog/SidebarUIComponents.js) — Sidebar UIComponents implementation module.
- [src/components/Catalog/useCatalogFilters.js](file:///D:/Magazine/_PigmentShop/src/components/Catalog/useCatalogFilters.js) — Custom hook for catalog filters state and behavior.
- [src/components/Catalog/usePaginatedCatalog.js](file:///D:/Magazine/_PigmentShop/src/components/Catalog/usePaginatedCatalog.js) — Custom hook for paginated catalog state and behavior.
- [src/components/CatalogHeader.js](file:///D:/Magazine/_PigmentShop/src/components/CatalogHeader.js) — Catalog Header implementation module.
- [src/components/CatalogListFooter.js](file:///D:/Magazine/_PigmentShop/src/components/CatalogListFooter.js) — Catalog List Footer implementation module.
- [src/components/CatalogPage.js](file:///D:/Magazine/_PigmentShop/src/components/CatalogPage.js) — Feature page or screen.
- [src/components/CatalogView.js](file:///D:/Magazine/_PigmentShop/src/components/CatalogView.js) — Presentation view container.
- [src/components/CategoryCard/categoryCardStyles.js](file:///D:/Magazine/_PigmentShop/src/components/CategoryCard/categoryCardStyles.js) — Style definitions for the surrounding feature.
- [src/components/CategoryCard.js](file:///D:/Magazine/_PigmentShop/src/components/CategoryCard.js) — Card-style presentation component.
- [src/components/ChipButton.js](file:///D:/Magazine/_PigmentShop/src/components/ChipButton.js) — Interactive button component.
- [src/components/DataTable/DataTable.js](file:///D:/Magazine/_PigmentShop/src/components/DataTable/DataTable.js) — Data Table implementation module.
- [src/components/DataTable/EmptyState.js](file:///D:/Magazine/_PigmentShop/src/components/DataTable/EmptyState.js) — Empty State implementation module.
- [src/components/FieldError.js](file:///D:/Magazine/_PigmentShop/src/components/FieldError.js) — Field Error implementation module.
- [src/components/HeroCarousel/CarouselDots.js](file:///D:/Magazine/_PigmentShop/src/components/HeroCarousel/CarouselDots.js) — Carousel Dots implementation module.
- [src/components/HeroCarousel/CarouselLayers.js](file:///D:/Magazine/_PigmentShop/src/components/HeroCarousel/CarouselLayers.js) — Carousel Layers implementation module.
- [src/components/HeroCarousel/carouselStyles.js](file:///D:/Magazine/_PigmentShop/src/components/HeroCarousel/carouselStyles.js) — Style definitions for the surrounding feature.
- [src/components/HeroCarousel/useCarouselData.js](file:///D:/Magazine/_PigmentShop/src/components/HeroCarousel/useCarouselData.js) — Custom hook for carousel data state and behavior.
- [src/components/HeroCarousel.js](file:///D:/Magazine/_PigmentShop/src/components/HeroCarousel.js) — Hero Carousel implementation module.
- [src/components/IconButton.js](file:///D:/Magazine/_PigmentShop/src/components/IconButton.js) — Interactive button component.
- [src/components/icons/AdminIcons.js](file:///D:/Magazine/_PigmentShop/src/components/icons/AdminIcons.js) — Shared SVG icon set.
- [src/components/icons/AppIcons.js](file:///D:/Magazine/_PigmentShop/src/components/icons/AppIcons.js) — Shared SVG icon set.
- [src/components/icons/CategoryIcons.js](file:///D:/Magazine/_PigmentShop/src/components/icons/CategoryIcons.js) — Shared SVG icon set.
- [src/components/icons/ControlIcons.js](file:///D:/Magazine/_PigmentShop/src/components/icons/ControlIcons.js) — Shared SVG icon set.
- [src/components/InfoRow.js](file:///D:/Magazine/_PigmentShop/src/components/InfoRow.js) — Info Row implementation module.
- [src/components/InteractiveCard.js](file:///D:/Magazine/_PigmentShop/src/components/InteractiveCard.js) — Card-style presentation component.
- [src/components/Media/GifRenderer.js](file:///D:/Magazine/_PigmentShop/src/components/Media/GifRenderer.js) — Media rendering component.
- [src/components/Media/index.js](file:///D:/Magazine/_PigmentShop/src/components/Media/index.js) — Module entry point.
- [src/components/Media/MediaRenderer.js](file:///D:/Magazine/_PigmentShop/src/components/Media/MediaRenderer.js) — Media rendering component.
- [src/components/Media/VideoRenderer.js](file:///D:/Magazine/_PigmentShop/src/components/Media/VideoRenderer.js) — Media rendering component.
- [src/components/NavigationCard.js](file:///D:/Magazine/_PigmentShop/src/components/NavigationCard.js) — Card-style presentation component.
- [src/components/ProductBadges.js](file:///D:/Magazine/_PigmentShop/src/components/ProductBadges.js) — Product Badges implementation module.
- [src/components/ProductCard.js](file:///D:/Magazine/_PigmentShop/src/components/ProductCard.js) — Card-style presentation component.
- [src/components/ProductCardStyles.js](file:///D:/Magazine/_PigmentShop/src/components/ProductCardStyles.js) — Style definitions for the surrounding feature.
- [src/components/ProductPage/ProductImagePanel.js](file:///D:/Magazine/_PigmentShop/src/components/ProductPage/ProductImagePanel.js) — Panel-style UI section.
- [src/components/ProductPage/ProductInfoPanel.js](file:///D:/Magazine/_PigmentShop/src/components/ProductPage/ProductInfoPanel.js) — Panel-style UI section.
- [src/components/ProductPage/ProductInfoSubcomponents.js](file:///D:/Magazine/_PigmentShop/src/components/ProductPage/ProductInfoSubcomponents.js) — Product Info Subcomponents implementation module.
- [src/components/ProductPage/ProductPageStyles.js](file:///D:/Magazine/_PigmentShop/src/components/ProductPage/ProductPageStyles.js) — Style definitions for the surrounding feature.
- [src/components/ProductPage/ProductReviews.js](file:///D:/Magazine/_PigmentShop/src/components/ProductPage/ProductReviews.js) — Product Reviews implementation module.
- [src/components/ProductPage/ProductReviewsStyles.js](file:///D:/Magazine/_PigmentShop/src/components/ProductPage/ProductReviewsStyles.js) — Style definitions for the surrounding feature.
- [src/components/ProductPage/ProductReviewSubcomponents.js](file:///D:/Magazine/_PigmentShop/src/components/ProductPage/ProductReviewSubcomponents.js) — Product Review Subcomponents implementation module.
- [src/components/ProductPage/useReviewsState.js](file:///D:/Magazine/_PigmentShop/src/components/ProductPage/useReviewsState.js) — Custom hook for reviews state state and behavior.
- [src/components/ProductPage.js](file:///D:/Magazine/_PigmentShop/src/components/ProductPage.js) — Feature page or screen.
- [src/components/SearchBar/SearchBarStyles.js](file:///D:/Magazine/_PigmentShop/src/components/SearchBar/SearchBarStyles.js) — Style definitions for the surrounding feature.
- [src/components/SearchBar/SearchDropdown.js](file:///D:/Magazine/_PigmentShop/src/components/SearchBar/SearchDropdown.js) — Dropdown interaction control.
- [src/components/SearchBar/SearchInput.js](file:///D:/Magazine/_PigmentShop/src/components/SearchBar/SearchInput.js) — Input control or field surface.
- [src/components/SearchBar.js](file:///D:/Magazine/_PigmentShop/src/components/SearchBar.js) — Toolbar or selection bar.
- [src/components/SearchToolbar.js](file:///D:/Magazine/_PigmentShop/src/components/SearchToolbar.js) — Toolbar or selection bar.
- [src/components/SideDrawer.js](file:///D:/Magazine/_PigmentShop/src/components/SideDrawer.js) — Side Drawer implementation module.
- [src/components/StaticCard.js](file:///D:/Magazine/_PigmentShop/src/components/StaticCard.js) — Card-style presentation component.