# Data Isolation & Mock Service Layer

## Objective
Establish a clean data abstraction layer with seamless toggling between live backend services (Firebase/API) and deterministic mock datasets.

## Why Do This? (Зачем это делать?)
1. **Zero Backend Dependency**: Разработка и тестирование UI не зависят от сети, работоспособности сервера или ключей доступа.
2. **Deterministic UI Testing**: Автоматические аудиты и E2E тесты (Playwright) выполняются мгновенно и с гарантированным предсказуемым результатом.
3. **Edge Case Simulation**: Легкая симуляция ошибок сети, пустых каталогов, некорректных форматов и загрузочных состояний без загрязнения боевой БД.
4. **Faster Iteration**: Мгновенный отклик интерфейса при разработке UI-компонентов без задержек сетевых запросов.

---

## Target Files & Structural Plan
1. **Contract Definitions & Existing Repositories**:
   - Entity Contract: [catalogEntityContract.ts](file:///d:/Magazine/_PigmentShop/src/services/catalogEntityContract.ts)
   - Catalog Repo: [catalogRepository.js](file:///d:/Magazine/_PigmentShop/src/services/repositories/catalogRepository.js)
   - Orders Repo: [ordersRepository.js](file:///d:/Magazine/_PigmentShop/src/services/repositories/ordersRepository.js)
   - Auth Repo: [authRepository.js](file:///d:/Magazine/_PigmentShop/src/services/repositories/authRepository.js)
   - Service Conventions: [SERVICE_CONVENTIONS.md](file:///d:/Magazine/_PigmentShop/src/services/SERVICE_CONVENTIONS.md)
2. **New Mock Generators & Adapters**:
   - Mock Data Factories: [src/services/mocks/mockFactories.js](file:///d:/Magazine/_PigmentShop/src/services/mocks/mockFactories.js)
   - Mock Repository Implementations: [src/services/mocks/mockCatalogRepository.js](file:///d:/Magazine/_PigmentShop/src/services/mocks/mockCatalogRepository.js)
3. **Environment Switcher & Service Registry**:
   - Service Contract/Registry: [serviceContract.js](file:///d:/Magazine/_PigmentShop/src/services/serviceContract.js)

---

## Roadmap & Detailed Task Breakdown

### Phase 1: Service Interface & Contract Audit `🟢 G 3.6 F (L) — 1d | 2f | +3r`
- [ ] **Audit Repository Interfaces**: Проверить публичные методы в [catalogRepository.js](file:///d:/Magazine/_PigmentShop/src/services/repositories/catalogRepository.js), [ordersRepository.js](file:///d:/Magazine/_PigmentShop/src/services/repositories/ordersRepository.js), [authRepository.js](file:///d:/Magazine/_PigmentShop/src/services/repositories/authRepository.js). `🟢 G 3.6 F (L) — 1d | 3f | +2r`
  - *Зачем*: Чтобы мок-репозитории строго имплементировали те же методы и возвращали идентичные структуры данных.

### Phase 2: Deterministic Mock Data Factories `🟡 G 3.6 F (M) — 1d | 3f | +4r`
- [ ] **Create Mock Factories**: Создать [mockFactories.js](file:///d:/Magazine/_PigmentShop/src/services/mocks/mockFactories.js) с генераторами суррогатных сущностей (Products, Categories, Orders, User Profiles). `🟡 G 3.6 F (M) — 1d | 2f | +3r`
  - *Зачем*: Централизованное создание тестовых данных по контракту [catalogEntityContract.ts](file:///d:/Magazine/_PigmentShop/src/services/catalogEntityContract.ts).
- [ ] **Create Mock Repositories**: Реализовать мок-репозитории в [mockCatalogRepository.js](file:///d:/Magazine/_PigmentShop/src/services/mocks/mockCatalogRepository.js) с поддержкой задержек (latencies) и имитации ошибок. `🟡 G 3.6 F (M) — 1d | 2f | +3r`
  - *Зачем*: Позволяет UI корректно отрабатывать состояния Loading и Error без подключения к сетевому бэкенду.

### Phase 3: Dynamic Data Provider Switcher `🟡 G 3.6 F (M) — 1d | 2f | +3r`
- [ ] **Implement Environment Toggle**: Настроить [serviceContract.js](file:///d:/Magazine/_PigmentShop/src/services/serviceContract.js) для выбора между `firebase` и `mock` репозиториями на основе `process.env.EXPO_PUBLIC_USE_MOCKS`. `🟡 G 3.6 F (M) — 1d | 1f | +2r`
  - *Зачем*: Позволяет переключать весь бэкенд одной переменной окружения без изменения исходного кода UI.

### Phase 4: E2E & Browser Automation Harness Integration `🟢 G 3.6 F (L) — 1d | 2f | +3r`
- [ ] **Configure Automation Environment**: Подключить mock-режим для скриптов автоматизации в `.tools/browser-automation/`. `🟢 G 3.6 F (L) — 1d | 2f | +2r`
  - *Зачем*: Гарантирует стабильное и независимое прохождение автоматических UI тестов.

### Phase 5: Verification & Health Checks `🟢 G 3.6 F (L) — 1d | 0f | +3r`
- [ ] **Test Toggle Operation**: Проверить работу приложения при `EXPO_PUBLIC_USE_MOCKS=true` и `false`. `🟢 G 3.6 F (L) — 1d | 0f | +2r`
- [ ] **Run System Audits**: Выполнить `npm run health` и `npm run audit:ui` для проверки целостности. `🟢 G 3.6 F (L) — 1d | 0f | +1r`
