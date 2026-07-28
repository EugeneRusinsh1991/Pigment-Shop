# Пошаговое решение — Исправление нарушений UI-архитектуры

Исходный отчет: .docs/audits/audits/01-ui-architecture-violations.log

Краткая цель: привести структуру компонентов к стандарту (Styles, Hooks, Main Component) и устранить найденные нарушения.

Шаги:

1) Подготовка
- Создать отдельную ветку/сделать коммит перед правками: `git checkout -b fix/ui-architecture`.
- Открыть файл отчёта: `.docs/audits/audits/01-ui-architecture-violations.log`.

2) Badge — `src/components/Badge/`
- Открыть `src/components/Badge/Badge.js`.
- Добавить импорт стилей, если отсутствует:

```js
import BadgeStyles from './BadgeStyles';
```

- Убедиться, что в компоненте используются `BadgeStyles`, например:

```jsx
<View style={BadgeStyles.container}>...</View>
```

3) Button — `src/components/Button/`
- Открыть `src/components/Button/useButtonTheme.js`.
- Обеспечить возврат корректного объекта темы, пример минимальной реализации:

```js
export default function useButtonTheme() {
  return {
    container: { padding: 10, borderRadius: 6 },
    text: { color: '#0a0a0a', fontSize: 14 },
  };
}
```

- При необходимости подключить `useTheme()` или другие источники значений.

4) Motion — `src/components/Motion/`
- Создать недостающие файлы:
  - `src/components/Motion/MotionStyles.js`
  - `src/components/Motion/useMotionTheme.js`

- Примеры содержимого:

`MotionStyles.js`
```js
const MotionStyles = {
  container: {},
  animated: {},
};
export default MotionStyles;
```

`useMotionTheme.js`
```js
export default function useMotionTheme() {
  return { duration: 300, easing: 'ease-in-out' };
}
```

5) Search — `src/components/Search/`
- Открыть `src/components/Search/useSearchTheme.js`.
- Вернуть корректный объект темы, пример:

```js
export default function useSearchTheme() {
  return {
    container: { padding: 8 },
    input: { fontSize: 14, color: '#111' },
  };
}
```

6) Text — `src/components/Text/`
- Открыть `src/components/Text/Text.js`.
- Добавить импорт стилей, если отсутствует:

```js
import TextStyles from './TextStyles';
```

- Убедиться, что компонент использует `TextStyles`, например:

```jsx
<Text style={TextStyles.body}>...</Text>
```

7) Проверка и коммит
- Запустить линтер/типизацию/сборку, если доступны:

```bash
npm run lint
npm run build
```

- Протестировать экран(ы), где используются изменённые компоненты.
- Закоммитить изменения и открыть PR:

```bash
git add .
git commit -m "fix(ui): resolve component architecture violations"
git push --set-upstream origin fix/ui-architecture
```

Дополнительно
- Если проект использует экспорт/импорт стилей в другом формате, адаптировать примеры к существующему паттерну.
- Если хук должен получать тему из контекста, вызвать `const theme = useTheme();` и объединить значения.

Конец.
