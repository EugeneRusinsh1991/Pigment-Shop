# Проблема: Отсутствие скролла и перекрытие контента футером

## Описание проблемы
На страницах (в частности, на главной странице `Home`) полностью отсутствует возможность скроллинга. Кроме того, футер отображается поверх контента (карточек товаров) в нижней части экрана, визуально перекрывая его. 

## Что было предпринято
В попытках решить данную проблему были выполнены следующие шаги:
1. **Обновление корневого контейнера (`appStyles.js`)**: Была изменена высота корневого контейнера с `minHeight: 100vh` на `height: 100vh` с добавлением `overflow: hidden`, чтобы попытаться ограничить внешний контейнер размером экрана и заставить скроллиться внутренний контент.
2. **Замена `ScrollView` на `View` (`SharedLayoutWrapper.js`)**: Компонент `ScrollView` из React Native был заменен на обычный `View` со стилями `overflowY: 'auto'` (для Web-версии), чтобы избежать конфликтов вложенных скроллов (так как внутри используется `FlatList` с отключенным скроллом).
3. **Изменение `flex` на `flexGrow` (`CatalogView.js` и `PageScrollLayout.js`)**: Свойства `flex: 1` были заменены на `flexGrow: 1` для контейнеров `catalogContainer` и `listContainer`, чтобы позволить им увеличивать свою высоту в зависимости от контента, а не ограничиваться высотой родителя.
4. **Удаление `flexShrink` (`appStyles.js`)**: Из `mainContentBody` было удалено свойство `flexShrink: 1`, чтобы контент не сжимался под размер экрана, а переполнял его, активируя тем самым скролл.

## Результат (ЧТО НЕ ПОМОГЛО)
**Все вышеперечисленные шаги НЕ РЕШИЛИ ПРОБЛЕМУ.**

## Архитектурные элементы футера
Да, существует отдельный системный компонент футера:
1. **Главный футер (App Shell Footer)**: [Footer.js](file:///d:/Magazine/_PigmentShop/src/features/shell/components/Footer.js)
   - Стили: [FooterStyles.js](file:///d:/Magazine/_PigmentShop/src/features/shell/components/FooterStyles.js)
   - Хук темы: [useFooterTheme.js](file:///d:/Magazine/_PigmentShop/src/features/shell/components/useFooterTheme.js)
   - Интеграция в макет: Встроен в [SharedLayoutWrapper.js](file:///d:/Magazine/_PigmentShop/src/features/shell/SharedLayoutWrapper/SharedLayoutWrapper.js)
2. **Специфичные футеры контента**:
   - [CatalogListFooter.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CatalogListFooter.js)
   - [NewArrivalsFooter.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/components/NewArrivalsFooter.js)

### Почему в проекте оказалось «два футера»:
- **[Footer.js](file:///d:/Magazine/_PigmentShop/src/features/shell/components/Footer.js)** — настоящий системный футер приложения (App Shell Footer) с логотипом и копирайтом.
- **[CatalogListFooter.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CatalogListFooter.js)** — вводит в заблуждение названием: это **не подвал сайта**, а проп `ListFooterComponent` для `FlatList`, выводящий внутри страницы промо-секции («Новинки» и «Скидки»).

### Причина сходства в названиях:
Название `CatalogListFooter` возникло из-за терминологии React Native API: компонент создавался специально для передачи в проп `ListFooterComponent` списка `FlatList`. Произошла терминологическая путаница между нижним вспомогательным блоком списка (`ListFooter`) и глобальным подвалом всего сайта (`Footer`).

## Причины возникшей проблемы (Анализ реализации)
1. **Хаки позиционирования в `FooterStyles.js`**:
   - В [FooterStyles.js](file:///d:/Magazine/_PigmentShop/src/features/shell/components/FooterStyles.js) для Web применены `width: '100vw'`, `position: 'relative'`, `left: '50%'` и `marginLeft: '-50vw'`. Это ломает стандартный расчет размеров и выравнивание во Flexbox.
2. **Абсолютное позиционирование экранов Expo Router (`Stack`)**:
   - Компонент `<Stack />` оборачивает экраны в блоки с `position: absolute`, что полностью выбивает их из нормального потока документов Flexbox.
   - Контейнер `content` внутри [SharedLayoutWrapper.js](file:///d:/Magazine/_PigmentShop/src/features/shell/SharedLayoutWrapper/SharedLayoutWrapper.js) имеет нулевую вычисленную высоту.
3. **Наложение футера поверх карточек**:
   - Из-за нулевой вычисленной высоты контентной области футер подтягивается к верху контейнера, накладываясь на абсолютно позиционированный контент экранов, а `overflowY: 'auto'` не видит физического переполнения для вызова скролла.

## Предлагаемый план решения проблемы скролла
1. **Восстановление естественного скролла окна (Document Body Scroll)**:
   - В [appStyles.js](file:///d:/Magazine/_PigmentShop/src/theme/appStyles.js) изменить `height: '100vh'` на `minHeight: '100vh'` и убрать `overflow: 'hidden'` у корневого контейнера, чтобы разрешить скроллинг страницы на уровне окна браузера.
2. **Очистка Web-хаков в футере**:
   - В [FooterStyles.js](file:///d:/Magazine/_PigmentShop/src/features/shell/components/FooterStyles.js) убрать свойство `width: '100vw'`, `left: '50%'` и `marginLeft: '-50vw'`. Футер должен занимать 100% ширины своего Flexbox-родителя без выбивания из потока.
   - В [FooterStyles.js](file:///d:/Magazine/_PigmentShop/src/features/shell/components/FooterStyles.js) убрать свойство `width: '100vw'`, `left: '50%'` and `marginLeft: '-50vw'`. Футер должен занимать 100% ширины своего Flexbox-родителя без выбивания из потока.
3. **Исправление вложенности `SharedLayoutWrapper` и `Stack`**:
   - Вынести `SharedLayoutWrapper` из глобального каркаса `app/(store)/_layout.js` внутрь конкретных экранов либо обернуть экраны в единый скролл-контейнер, чтобы `Stack` не обнулял высоту `SharedLayoutWrapper`.

## Выполненные изменения стилей
1. [appStyles.js](file:///d:/Magazine/_PigmentShop/src/theme/appStyles.js): заменено `height: '100vh'` на `minHeight: '100vh'` и удален `overflow: 'hidden'`.
2. [FooterStyles.js](file:///d:/Magazine/_PigmentShop/src/features/shell/components/FooterStyles.js): удалены Web-хаки `width: '100vw'`, `position: 'relative'`, `left: '50%'` и `marginLeft: '-50vw'`.
3. [SharedLayoutWrapperStyles.js](file:///d:/Magazine/_PigmentShop/src/features/shell/SharedLayoutWrapper/SharedLayoutWrapperStyles.js): удален локальный `overflowY: 'auto'` с `scrollRoot` для использования естественного скролла страницы браузера.
4. [app/(store)/_layout.js](file:///d:/Magazine/_PigmentShop/app/(store)/_layout.js): компонент `<Stack />` заменен на `<Slot />`, исключив абсолютное позиционирование экранов и вернув естественный DOM-поток для контента и футера.

## Анализ целесообразности пересоздания футера
- [Footer.js](file:///d:/Magazine/_PigmentShop/src/features/shell/components/Footer.js) — простой изолированный компонент (логотип и копирайт).
- Проблема успешно решена рефакторингом контейнера `<Slot />` в `app/(store)/_layout.js` без пересоздания компонента `Footer`.
