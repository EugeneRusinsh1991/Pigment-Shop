# 🗺️ Roadmap: Service Layer Architecture — Пошаговая реализация

> **Spec**: `.docs/architecture-standards/services/services-module-spec.md`
> **Scope**: `src/services/` — все сервисы, репозитории, трансформы
> **Как использовать**: копируй промт из каждого шага и вставляй в чат. Каждый шаг независим — выполняй по очереди.

---

## ✅ СТАТУС ВЫПОЛНЕНИЯ

| Шаг | Задача | Статус |
|-----|--------|--------|
| 1 | Аудит `serviceContract.js` и `collections.js` | ⬜ |
| 2 | Аудит репозиториев | ⬜ |
| 3 | Аудит `adminCatalogService.js` | ⬜ |
| 4 | Аудит `adminOrdersService.js` | ⬜ |
| 5 | Аудит `adminUsersService.js` | ⬜ |
| 6 | Аудит `authService.js` | ⬜ |
| 7 | Аудит `checkoutService.js` | ⬜ |
| 8 | Аудит трансформов | ⬜ |
| 9 | Рефакторинг несоответствий | ⬜ |
| 10 | Финальная проверка | ⬜ |

---

## ШАГ 1 — Аудит базовой инфраструктуры (`serviceContract.js`, `collections.js`)

**Что проверяем:**
- `serviceContract.js` экспортирует `withServiceContract` HOF
- `withServiceContract` возвращает `{ success, data, error, code, originalError }`
- `collections.js` экспортирует объект `COLLECTIONS` с константами для всех коллекций

**📋 ПРОМТ:**

```
Прочитай файлы `src/services/serviceContract.js` и `src/services/collections.js`.

Проверь соответствие стандарту `.docs/architecture-standards/services/services-module-spec.md`:

1. `serviceContract.js`:
   - Экспортирует функцию `withServiceContract(fn, defaultErrorMessage)`
   - Возвращаемая функция-обёртка возвращает Promise с объектом `{ success: boolean, data?, error?, code?, originalError? }`
   - При успехе: `{ success: true, data: <результат fn> }`
   - При ошибке: `{ success: false, error: <сообщение>, code?, originalError: <оригинальная ошибка> }`

2. `collections.js`:
   - Экспортирует константу `COLLECTIONS` с именами всех Firestore-коллекций
   - Нет хардкоженных строк типа `products` вне этого файла

Выведи: список нарушений (если есть) и список соответствий. Если нарушений нет — напиши "✅ Базовая инфраструктура соответствует стандарту".
```

---

## ШАГ 2 — Аудит слоя репозиториев (`src/services/repositories/`)

**Что проверяем:**
- Все репозитории — функциональные модули (без классов)
- Все используют `COLLECTIONS` вместо хардкоженных строк
- Репозитории бросают исключения (не возвращают `{ success, data }`)
- Нет бизнес-логики — только Firestore-запросы

**📋 ПРОМТ:**

```
Прочитай все файлы в `src/services/repositories/`:
- authRepository.js
- catalogRepository.js
- catalogQueryBuilder.js
- favoritesRepository.js
- ordersRepository.js
- usersRepository.js

Для каждого файла проверь соответствие стандарту `.docs/architecture-standards/services/services-module-spec.md`, секции 4:

1. Нет классов — только экспортируемые функции или объекты с функциями
2. Нет хардкоженных строк коллекций (`products`, `orders` и т.д.) — должен использоваться `COLLECTIONS` из `../collections.js`
3. Нет `{ success, data }` в возвращаемых значениях — репозиторий бросает ошибки, не оборачивает их
4. Нет бизнес-логики — только Firestore SDK (`getDoc`, `getDocs`, `setDoc`, `addDoc`, `writeBatch`, `query`, `where`)

Выведи таблицу: файл | нарушение | строка | что исправить. Если файл чистый — пометь ✅.
```

---

## ШАГ 3 — Аудит `adminCatalogService.js`

**📋 ПРОМТ:**

```
Прочитай файлы:
- `src/services/adminCatalogService.js`
- `src/services/adminCategoriesTransforms.js`
- `src/services/adminProductsTransforms.js`

Проверь `adminCatalogService.js` по стандарту `.docs/architecture-standards/services/services-module-spec.md`:

1. Каждая экспортируемая функция ДОЛЖНА быть обёрнута через `withServiceContract`. Есть ли хоть одна экспортируемая async-функция без обёртки?
2. В файле НЕ ДОЛЖНО быть прямых импортов из `firebase/firestore`. Все запросы к БД — только через `repositories/`.
3. Трансформы (`toDTO`, `toEntity`) должны вызываться из `*Transforms.js`, а не быть написаны inline.

Для трансформов проверь:
- `toDTO(docSnap)` — принимает Firestore snapshot, возвращает чистый JS-объект
- `toEntity(dto)` — убирает UI-поля перед сохранением в БД

Выведи: список нарушений с указанием строк и конкретных правок.
```

---

## ШАГ 4 — Аудит `adminOrdersService.js`

**📋 ПРОМТ:**

```
Прочитай файл `src/services/adminOrdersService.js`.

Проверь соответствие стандарту `.docs/architecture-standards/services/services-module-spec.md`:

1. Все экспортируемые функции обёрнуты через `withServiceContract` — нет голых async-функций в экспорте
2. Нет прямых импортов из `firebase/firestore` — все запросы через `repositories/ordersRepository.js`
3. Нет хардкоженных строк коллекций
4. Если делает маппинг данных inline — это нарушение (нужен `adminOrdersTransforms.js`)

Выведи: список нарушений (файл, строка, описание, что исправить). Если нарушений нет — ✅.
```

---

## ШАГ 5 — Аудит `adminUsersService.js`

**📋 ПРОМТ:**

```
Прочитай файл `src/services/adminUsersService.js`.

Проверь соответствие стандарту `.docs/architecture-standards/services/services-module-spec.md`:

1. Все экспортируемые функции обёрнуты через `withServiceContract`
2. Нет прямых импортов из `firebase/firestore` — данные через `repositories/usersRepository.js`
3. Нет хардкоженных строк коллекций
4. Если делает маппинг данных inline — это нарушение (нужен `adminUsersTransforms.js`)

Выведи: список нарушений (файл, строка, описание, что исправить). Если нарушений нет — ✅.
```

---

## ШАГ 6 — Аудит `authService.js`

**📋 ПРОМТ:**

```
Прочитай файл `src/services/authService.js`.

Проверь соответствие стандарту `.docs/architecture-standards/services/services-module-spec.md`:

1. Все экспортируемые функции обёрнуты через `withServiceContract`
2. Firebase Auth SDK (`signInWithEmailAndPassword`, `signOut`, `onAuthStateChanged`) — допустимо напрямую.
   НО Firebase Firestore SDK (`getDoc`, `setDoc` и т.д.) должен проходить через `repositories/authRepository.js`
3. Нет хардкоженных строк коллекций если есть обращения к Firestore

Выведи: список нарушений (файл, строка, описание, что исправить). Если нарушений нет — ✅.
```

---

## ШАГ 7 — Аудит `checkoutService.js`

**📋 ПРОМТ:**

```
Прочитай файл `src/services/checkoutService.js`.

Проверь соответствие стандарту `.docs/architecture-standards/services/services-module-spec.md`:

1. Все экспортируемые функции обёрнуты через `withServiceContract`
2. Нет прямых импортов из `firebase/firestore` — запросы через `repositories/ordersRepository.js` или `repositories/catalogRepository.js`
3. Нет хардкоженных строк коллекций
4. Бизнес-логика checkout (формирование заказа, расчёт итогов) — в сервисе, а не в репозитории

Выведи: список нарушений (файл, строка, описание, что исправить). Если нарушений нет — ✅.
```

---

## ШАГ 8 — Аудит трансформ-файлов

**📋 ПРОМТ:**

```
Прочитай файлы:
- `src/services/adminCategoriesTransforms.js`
- `src/services/adminProductsTransforms.js`

Проверь соответствие стандарту `.docs/architecture-standards/services/services-module-spec.md`, секция 3:

1. Каждый файл экспортирует функции `toDTO` и `toEntity` (или эквивалентные по смыслу)
2. `toDTO` — принимает Firestore DocumentSnapshot, возвращает чистый JS-объект. Поле `id` — строка.
3. `toEntity` — принимает DTO, возвращает объект без UI-полей (без `selected`, временных blob-полей, вычисляемых флагов). Готов к `setDoc`/`addDoc`.
4. Функции должны быть чистыми (pure) — без side effects, без обращений к БД.

Дополнительно: определи какие сервисы делают маппинг данных inline и нуждаются в новом `*Transforms.js` файле.

Выведи: список нарушений + список сервисов которым нужны новые трансформ-файлы.
```

---

## ШАГ 9 — Рефакторинг выявленных нарушений

> ⚠️ Выполняй ПОСЛЕ шагов 1–8. Для каждого файла с нарушениями — отдельный промт.

**📋 ПРОМТ-ШАБЛОН (подставь имя файла и нарушения):**

```
Исправь нарушения в файле `src/services/<ИМЯ_ФАЙЛА>.js`.

Нарушения из аудита:
[вставь сюда список нарушений для этого файла из шагов 1-8]

Правила рефакторинга:
1. Исправляй ТОЛЬКО строки с нарушениями, не трогай остальной код
2. Добавление `withServiceContract` — паттерн:
   async function _myFunction(args) { /* оригинальный код */ }
   export const myFunction = withServiceContract(_myFunction, 'Описание ошибки');
3. Вынос трансформаций — создай `src/services/<имя>Transforms.js` с функциями `toDTO` и `toEntity`
4. Замена хардкоженных строк — используй `COLLECTIONS.<НАЗВАНИЕ>` из `src/services/collections.js`

После правок: краткий список изменений с указанием строк.
```

---

## ШАГ 10 — Финальная проверка всей архитектуры

**📋 ПРОМТ:**

```
Выполни финальный аудит слоя сервисов на соответствие стандарту `.docs/architecture-standards/services/services-module-spec.md`, секция 6 (Audit & Compliance Rules).

Проверь три правила:

1. No Untrapped Async Exports
   Найди в `src/services/` (НЕ в `repositories/`) все файлы с паттерном:
   - `export async function` — без предшествующего `withServiceContract`
   - `export const ... = async` — без предшествующего `withServiceContract`

2. No Direct Firestore SDK in UI
   Найди импорты `from 'firebase/firestore'` вне `src/services/` — в `src/components/`, `src/pages/`, `src/hooks/`, `src/store/`.

3. No Direct Firestore SDK in Services (where Repository exists)
   Найди сервисы (не репозитории) в `src/services/` которые импортируют из `firebase/firestore`.

Выведи финальный отчёт:
- ✅ Правила которые соблюдены
- ❌ Правила с нарушениями (файл, строка, описание)
- 📊 Итог: процент соответствия стандарту
```

---

## 📌 Заметки

- **Шаги 1–8** — только аудит (без изменений кода)
- **Шаг 9** — рефакторинг (один файл за раз)
- **Шаг 10** — финальная верификация
- Обновляй таблицу статусов вверху после каждого выполненного шага
