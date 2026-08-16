# Architecture Lifecycles

> [!NOTE]
> High-level lifecycles of major architectural processes and system interactions.

---

## 1. Application Bootstrap Lifecycle
1. **Initialization Orchestrator**: `appBootstrap.js` begins sequence.
2. **Visitor Hydration**: `visitorBootstrap.js` ensures an anonymous session exists if no authenticated session is found.
3. **Context Provider Mount**: `AppProviders` wraps the tree, establishing Auth, Theme, and Language contexts.
4. **Seed Data Load**: Initial catalog state is hydrated from repositories or offline storage.
5. **UI Rendering**: The router mounts the requested feature screen (e.g., `HomeFeature`).

## 2. Data Mutation Lifecycle (Storefront)
1. **User Action**: Triggered via a UI primitive (e.g., `Button`).
2. **Hook Intercept**: A custom domain hook (e.g., `useCartLogic`) processes the intent.
3. **Service Invocation**: Hook delegates to a service layer method wrapped in `withServiceContract`.
4. **State Sync**: Upon success, global Context or local state is updated.
5. **UI Update**: Subscribed components re-render automatically.

## 3. Admin Draft to Persistence Lifecycle
1. **Draft Editing**: Admin modifies catalog entries; `adminCatalogState` updates in-memory drafts without triggering global re-renders. `isDirty` flag is set.
2. **Commit Action**: Admin clicks "Save Changes" via `AdminSaveFooter`.
3. **Persistence Service**: `useAdminActions` passes drafts to `adminCatalogService` for batch uploading/merging.
4. **Global Hydration**: Upon success, drafts are committed to `catalogStore`, and `adminCatalogState` is marked clean.
