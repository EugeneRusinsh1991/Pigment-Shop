# App Shell - Bootstrap and Startup Logic

## Purpose
Coordinates application startup gates and auth bootstrap workflows.

## Responsibility
Handles asynchronous boot tasks, startup gating, and boot status hooks.

## When to use
Open when modifying authentication startup gates or onboarding flows.

## Files

- [src/bootstrap/appBootstrap.js](file:///D:/Magazine/_PigmentShop/src/bootstrap/appBootstrap.js) — Initial bootstrap flow for app startup and initialization.
- [src/bootstrap/authBootstrapCoordinator.js](file:///D:/Magazine/_PigmentShop/src/bootstrap/authBootstrapCoordinator.js) — Coordinates authentication-related bootstrap work.
- [src/bootstrap/BootstrapGate.js](file:///D:/Magazine/_PigmentShop/src/bootstrap/BootstrapGate.js) — Gate component that controls early app startup state.
- [src/bootstrap/startupContract.js](file:///D:/Magazine/_PigmentShop/src/bootstrap/startupContract.js) — Shared contract for startup state and bootstrap expectations.
- [src/bootstrap/useBootstrapStatus.js](file:///D:/Magazine/_PigmentShop/src/bootstrap/useBootstrapStatus.js) — Hook for tracking bootstrap status.