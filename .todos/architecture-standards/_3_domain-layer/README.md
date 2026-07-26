# Domain & Business Logic Architecture Standard

## 🎯 Goal
Decouple pure business rules (discounts, order status flow, delivery calculations, catalog filters) from UI components and React lifecycle into `src/domain/`.

## 📌 Target Scope
- `src/domain/`
- Calculation logic in `src/services/`
- Business validation rules embedded inside UI hooks/components

## 🛠️ Tasks
1. **Spec Creation**: Create `.docs/architecture-standards/domain-module-spec.md` defining pure function standards, domain entities, and validator interfaces.
2. **Audit**: Identify inline business logic scattered in components/context.
3. **Refactoring Roadmap**: Formulate tasks to extract business rules into framework-agnostic domain modules.
