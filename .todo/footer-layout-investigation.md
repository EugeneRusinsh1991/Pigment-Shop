# Target Reference Architecture: Unified Shell Layout System

## 1. System Vision & Foundational Statement

If this application were designed from scratch today, it would adopt a **Declarative Shell-Managed Page Layout Architecture**.

In this architecture, **the Shell Layer owns 100% of page frame composition, viewport sizing, scroll container management, and global layout chrome (Header, Navigation, Footer)**. Feature modules exist strictly as pure domain content providers.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          SHELL ROUTE CONTAINER                         │
│  (Owns Viewport, Safe Area, Nav Header, Footer Slot, Scroll Context)   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                      SHELL LAYOUT ENGINE                       │   │
│   │                                                                │   │
│   │    ┌──────────────────┐               ┌──────────────────┐    │   │
│   │    │ PageScrollLayout │               │  PageListLayout  │    │   │
│   │    └────────┬─────────┘               └────────┬─────────┘    │   │
│   │             │                                  │              │   │
│   │             ▼                                  ▼              │   │
│   │  [Static Scroll Context]             [Virtualized List Context]│   │
│   │  - Home, Cart, Contact               - Catalog, Product Grid  │   │
│   │  - Profile, Auth, Orders                                      │   │
│   └───────────────────────────────┬────────────────────────────────┘   │
│                                   │                                    │
│                                   ▼                                    │
│                    ┌────────────────────────────┐                      │
│                    │    SHELL FOOTER COMPONENT  │                      │
│                    │ (Single Point of Render)   │                      │
│                    └────────────────────────────┘                      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Fundamental Architectural Invariants

These invariants represent non-negotiable system rules. Violating any invariant degrades the architecture and reintroduces layout fragmentation:

1. **INVARIANT 1: Single Source of Layout Chrome**
   `<Footer />` and global navigation headers MUST ONLY be instantiated inside the Shell Layer (`src/features/shell`). No feature module or route component may import, instantiate, or render `<Footer />`.

2. **INVARIANT 2: Exclusive Scroll Ownership**
   The Shell Layer holds exclusive ownership of root scroll containers (`ScrollView`, `FlatList`). Feature modules MUST NEVER instantiate top-level page scroll containers.

3. **INVARIANT 3: Structural Flex-Push Positioning**
   Footer positioning MUST BE driven entirely by flexbox content distribution (`flexGrow: 1` pushing), NEVER by static pixel offset views (`bottomSpacer`) or manual margin accumulation.

4. **INVARIANT 4: Zero Layout Logic in Domain Features**
   Feature components (`src/features/*`) MUST BE pure content children that accept layout boundary constraints passed down from Shell primitives.

---

## 3. Strict Architectural Boundaries & Single Ownership Matrix

| System Domain | Responsible Layer | Permitted Primitives | Prohibited Operations in Feature Layer |
| :--- | :--- | :--- | :--- |
| **Viewport & Frame** | Shell (`src/features/shell`) | `<View style={flex1}>`, `SafeAreaView` | Manual screen height calculations (`useWindowDimensions` height offsets) |
| **Scrolling & Virtualization**| Shell (`src/features/shell`) | `PageScrollLayout`, `PageListLayout` | Root `<ScrollView>`, `<FlatList>`, `<VirtualizedList>` in pages |
| **Footer & Chrome** | Shell (`src/features/shell`) | `<Footer />` | Direct `<Footer />` imports or rendering in feature components |
| **Domain Content & Logic** | Features (`src/features/*`) | Domain components, cards, forms, domain state hooks | Managing page scroll context, container margins, or footer placement |

---

## 4. Canonical Shell Layout Engine

The Shell Layout Engine exposes exactly two complementary primitives to support all UI interaction models:

### A. `PageScrollLayout` (Static & Standard Scroll Contexts)
- **Purpose**: Manages standard document flow for static or dynamic height content (Home, Cart, Contact, Profile, Login, Order Confirmation).
- **Behavior**: Enforces a single outer `<ScrollView contentContainerStyle={{ flexGrow: 1 }}>`. Main content resides inside `<View style={{ flex: 1 }}>`, automatically pushing `<Footer />` to the bottom of the viewport on short pages without requiring empty spacer elements.

### B. `PageListLayout` (Virtualized & Infinite Grid Contexts)
- **Purpose**: Manages virtualized dataset screens (Catalog, Product List) requiring high-performance item rendering via `FlatList`.
- **Behavior**: Directly wraps or configures the virtualized dataset stream and automatically injects `<Footer />` into `FlatList`'s `ListFooterComponent`, preserving virtualized scrolling while ensuring seamless footer rendering at the end of the dataset.

---

## 5. Architectural Stress Testing & Future-Proof Validation

| Future Capability Scenario | How the Target Architecture Handles It | Architectural Stability |
| :--- | :--- | :--- |
| **Dynamic Sticky Bar / Drawer** | Shell Layout Engine exposes a `bottomDrawer` / `floatingActionSlot` inside the Shell frame above the Footer. | ✅ 100% Stable (zero feature changes) |
| **Infinite Scroll Pagination** | Managed natively via `PageListLayout`, loading indicators render inside `ListFooterComponent` before `<Footer />`. | ✅ 100% Stable |
| **Split-Pane / Multi-Column View** | Feature components pass multi-column children into `PageScrollLayout`; Shell maintains root container & Footer. | ✅ 100% Stable |
| **Full-Screen Modal / Flow** | Route uses Shell's `ModalLayout` (which explicitly sets `showFooter={false}`). | ✅ 100% Stable |

---

## 6. Architectural Simplicity & Summary

By enforcing clear separation of concerns:
- **Feature Developers** focus 100% on business domain UI (products, checkout, user data) without making layout or scrolling decisions.
- **The Shell Layer** guarantees 100% consistent layout, responsive container width, safe area handling, and `<Footer />` placement across every page in the application.

This specification serves as the permanent Target Reference Architecture for the project.
