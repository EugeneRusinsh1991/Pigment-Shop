# Routing and Navigation

## Responsibility
Defines the route tree, shared layouts, route groups, dynamic segments, and the navigation architecture used at runtime.

## When to use
Open when changing route structure, navigation flow, route groups, layouts, dynamic URLs, or route-to-feature mappings.

## Routing overview
This area captures route groups, layouts, nested routes, dynamic routes, and index routes so navigation flow can be traced from entry points to feature implementations.

## Logical Modules

### Route Layouts and Groups
- **Purpose**: Shared Expo Router layouts and route groups for the storefront and admin section.
- **Link**: [project-hierarchy-routing-layouts.md](project-hierarchy-routing-layouts.md)

### Core Navigation Routes
- **Purpose**: Primary entry routes such as home, index, login, cart, and support entry points.
- **Link**: [project-hierarchy-routing-core.md](project-hierarchy-routing-core.md)

### Dynamic and Nested Routes
- **Purpose**: Parameterized routes for products, categories, and other nested navigation targets.
- **Link**: [project-hierarchy-routing-dynamic.md](project-hierarchy-routing-dynamic.md)

### Feature Route Screens
- **Purpose**: Route modules that render specific feature screens and connect navigation to shared implementation modules.
- **Link**: [project-hierarchy-routing-feature-screens.md](project-hierarchy-routing-feature-screens.md)
