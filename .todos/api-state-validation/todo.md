# API & State Layer Data Validation (Zod/TypeScript)

## Objective
Introduce strict runtime validation schemas using Zod for API responses and DTOs to ensure the UI layer receives predictable, fully typed data models.

## Key Deliverables
1. **Zod Contracts**:
   - Create schema definitions in `src/domain/` for core entities (Catalog, Cart, User, Auth, Orders).
2. **Service Layer Integration**:
   - Intercept and validate API responses in `src/services/` before returning data to context/hooks.
3. **Type Safety & Fallbacks**:
   - Infer TypeScript types directly from Zod schemas and define safe fallbacks for optional fields.
