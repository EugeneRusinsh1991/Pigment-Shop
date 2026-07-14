# Local Media Asset Model

## Folder Structure

All project media assets are stored under the `media/` directory at the project root:

```
media/
  images/   ← static images (JPG, PNG, WEBP, SVG)
  gifs/     ← animated GIFs
  videos/   ← video files (MP4, WEBM)
```

## Conventions

- Assets are stored by type, not by feature.
- File names should be descriptive, lowercase, using hyphens (e.g. `hero-banner.jpg`).
- Absolute local paths are never stored in application data. Only relative references or asset identifiers are persisted.
- The admin UI works with a media abstraction (`MediaItem`) rather than raw file paths.

## Scope

This local media library is a **development-only** convenience layer.  
It is not suitable for production deployment. Future migration to cloud storage should only require swapping the storage adapter, not changing the admin UI or data model.

## Asset Access

Assets are served as static files from `media/` by the development server.  
The admin UI discovers available assets through the `mediaService` module and presents them via the `MediaBrowser` component.

## Separation of Concerns

| Layer | Responsibility |
|---|---|
| `media/` folder | Physical file storage |
| `src/media/mediaTypes.js` | Asset shape definition (`MediaItem`) |
| `src/media/mediaService.js` | Asset discovery (lists available files) |
| `src/media/mediaAdapter.js` | Storage boundary (local vs future cloud) |
| `src/media/mediaValidation.js` | Allowed types and path rules |
| `src/components/Admin/Media/` | Admin UI (browse and select assets) |
