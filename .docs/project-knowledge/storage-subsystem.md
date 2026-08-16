# Image Storage Subsystem Architecture

> **Link to Canonical Developer Guide**:  
> For full API specifications, configuration rules, and provider extension guides, see [src/services/storage/README.md](file:///d:/Magazine/_PigmentShop/src/services/storage/README.md).

## Architectural Summary
The Pigment Shop image storage subsystem uses a pluggable **Storage Provider Architecture** located under `src/services/storage/`.

### Highlights
- **Decoupled Backend**: Communication occurs exclusively through `storageService.js` and `storageRepository.js`. UI components and domain services are completely agnostic of the underlying image host.
- **Active Backend**: Cloudinary (Unsigned upload preset `pigment_shop`, Cloud Name `iayng29j`).
- **Future Migration**: Swapping to Firebase Storage or S3 requires changing `EXPO_PUBLIC_STORAGE_PROVIDER` in `.env` with zero code refactoring.
- **Media Resolution**: `src/media/mediaAdapter.js` delegates URL resolution to `storageService.resolveImageUrl`, dynamically handling Cloudinary CDN transformations (`w_400,q_80`), local dev assets (`/media/...`), and legacy external URLs.
