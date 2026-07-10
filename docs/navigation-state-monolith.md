# Problem

The storefront navigation behavior is currently controlled by a single hook, [src/hooks/useNavigationState.js](src/hooks/useNavigationState.js), which is used as if it were a global router. That hook owns product selection, breadcrumbs, screen visibility, catalog resets, and menu dismissal, while shell-level components such as [src/components/AppShell.js](src/components/AppShell.js) and [src/components/MainContent.js](src/components/MainContent.js) depend on it to coordinate page transitions.

What is happening:
- Navigation state is centralized in one large hook instead of being split into route-specific or feature-specific modules.
- Screen visibility flags such as cart, login, profile, orders, favorites, and catalog are managed together with product selection and breadcrumb state.
- Shared shell components are responsible for coordinating page behavior, not just rendering the current screen.

What should happen instead:
- Navigation should be modeled as a dedicated routing or screen-state layer with clear responsibilities.
- Product detail navigation, catalog browsing, and modal/screen transitions should each be handled by focused logic.
- Shell components should render layout and delegate navigation intent to a smaller, more explicit navigation layer.

When the issue occurs:
- When a user opens a product, goes back, uses breadcrumbs, opens a screen from the header, or searches for a product.
- When the app switches between catalog browsing and modal-style screens such as cart, login, orders, or favorites.
- When new screens or navigation rules need to be introduced, because the current central hook becomes the only place where those behaviors are coordinated.

Important edge cases:
- Returning from a product detail view while other screens are open.
- Opening a screen from the header while the current catalog level or breadcrumb stack is active.
- Search results opening a product detail view while closing other overlays.
- Back navigation behavior when multiple overlay screens or breadcrumb levels are involved.

---

# Project Analysis

The current navigation architecture is centered on [src/hooks/useNavigationState.js](src/hooks/useNavigationState.js) and is exposed through [src/context/NavigationContext.js](src/context/NavigationContext.js).

Relevant files and modules:
- [src/hooks/useNavigationState.js](src/hooks/useNavigationState.js) contains the main navigation state machine. It manages:
  - selected product state;
  - a breadcrumb/navigation stack;
  - visibility flags for catalog, cart, login, profile, orders, favorites, and menu;
  - back-button and home behavior;
  - catalog-level resets and product selection flows.
- [src/context/NavigationContext.js](src/context/NavigationContext.js) promotes the hook into React context so that many components can consume the same navigation API.
- [src/components/AppShell.js](src/components/AppShell.js) uses navigation state to drive header interactions, menu visibility, breadcrumbs, and the active page shell.
- [src/components/MainContent.js](src/components/MainContent.js) decides which screen component to render based on the navigation state flags.
- [src/components/CatalogView.js](src/components/CatalogView.js), [src/components/CatalogPage.js](src/components/CatalogPage.js), [src/components/SearchBar.js](src/components/SearchBar.js), [src/components/ProductPage.js](src/components/ProductPage.js), [src/components/FavoritesPage.js](src/components/FavoritesPage.js), and [src/hooks/useLoginForm.js](src/hooks/useLoginForm.js) all depend on the navigation context for actions such as opening products, showing screens, or closing overlays.
- [src/context/UIMenuContext.js](src/context/UIMenuContext.js) manages the language and user header menus and is consumed indirectly by the navigation hook to dismiss menus during navigation.
- [src/context/CatalogContext.js](src/context/CatalogContext.js) provides the category tree used by the navigation stack and catalog browsing state.
- [src/context/AppProviders.js](src/context/AppProviders.js) wires the navigation provider into the application tree so that the hook is available globally.

Current data flow:
- The app shell collects navigation intent from header actions and passes it into the navigation context.
- The navigation hook updates its local state, including the current breadcrumb stack, selected product, and screen visibility.
- The main content component uses those flags to decide which page component to render.
- Catalog browsing and product selection update the same state object that also controls modal-like screens, making the logic hard to reason about.

Dependencies involved:
- Catalog data is indirectly involved because the breadcrumb root and category tree are derived from [src/context/CatalogContext.js](src/context/CatalogContext.js).
- Header UI menu visibility depends on [src/context/UIMenuContext.js](src/context/UIMenuContext.js), and the navigation logic closes those menus as part of transitions.
- The navigation layer is tightly coupled to the shell layout and rendering logic because it is used by both the header and the main content render switch.

---

# Root Cause Analysis

The main issue is that the current implementation mixes several architectural responsibilities inside one hook:

1. Route and screen state are combined
   - The hook manages both navigation history and the visibility of multiple app screens.
   - This makes navigation behavior harder to isolate and extend.

2. Shell behavior is embedded in the navigation layer
   - The same state object is used to control app layout, breadcrumbs, product detail display, and overlay screen selection.
   - This causes the navigation module to act like an application controller rather than a focused router or state slice.

3. The hook has hidden dependencies on other context layers
   - It receives menu dismissal setters from outside and uses catalog-derived category state to build the breadcrumb stack.
   - That makes the behavior dependent on multiple external modules and increases coupling.

4. The API is overly broad for its consumers
   - Many components call into the same navigation context for unrelated actions, such as opening a cart screen, selecting a product, or moving to the next catalog level.
   - This results in a large and fragile contract that is hard to evolve safely.

5. The render decision logic is coupled to state transitions
   - [src/components/MainContent.js](src/components/MainContent.js) uses navigation flags to decide the active screen, while [src/components/AppShell.js](src/components/AppShell.js) also manipulates the same state to coordinate shell behavior.
   - That creates a shared state machine that is difficult to test and maintain.

---

# Recommended Solution

The implementation should be staged so the navigation behavior becomes explicit and easier to evolve without changing the user experience abruptly.

Stage 1: Define a clear navigation model
- Introduce a dedicated route or screen-state model for the storefront.
- Separate concerns such as catalog browsing, product detail display, and overlay screens into distinct state areas.
- Define how the app shell should interact with that model.

Why this is needed:
- The current hook mixes several concepts that should be modeled independently.
- A clear state model will make future navigation changes safer and easier to reason about.

Expected outcome:
- Navigation behavior has a defined contract that is not hidden inside one large controller hook.

Stage 2: Extract screen-state from the current hook
- Move overlay and screen visibility state into a dedicated screen-state module or reducer-based layer.
- Keep the current UI behavior intact while ensuring that each screen is controlled through a focused interface.
- Preserve the existing visible flows for cart, login, profile, orders, favorites, and catalog.

Why this is needed:
- Screen visibility flags are currently mixed with product and breadcrumb state.
- Separate state management will reduce cross-feature coupling.

Expected outcome:
- Overlay screens and primary content modes are managed independently from catalog browsing state.

Stage 3: Extract catalog browsing and breadcrumb state
- Separate the catalog navigation stack from global screen state.
- Create a focused module for breadcrumb and category-level navigation so that catalog depth changes do not interfere with screen overlays.
- Keep the current category-tree and product-selection behavior intact.

Why this is needed:
- The current stack logic is tied to product and screen transitions in the same place.
- Breaking it into a smaller module will make catalog navigation easier to maintain.

Expected outcome:
- Catalog depth and breadcrumb updates are managed by a dedicated navigation slice rather than the entire screen controller.

Stage 4: Introduce a dedicated router or route-action layer
- Create a smaller navigation abstraction that exposes explicit actions for common flows such as opening a product, returning home, opening a screen, or moving back.
- Let shell-level components call these actions instead of directly manipulating the broader state object.

Why this is needed:
- The current context API is too broad and is used by multiple unrelated components.
- A focused action layer will simplify the integration points and reduce accidental state changes.

Expected outcome:
- Components interact with a smaller and more predictable navigation API.

Stage 5: Refactor shell and content components to consume the new layer
- Update [src/components/AppShell.js](src/components/AppShell.js) and [src/components/MainContent.js](src/components/MainContent.js) so they rely on the new navigation abstraction rather than the monolithic hook contract.
- Adjust consumers such as [src/components/CatalogPage.js](src/components/CatalogPage.js), [src/components/SearchBar.js](src/components/SearchBar.js), [src/components/ProductPage.js](src/components/ProductPage.js), and [src/hooks/useLoginForm.js](src/hooks/useLoginForm.js) to use the new actions.

Why this is needed:
- The shell and content components currently depend on a global state machine that mixes concerns.
- A smaller contract will make the UI layer easier to understand and less error-prone.

Expected outcome:
- The shell and content components are focused on rendering and user interaction while the navigation layer handles transitions.

Stage 6: Simplify the context boundary
- Keep [src/context/NavigationContext.js](src/context/NavigationContext.js) as the public access point, but reduce its responsibility to exposing the new navigation state and actions.
- Move menu-dismiss logic and cross-context coordination into a more explicit integration layer if needed.

Why this is needed:
- The current context is acting as a wrapper around a large stateful controller with hidden side effects.
- A smaller boundary will reduce coupling and make the context easier to maintain.

Expected outcome:
- Navigation context becomes a stable interface instead of a dumping ground for unrelated state and actions.

---

# Expected Result

After the refactor is complete, storefront navigation should be easier to understand, extend, and test.

Expected functional and user-visible improvements:
- Product browsing, breadcrumbs, and screen transitions should behave consistently across the app.
- The back button and home actions should follow a clearer and more predictable navigation model.
- Adding new screens or navigation rules should no longer require modifying a central controller that handles unrelated state.
- Shell components should focus on layout and rendering rather than coordinating page behavior.
- Navigation bugs caused by overlapping screen flags or breadcrumb state should become less likely.

---

# Implementation Prompts (English)

1. Audit the current navigation flow end to end and document the exact responsibilities currently handled by [src/hooks/useNavigationState.js](src/hooks/useNavigationState.js), [src/context/NavigationContext.js](src/context/NavigationContext.js), [src/components/AppShell.js](src/components/AppShell.js), and [src/components/MainContent.js](src/components/MainContent.js).

2. Identify every consumer of the navigation context and list the navigation actions that each component or hook currently relies on, including header actions, product selection, search selection, and back navigation.

3. Define a new navigation architecture that separates screen state, catalog browsing state, and route actions into distinct modules or slices while preserving the current storefront behavior.

4. Extract screen visibility state from [src/hooks/useNavigationState.js](src/hooks/useNavigationState.js) into a dedicated screen-state module or reducer and keep the current visible screens working as before.

5. Extract the breadcrumb and catalog stack behavior into a separate module so product selection and category-level navigation are no longer managed together with overlay screens.

6. Introduce a focused navigation action layer that exposes explicit operations such as openProduct, openScreen, goHome, goBack, and closeAllOverlays without coupling the UI to the full old state object.

7. Refactor [src/context/NavigationContext.js](src/context/NavigationContext.js) so it exposes the new navigation state and action layer through a smaller and clearer contract.

8. Update [src/components/AppShell.js](src/components/AppShell.js) and [src/components/MainContent.js](src/components/MainContent.js) to consume the new navigation layer while keeping the current layout and screen rendering behavior intact.

9. Update dependent components and hooks such as [src/components/CatalogPage.js](src/components/CatalogPage.js), [src/components/CatalogView.js](src/components/CatalogView.js), [src/components/SearchBar.js](src/components/SearchBar.js), [src/components/ProductPage.js](src/components/ProductPage.js), [src/components/FavoritesPage.js](src/components/FavoritesPage.js), and [src/hooks/useLoginForm.js](src/hooks/useLoginForm.js) to use the refactored navigation API.

10. Verify that the app still supports product selection, category browsing, breadcrumbs, search selection, header-driven screen opening, and back navigation without regressions.

11. Review the final navigation structure to ensure the code is split into focused modules and that shell components are no longer acting as global navigation controllers.
