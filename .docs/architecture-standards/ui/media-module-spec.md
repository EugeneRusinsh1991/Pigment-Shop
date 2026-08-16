# Engineering Standard: Media UI Module Architecture

> [!NOTE]
> Defines the architectural specification, directory layout, API contract, and design token integration for **Media** primitives (`MediaRenderer`, `VideoRenderer`, `GifRenderer`, `CarouselDots`).

---

## 1. Semantic Purpose

`Media` primitives handle multi-format media rendering (images, video, animated GIFs) with lazy loading placeholders, aspect ratio scaling, and carousel indicators.
- **Scope**: Product card images, hero banners, thumbnail galleries, media carousels.

---

## 2. Module Architecture

```
src/components/ui/Media/
├── index.js                     # Public export
├── CarouselDots.js              # Carousel pagination dot indicators
├── GifRenderer.js               # Animated GIF rendering component
├── MediaRenderer.js             # Polymorphic media loader and placeholder fallback
├── VideoRenderer.js             # HTML5/Native video player component
├── MediaStyles.js               # Style factory
└── useMediaTheme.js             # Theme & fallback resolution hook
```

---

## 3. Design Token Integration

- **Radii**: `layout.radii.sm`, `layout.radii.md`.
- **Colors**: `colors.placeholderBackground`.
