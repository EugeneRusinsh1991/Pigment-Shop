# Задача: перенести переключатель темы в мобильное меню

## Текущее поведение

В мобильной версии переключатель темы отображается в правой части header-а как отдельная кнопка, вне бургер-меню. Он рендерится вместе с другими иконками шапки и не находится в составе мобильного меню.

## Желаемое поведение

В мобильной версии переключатель темы должен быть перемещён внутрь бургер-меню и отображаться рядом с языковым переключателем/селектором языка.

## Где реализовано

- Мобильный header и кнопки в правой части:
  - [src/components/AppHeader.js](../src/components/AppHeader.js)
  - [src/components/AppHeader/AppHeaderControls.js](../src/components/AppHeader/AppHeaderControls.js)
  - [src/components/AppHeader/AppHeaderStyles.js](../src/components/AppHeader/AppHeaderStyles.js)

- Мобильное бургер-меню:
  - [src/components/NavMenu.js](../src/components/NavMenu.js)
  - [src/components/NavMenu/LanguageSelector.js](../src/components/NavMenu/LanguageSelector.js)
  - [src/components/NavMenu/NavUtilActions.js](../src/components/NavMenu/NavUtilActions.js)

- Состояние темы и переключение:
  - [src/context/ThemeContext.js](../src/context/ThemeContext.js)

- Подключение интерфейса и передача пропсов между компонентами:
  - [src/components/AppShell.js](../src/components/AppShell.js)

## Что, вероятно, потребуется изменить

- Логику рендера мобильных контролов в header-е, чтобы на мобильной версии не показывать отдельную кнопку темы рядом с иконками справа.
- Содержимое бургер-меню, чтобы добавить туда UI переключателя темы.
- Передачу обработчика переключения темы из [src/components/AppShell.js](../src/components/AppShell.js) в компоненты меню, если потребуется вызывать его изнутри меню.
- Стили для мобильного header-а и меню, чтобы новый элемент корректно вписывался в интерфейс.

## Краткий итог

Реализация задачи связана с тремя слоями: мобильный header, бургер-меню и общий state темы. Для решения в будущем потребуется изменить место рендера переключателя темы, но сама логика переключения уже существует в контексте темы.
