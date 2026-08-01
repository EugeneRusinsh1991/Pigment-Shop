# Data & Domain Layer

## Responsibility
Domain business logic (`src/domain/`), external API/Firebase services (`src/services/`), and data repositories (`src/data/`).

## When to use
Open when modifying domain entities, API requests, Firebase integrations, catalog storage, or data mapping logic.

## Key Sub-modules

- **Domain Logic (`src/domain/`)**: Product models, catalog entity contracts, validation rules.
- **Services Layer (`src/services/`)**: API clients, authentication service, catalog service, checkout service, Firebase repository handlers.
- **Data Repositories (`src/data/`)**: Local persistence and static data sources.
