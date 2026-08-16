# AI Agent Guide: Service Layer Architecture (`src/services/`)

> [!NOTE]
> All database access, Firestore queries, business logic, and API calls in `src/services/` must comply with [`_reference-service-spec.md`](./_reference-service-spec.md).

---

## Service Layer Specifications Index

| Module / Element | File Link | AI Agent Purpose & Description |
| :--- | :--- | :--- |
| **Parent Reference Spec** | [`_reference-service-spec.md`](./_reference-service-spec.md) | Defines repository boundaries (`repositories/`), DTO transformations (`*Transforms.js`), and service contract wrappers (`withServiceContract`). |
| **Auth & RBAC Service** | [`auth-and-rbac-spec.md`](./auth-and-rbac-spec.md) | Identity policy rules (`authPolicy.js`), RBAC privilege checking, and `authService` contracts. |
| **Catalog Services** | [`catalog-services-spec.md`](./catalog-services-spec.md) | Pagination service (`catalogPageService.js`), view models (`catalogViewModel.js`), and entity normalizers. |
| **Storage Subsystem** | [`storage-subsystem-spec.md`](./storage-subsystem-spec.md) | Media upload, deletion, and cross-platform image URL resolution (`storageService.js`). |
| **App Bootstrap & Session** | [`bootstrap-and-session-spec.md`](./bootstrap-and-session-spec.md) | Application startup lifecycle and anonymous visitor session establishment (`visitorBootstrap.js`). |
