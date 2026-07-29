# Data Isolation & Mock Service Layer

## Objective
Establish a clean data abstraction layer with seamless toggling between live backend services and mock datasets.

## Key Deliverables
1. **Mock Service Strategy**:
   - Build mock data factories for Catalog, Cart, User Profiles, and Checkout flows.
2. **Provider Abstraction**:
   - Ensure all services in `src/services/` implement a unified repository interface.
3. **Environment Switch**:
   - Add environment variable config to toggle between Mock and API implementations without modifying component code.
