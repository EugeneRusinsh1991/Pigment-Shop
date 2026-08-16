# Service Specification: Storage Subsystem

> [!NOTE]
> Specification for cross-platform file storage, image resolution, and persistence APIs.

---

## 1. Domain Responsibility

Abstracts cloud/local storage interactions, providing unified file uploading, deletion, and media URL resolution mechanisms.

## 2. Storage Service (`storageService.js`)

High-level domain service for media storage:
- **Upload**: `uploadImage(file, options)` wraps repository operations with standard service contracts. Handles `File`, `Blob`, or `string` representations.
- **Deletion**: `deleteImage(publicIdOrUrl)`.
- **URL Resolution**: `resolveImageUrl(publicIdOrUrl, options)` synchronously maps internal storage paths/IDs to full display URLs, accommodating transformations (e.g., width, height).

## 3. Storage Repository (`storage/`)

Provides the underlying adapter for specific storage providers (e.g., Firebase Storage, Cloudinary, Local file system):
- Built on top of abstract base classes to allow swapping out cloud storage backends without modifying business logic.
