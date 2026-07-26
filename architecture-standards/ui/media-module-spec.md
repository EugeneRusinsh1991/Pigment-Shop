# Engineering Standard: Media UI Module Architecture

> [!NOTE]
> Defines the architectural specification, directory layout, API contract, and design token integration for **Media** primitives (`OptimizedImage`, `MediaGallery`).

---

## 1. Semantic Purpose

`Media` primitives handle image loading, lazy loading placeholders, aspect ratio scaling, and photo galleries.
- **Scope**: Product card images, hero banners, thumbnail galleries.

---

## 2. Module Architecture

```
src/components/Media/
├── index.js                     # Public export
├── OptimizedImage.js            # Image loader with placeholder fallback
├── MediaStyles.js               # Style factory
└── useMediaTheme.js             # Theme & fallback resolution hook
```

---

## 3. Design Token Integration

- **Radii**: `layout.radii.sm`, `layout.radii.md`.
- **Colors**: `colors.placeholderBackground`.
