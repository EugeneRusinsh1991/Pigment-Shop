# Классификация файлов: тесты, хелперы, bootstrap/гайты

> Удалены все файлы, помеченные как ненужные для выполнения проекта.

Файл | Тип | Связан с | Нужен для работы проекта
--- | --- | --- | ---
`src/bootstrap/appBootstrap.js` | bootstrap-координатор | `src/bootstrap/BootstrapGate.js`, `src/bootstrap/useBootstrapStatus.js`, `src/services/visitorBootstrap.js`, `src/data/catalogSync.js`, `src/context/AuthContext.js`, `src/context/AppProviders.js` | Да
`src/bootstrap/BootstrapGate.js` | gate-компонент bootstrap | `src/bootstrap/appBootstrap.js`, `src/context/AppProviders.js` | Да
`src/bootstrap/useBootstrapStatus.js` | hook статуса bootstrap | `src/App.js`, `src/bootstrap/appBootstrap.js` | Да
`src/services/visitorBootstrap.js` | bootstrap-степ visitor session | `src/bootstrap/appBootstrap.js` | Да
`src/components/OrderCard.helpers.js` | компонентный helper | `src/components/OrderCard.js` | Да
`src/services/catalogDatabaseRegenerator.helpers.js` | сервисный helper | `src/services/catalogDatabaseRegenerator.js`, `src/services/adminDomain.js`, `scripts/regenerateDatabase.js` | Да (для фичи восстановления/регенирации БД)
`src/bootstrap/startupValidator.js` | dev-валидация стартапа | `src/bootstrap/startupValidator.helpers.js` | Удалено
`src/bootstrap/startupValidator.helpers.js` | helper для `startupValidator.js` | `src/bootstrap/startupValidator.js` | Удалено
`src/hooks/__tests__/navigation.regression.test.js` | тест | навигационная логика | Удалено
`src/services/__tests__/adminDomain.regression.test.js` | тест | `src/services/adminDomain.js` | Удалено
`src/services/__tests__/categoryOwnership.test.mjs` | тест | `src/services/catalogAssemblyService.js` | Удалено
`src/services/__tests__/catalogDatabaseRegenerator.test.mjs` | тест | `src/services/catalogDatabaseRegenerator.js` | Удалено
`src/scripts/manifestHelpers.js` | утилитный helper | `scripts/generateMediaManifest.js` | Да (для `npm run generate-media`)
`src/scripts/verifyBootstrap.js` | smoke test / скрипт проверки bootstrap | `src/bootstrap/appBootstrap.js` | Удалено
`src/scripts/testMerge.mjs` | вспомогательный/demo скрипт | `src/services/adminCategoryMerger.js`, `src/services/catalogBuilder.js` | Удалено
`media/images/TEST/TEST .jpg` | тестовый медиа-файл | `src/media/mediaManifest.js`, `media/media-manifest.json` | Удалено
`dist/media/images/TEST/TEST .jpg` | тестовый медиа-файл в `dist` | `src/media/mediaManifest.js`, `media/media-manifest.json` | Удалено
