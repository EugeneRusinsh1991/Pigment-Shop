# Stage 1 — Project Inventory

## Scope
- Full repository architecture audit for the PigmentShop Expo/React Native app.

## Entry Points
- Application shell: app/_layout.js
- Root providers: src/context/AppProviders.js
- Bootstrap orchestration: src/bootstrap/appBootstrap.js
- Startup contract: src/bootstrap/startupContract.js
- Feature routing shell: app/(store)/ and app/admin/

## Core Architectural Layers
- App shell and routing: app/
- UI primitives: src/components/
- State and provider composition: src/context/
- Bootstrap and lifecycle orchestration: src/bootstrap/
- Domain logic: src/domain/
- Feature modules: src/features/
- Data and service layer: src/services/, src/data/
- Shared utilities and theme: src/utils/, src/hooks/, src/theme/, src/types/

## Key Runtime Boundaries
- AppProviders composes infrastructure, session/catalog, and user feature providers in a clear dependency order.
- BootstrapGate controls startup gating before the app shell renders the routed content.
- Bootstrap orchestration uses a startup-state machine and lifecycle services rather than direct side effects in UI components.

## High-Level Architecture Notes
- The project is structured around Expo Router and React Context providers.
- The architecture standards under architecture-standards/ define UI, service, and feature layer conventions for agent-driven changes.
- The app mixes route-level screens, feature context providers, and service abstractions with a relatively modular structure.

## Inventory Sources Reviewed
- package.json
- app/_layout.js
- src/context/AppProviders.js
- src/bootstrap/appBootstrap.js
- src/bootstrap/bootstrapOrchestrator.js
- src/features/*
- src/services/*
- src/theme/*
- architecture-standards/README.md
