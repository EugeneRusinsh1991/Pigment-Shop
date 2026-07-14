# Banner implementation and media loading flow

## Overview

The storefront banner is implemented as a hero carousel in [src/components/HeroCarousel.js](src/components/HeroCarousel.js). It reads the banner list from the shared catalog context, tracks the currently active item, and renders the active banner with a fade transition between successive items.

The current implementation supports three media types for banner entries:

- Images
- GIFs
- Videos

The rendering logic is delegated to a shared media layer in [src/media](src/media), which chooses the correct renderer based on the media URL and file extension.

---

## Banner data source and state flow

### 1. Banner data origin

Banner content is stored in the catalog state layer in [src/data/catalogState.js](src/data/catalogState.js).

- The initial in-memory banner list is seeded from the array exported as `SEED_BANNERS`.
- The storefront reads banners through [src/context/CatalogContext.js](src/context/CatalogContext.js), which subscribes to the catalog store using `useSyncExternalStore`.
- When the app is connected to Firestore, banner updates can be pushed into the same in-memory store through [src/data/catalogSync.js](src/data/catalogSync.js), which listens to the Firestore document at `settings/banners`.

### 2. How banners reach the UI

The flow is:

1. [src/data/catalogState.js](src/data/catalogState.js) holds the canonical banner array.
2. [src/context/CatalogContext.js](src/context/CatalogContext.js) exposes the current banner list through `useCatalog()`.
3. [src/components/HeroCarousel.js](src/components/HeroCarousel.js) reads `banners` from the catalog context.
4. The carousel uses [src/hooks/useCarouselState.js](src/hooks/useCarouselState.js) to manage `currentIndex`, `prevIndex`, and the fade animation.

---

## Banner rendering architecture

### Hero carousel component

The main banner UI is implemented in [src/components/HeroCarousel.js](src/components/HeroCarousel.js).

Key behavior:

- It renders the current banner and the previous banner at the same time while the carousel transitions.
- The previous banner is rendered in the background as an absolutely positioned layer.
- The active banner is rendered as a second absolutely positioned layer with an animated opacity change.
- Navigation arrows and dots are also rendered over the carousel area.

This means the banner area is not a simple single-element swap. It uses a layered render approach where the previous and current media objects can coexist during the transition.

### Carousel state and transitions

The transition logic lives in [src/hooks/useCarouselState.js](src/hooks/useCarouselState.js).

It manages:

- `currentIndex` for the active banner
- `prevIndex` for the previously displayed banner
- a fade animation that animates the current banner into view
- automatic rotation when more than one banner exists

The fade effect changes the active banner opacity from `0` to `1` over a short period while the previous banner remains mounted underneath.

---

## How banner videos are loaded

### Media type detection

The media layer determines whether a banner entry should be treated as video, GIF, or image using [src/media/MediaTypeDetector.js](src/media/MediaTypeDetector.js).

Video detection is based on:

- file extension `.mp4` or `.webm`
- data URIs where the MIME type starts with `video/`

### Web video rendering

On the web, video banners are rendered by [src/media/VideoRenderer.js](src/media/VideoRenderer.js).

The implementation uses an HTML5 `<video>` element with:

- `src={uri}`
- `key={uri}`
- `autoPlay`
- `loop`
- `muted`
- `playsInline`

The component is selected by [src/media/MediaRenderer.js](src/media/MediaRenderer.js) when the detected type is `video`.

### Native behavior

On native platforms, the current implementation does not render a real video player for banners. Instead, [src/media/VideoRenderer.js](src/media/VideoRenderer.js) returns a placeholder view with a play-button-like graphic.

### Banner-specific use

Banner video content is displayed by passing the banner URI into `MediaRenderer` from [src/components/HeroCarousel.js](src/components/HeroCarousel.js).

---

## How GIFs are loaded

GIFs are handled separately from images and videos.

### GIF detection

The media type detector classifies a URL as `gif` when the file extension is `.gif` or when a data URI MIME type is `image/gif`.

### Web GIF rendering

On web, [src/media/GifRenderer.js](src/media/GifRenderer.js) renders an HTML `<img>` element with the GIF source.

This implementation is intentionally separate from the regular React Native image renderer because the project uses a different path for web compatibility.

### Native GIF rendering

On native, the GIF renderer falls back to a standard React Native `Image` component.

### Banner-specific use

GIF banners are also passed through [src/media/MediaRenderer.js](src/media/MediaRenderer.js) and then displayed by the hero carousel.

---

## How images are loaded

Images are the default fallback path in the media subsystem.

### Image selection path

If the URI is not detected as a video or GIF, the media renderer treats it as an image and returns a React Native `Image` component in [src/media/MediaRenderer.js](src/media/MediaRenderer.js).

### Image source handling

The project also includes [src/media/mediaAdapter.js](src/media/mediaAdapter.js), which normalizes stored media references into displayable URLs.

This adapter:

- preserves absolute URLs and data URLs
- preserves paths already prefixed with `/media`
- resolves relative media references into a `/media/<category>/<filename>` form

This is relevant when banner entries are stored as media references rather than full URLs.

---

## Overall banner rendering and loading flow

The end-to-end flow for a banner item is:

1. A banner entry is loaded from the catalog state or Firestore-backed banner array.
2. The hero carousel receives the banner list from the catalog context.
3. The carousel chooses the active and previous banner based on its carousel state hook.
4. The selected URI is passed to [src/media/MediaRenderer.js](src/media/MediaRenderer.js).
5. The media renderer detects the type of the asset.
6. The asset is rendered through one of the following:
   - [src/media/VideoRenderer.js](src/media/VideoRenderer.js) for videos
   - [src/media/GifRenderer.js](src/media/GifRenderer.js) for GIFs
   - a React Native `Image` component for standard images
7. The carousel displays the media as an absolutely positioned layer with fade transition behavior.

---

## Relevant implementation files

### Main banner UI

- [src/components/HeroCarousel.js](src/components/HeroCarousel.js) — main carousel and banner display component
- [src/components/CatalogHeader.js](src/components/CatalogHeader.js) — wrapper that hosts the hero carousel in the catalog header

### State and data flow

- [src/context/CatalogContext.js](src/context/CatalogContext.js) — exposes banners to the UI
- [src/data/catalogState.js](src/data/catalogState.js) — canonical banner state and seed values
- [src/data/catalogSync.js](src/data/catalogSync.js) — Firestore sync for banners
- [src/hooks/useCarouselState.js](src/hooks/useCarouselState.js) — index management and fade transitions

### Media rendering subsystem

- [src/media/MediaRenderer.js](src/media/MediaRenderer.js) — shared entry point for image, GIF, and video rendering
- [src/media/VideoRenderer.js](src/media/VideoRenderer.js) — web/native video renderer selection
- [src/media/GifRenderer.js](src/media/GifRenderer.js) — web/native GIF renderer selection
- [src/media/MediaTypeDetector.js](src/media/MediaTypeDetector.js) — media type detection logic
- [src/media/mediaAdapter.js](src/media/mediaAdapter.js) — media reference URL resolution
- [src/media/mediaService.js](src/media/mediaService.js) — media discovery helper
- [src/media/mediaManifest.js](src/media/mediaManifest.js) — static manifest of local media files
- [src/media/mediaTypes.js](src/media/mediaTypes.js) — media item shape and category definitions

### Admin-related media integration

- [src/components/Admin/Banners/BannersManager.js](src/components/Admin/Banners/BannersManager.js) — admin UI for managing banner entries and previews
- [src/components/Admin/Media/MediaBrowser.js](src/components/Admin/Media/MediaBrowser.js) — media browser for selecting local image, GIF, and video assets

---

## Locations related to the reported flickering issue

The reported behavior involves visible reloading or flashing when switching between banner media items. The implementation areas most likely related to that behavior are:

- [src/components/HeroCarousel.js](src/components/HeroCarousel.js)
  - This component renders both the previous and current banner layers at the same time while the transition is active.
  - It uses `MediaRenderer` for both layers, so any media-specific re-render or replacement can become visible during a switch.

- [src/hooks/useCarouselState.js](src/hooks/useCarouselState.js)
  - This hook manages the fade transition between banners.
  - The transition uses a timed opacity animation and updates the active/previous indices.

- [src/media/MediaRenderer.js](src/media/MediaRenderer.js)
  - This component selects the renderer based on media type.
  - Media swaps happen through this shared component boundary.

- [src/media/VideoRenderer.js](src/media/VideoRenderer.js)
  - The web implementation mounts an HTML5 video element with `key={uri}`.
  - This is a likely place to inspect for element replacement behavior when the URI changes.

- [src/media/GifRenderer.js](src/media/GifRenderer.js)
  - GIFs are rendered through a web-specific HTML element, which can also contribute to visible repaints or reloading behavior.

- [src/media/mediaAdapter.js](src/media/mediaAdapter.js)
  - If a banner entry is stored as a relative media reference, it is converted into a URL before rendering.
  - Any change in URL resolution could affect how the browser handles media replacement.

---

## Reported flickering issue (verbatim description)

The banner on the website flickers when displaying images and videos.

Observed behavior:

- When switching from one video to another, a visible flicker occurs.
- The first frame of the next video is briefly displayed, followed by another reload-like effect.
- It appears that the banner may first render an image (possibly a preview/placeholder) before loading the video, but this needs to be verified.

This document describes the implementation and the code paths that are relevant to that reported behavior. It does not attempt to diagnose or fix the issue.

---

#### Verified transition trace for the current implementation

The current banner transition path is:

1. Banner data originates in [src/data/catalogState.js](src/data/catalogState.js). The canonical array is stored in memory as `SEED_BANNERS` and can be replaced through `setBanners()`.
2. [src/context/CatalogContext.js](src/context/CatalogContext.js) subscribes to the catalog store with `useSyncExternalStore`, and `useCatalog()` exposes the current `banners` array to the UI.
3. [src/components/HeroCarousel.js](src/components/HeroCarousel.js) reads `banners` from the catalog context and derives:
   - `activeBanner = banners[currentIndex]`
   - `prevBanner = banners[prevIndex]`
4. The carousel renders two layers at once during a transition:
   - the previous banner is always rendered as a background layer
   - the current banner is rendered in a second layer wrapped in `Animated.View` and controlled by `fadeAnim`
5. The state for that swap is managed by [src/hooks/useCarouselState.js](src/hooks/useCarouselState.js):
   - `handleSwitch(newIndex)` sets `prevIndex` to the old `currentIndex`, then sets `currentIndex` to the new index
   - the hook also starts a `fadeAnim` transition from `0` to `1` over 400 ms and resets `prevIndex` on completion
6. For a video-to-video change, the flow continues through [src/media/MediaRenderer.js](src/media/MediaRenderer.js):
   - `MediaRenderer` calls `getMediaType(uri)`
   - for a video URI it selects `VideoRenderer`
7. On web, [src/media/VideoRenderer.js](src/media/VideoRenderer.js) mounts an HTML5 `<video>` element with `key={uri}` and `src={uri}`. Because the key changes when the banner URI changes, React will replace the underlying DOM video element during the swap.
8. The current implementation therefore has two visible transition mechanisms during a video swap:
   - the incoming video layer is mounted as a new layer while the previous layer remains mounted underneath
   - the web video node is re-mounted because the component is keyed by the new URI

That means the most likely places where a video-to-video banner change can introduce visible flicker are:
- the layered render in [src/components/HeroCarousel.js](src/components/HeroCarousel.js)
- the opacity animation in [src/hooks/useCarouselState.js](src/hooks/useCarouselState.js)
- the DOM re-mount of the `<video>` element in [src/media/VideoRenderer.js](src/media/VideoRenderer.js)

On initial mount, the carousel renders only the first banner with no active transition layer, so the first paint path is simpler than the later swap path. The first banner appears as the initial `prevBanner` layer, and the fade overlay is only introduced once a later index change occurs.

#### Reproduction notes

I reproduced the banner transition path in the running app and added temporary runtime logging to the carousel and web video renderer. The logs confirm that the swap sequence is:

1. [src/components/HeroCarousel.js](src/components/HeroCarousel.js) emits a `carousel-swap` entry whenever the active and previous indices change.
2. [src/media/VideoRenderer.js](src/media/VideoRenderer.js) emits `video-mount` and `video-unmount` events for the web `<video>` element whenever the banner URI changes.
3. The browser runtime showed repeated `video-unmount` followed by `video-mount` events during automatic carousel rotation and during the next swap cycle.
4. The DOM inspection also showed a single active `<video>` element at any given time, meaning the flicker is not caused by a duplicate video layer; instead, the visible flash is consistent with the element being replaced during the swap.

Observed runtime evidence from the browser session:
- `carousel-swap` events were emitted for index changes such as `currentIndex: 1, prevIndex: 0` and `currentIndex: 0, prevIndex: 1`.
- `video-unmount` and `video-mount` events were emitted back-to-back for the same banner transition, for example from `/media/videos/0712(1).mp4` to `/media/videos/kling_20260710_Image_to_Video__5122_0.mp4`.
- The active video DOM node was replaced rather than merely reusing the same element instance.

Conclusion from the reproduction:
- The flicker is not caused by a visible placeholder image or fallback view in the current implementation path.
- The evidence points to the web video element being remounted as part of the banner transition, which is the most likely source of the reload-like flash seen during video-to-video swaps.
- The next implementation step should therefore focus on preventing the web video node from being replaced during banner swaps while preserving the existing fade transition.
