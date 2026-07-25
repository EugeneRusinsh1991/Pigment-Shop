# Data and Domain - Shared Services

## Purpose
Media validation, detection, rendering adapters, and messaging.

## Responsibility
Normalizes media files, renders gifs/videos, and manages alerts.

## When to use
Open when modifying media player views, validation, or shared services.

## Files

- [src/constants/index.js](file:///D:/Magazine/_PigmentShop/src/constants/index.js) — Module entry point.
- [src/data/catalogSyncHelpers.js](file:///D:/Magazine/_PigmentShop/src/data/catalogSyncHelpers.js) — Helper utilities for the surrounding feature.
- [src/features/shell/AppHeader/AppHeaderControls.js](file:///D:/Magazine/_PigmentShop/src/features/shell/AppHeader/AppHeaderControls.js) — App Header Controls implementation module.
- [src/features/shell/AppHeader/AppHeaderLogo.js](file:///D:/Magazine/_PigmentShop/src/features/shell/AppHeader/AppHeaderLogo.js) — App Header Logo implementation module.
- [src/features/shell/AppHeader/AppHeaderNavLinks.js](file:///D:/Magazine/_PigmentShop/src/features/shell/AppHeader/AppHeaderNavLinks.js) — App Header Nav Links implementation module.
- [src/features/shell/AppHeader/AppHeaderStyles.js](file:///D:/Magazine/_PigmentShop/src/features/shell/AppHeader/AppHeaderStyles.js) — Style definitions for the surrounding feature.
- [src/features/shell/AppHeader/CurrencyDropdown.js](file:///D:/Magazine/_PigmentShop/src/features/shell/AppHeader/CurrencyDropdown.js) — Dropdown interaction control.
- [src/features/shell/AppHeader/HeaderDropdown.js](file:///D:/Magazine/_PigmentShop/src/features/shell/AppHeader/HeaderDropdown.js) — Dropdown interaction control.
- [src/features/shell/AppHeader/LangDropdown.js](file:///D:/Magazine/_PigmentShop/src/features/shell/AppHeader/LangDropdown.js) — Dropdown interaction control.
- [src/features/shell/AppHeader/UserDropdown.js](file:///D:/Magazine/_PigmentShop/src/features/shell/AppHeader/UserDropdown.js) — Custom hook for user dropdown state and behavior.
- [src/features/shell/AppHeader.js](file:///D:/Magazine/_PigmentShop/src/features/shell/AppHeader.js) — App Header implementation module.
- [src/features/shell/NavMenu/CatalogMenuContent.js](file:///D:/Magazine/_PigmentShop/src/features/shell/NavMenu/CatalogMenuContent.js) — Catalog Menu Content implementation module.
- [src/features/shell/NavMenu/CategoryTreeNode.js](file:///D:/Magazine/_PigmentShop/src/features/shell/NavMenu/CategoryTreeNode.js) — Category Tree Node implementation module.
- [src/features/shell/NavMenu/CategoryTreeNodeButtons.js](file:///D:/Magazine/_PigmentShop/src/features/shell/NavMenu/CategoryTreeNodeButtons.js) — Category Tree Node Buttons implementation module.
- [src/features/shell/NavMenu/constants.js](file:///D:/Magazine/_PigmentShop/src/features/shell/NavMenu/constants.js) — Shared constants for the surrounding feature.
- [src/features/shell/NavMenu/LanguageSelector.js](file:///D:/Magazine/_PigmentShop/src/features/shell/NavMenu/LanguageSelector.js) — Language Selector implementation module.
- [src/features/shell/NavMenu/MainMenuContent.js](file:///D:/Magazine/_PigmentShop/src/features/shell/NavMenu/MainMenuContent.js) — Main Menu Content implementation module.
- [src/features/shell/NavMenu/NavItemList.js](file:///D:/Magazine/_PigmentShop/src/features/shell/NavMenu/NavItemList.js) — List rendering component.
- [src/features/shell/NavMenu/NavMenuHeader.js](file:///D:/Magazine/_PigmentShop/src/features/shell/NavMenu/NavMenuHeader.js) — Nav Menu Header implementation module.
- [src/features/shell/NavMenu/NavMenuStyles.js](file:///D:/Magazine/_PigmentShop/src/features/shell/NavMenu/NavMenuStyles.js) — Style definitions for the surrounding feature.
- [src/features/shell/NavMenu/useExpandedIds.js](file:///D:/Magazine/_PigmentShop/src/features/shell/NavMenu/useExpandedIds.js) — Custom hook for expanded ids state and behavior.
- [src/features/shell/NavMenu.js](file:///D:/Magazine/_PigmentShop/src/features/shell/NavMenu.js) — Nav Menu implementation module.
- [src/features/shell/StoreSearchHeader.js](file:///D:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js) — Store Search Header implementation module.
- [src/features/shell/useAppShell.js](file:///D:/Magazine/_PigmentShop/src/features/shell/useAppShell.js) — Custom hook for app shell state and behavior.
- [src/features/shell/useMenuVisibilityState.js](file:///D:/Magazine/_PigmentShop/src/features/shell/useMenuVisibilityState.js) — Custom hook for menu visibility state state and behavior.
- [src/features/shell/useNavMenuController.js](file:///D:/Magazine/_PigmentShop/src/features/shell/useNavMenuController.js) — Custom hook for nav menu controller state and behavior.
- [src/media/index.js](file:///D:/Magazine/_PigmentShop/src/media/index.js) — Media module entry point.
- [src/media/mediaAdapter.js](file:///D:/Magazine/_PigmentShop/src/media/mediaAdapter.js) — Adapter that normalizes media rendering inputs.
- [src/media/mediaService.js](file:///D:/Magazine/_PigmentShop/src/media/mediaService.js) — Service layer for media retrieval and rendering.
- [src/media/MediaTypeDetector.js](file:///D:/Magazine/_PigmentShop/src/media/MediaTypeDetector.js) — Detects media types for rendering decisions.
- [src/media/mediaValidation.js](file:///D:/Magazine/_PigmentShop/src/media/mediaValidation.js) — Validation helpers for media payloads.
- [src/media/README.md](file:///D:/Magazine/_PigmentShop/src/media/README.md) — README implementation module.
- [src/services/catalogViewModel.helpers.js](file:///D:/Magazine/_PigmentShop/src/services/catalogViewModel.helpers.js) — Helper utilities for the surrounding feature.
- [src/services/checkoutService.js](file:///D:/Magazine/_PigmentShop/src/services/checkoutService.js) — Service integration for the surrounding feature.
- [src/services/collections.js](file:///D:/Magazine/_PigmentShop/src/services/collections.js) — collections implementation module.
- [src/services/SERVICE_CONVENTIONS.md](file:///D:/Magazine/_PigmentShop/src/services/SERVICE_CONVENTIONS.md) — SERVICE CONVENTIONS implementation module.
- [src/services/serviceContract.js](file:///D:/Magazine/_PigmentShop/src/services/serviceContract.js) — service Contract implementation module.
- [src/services/telegramService.js](file:///D:/Magazine/_PigmentShop/src/services/telegramService.js) — Service integration for the surrounding feature.
- [src/types/index.ts](file:///D:/Magazine/_PigmentShop/src/types/index.ts) — Module entry point.
- [src/utils/appStateDump.js](file:///D:/Magazine/_PigmentShop/src/utils/appStateDump.js) — app State Dump implementation module.
- [src/utils/breadcrumbResolver.js](file:///D:/Magazine/_PigmentShop/src/utils/breadcrumbResolver.js) — breadcrumb Resolver implementation module.
- [src/utils/categoryTreeUtils.js](file:///D:/Magazine/_PigmentShop/src/utils/categoryTreeUtils.js) — category Tree Utils implementation module.
- [src/utils/crossPlatformStorage.js](file:///D:/Magazine/_PigmentShop/src/utils/crossPlatformStorage.js) — cross Platform Storage implementation module.
- [src/utils/dateFormatting.js](file:///D:/Magazine/_PigmentShop/src/utils/dateFormatting.js) — date Formatting implementation module.
- [src/utils/fileInput.js](file:///D:/Magazine/_PigmentShop/src/utils/fileInput.js) — Input control or field surface.
- [src/utils/layout.js](file:///D:/Magazine/_PigmentShop/src/utils/layout.js) — layout implementation module.
- [src/utils/localization.js](file:///D:/Magazine/_PigmentShop/src/utils/localization.js) — localization implementation module.
- [src/utils/orderStatus.js](file:///D:/Magazine/_PigmentShop/src/utils/orderStatus.js) — order Status implementation module.
- [src/utils/pricing.js](file:///D:/Magazine/_PigmentShop/src/utils/pricing.js) — pricing implementation module.
- [src/utils/sorting.js](file:///D:/Magazine/_PigmentShop/src/utils/sorting.js) — sorting implementation module.