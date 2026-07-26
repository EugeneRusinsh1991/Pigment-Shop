# Feedback System Architecture Specification

## Target Directory Structure

```
src/components/Feedback/
├── index.js                     # Public API barrel export
├── Toast/
│   ├── index.js                 # Barrel export for Toast
│   ├── ToastView.js             # Core presentational toast overlay
│   ├── ToastStyles.js           # Dynamic style map factory (glassmorphism/theme tokens)
│   ├── useToastTheme.js         # Variant color & context theme resolution hook
│   └── useToastAnimation.js     # Slide & fade gesture animation driver hook
├── Skeleton/
│   ├── index.js                 # Barrel export for Skeleton
│   ├── SkeletonLoader.js        # Skeleton animation component
│   └── SkeletonStyles.js        # Shape & shimmer style factory
├── EmptyState/
│   ├── index.js                 # Barrel export for EmptyState
│   ├── EmptyState.js            # Empty state presenter
│   └── EmptyStateStyles.js      # Layout & typography style factory
└── InlineError/
    ├── index.js                 # Barrel export for InlineError
    ├── FieldError.js            # Field-level error indicator
    └── FieldErrorStyles.js      # Text & icon style factory
```

## Public API Contract

### Toast (`src/components/Feedback/Toast/`)
- `type`: `'success' | 'error' | 'warning' | 'info'` (default: `'info'`)
- `message`: `string`
- `visible`: `boolean`
- `onDismiss`: `() => void`
- `duration`: `number` (default: `3000`)

### Skeleton (`src/components/Feedback/Skeleton/`)
- `variant`: `'text' | 'card' | 'avatar' | 'rect'` (default: `'rect'`)
- `width`: `number | string`
- `height`: `number | string`
- `borderRadius`: `number`

### EmptyState (`src/components/Feedback/EmptyState/`)
- `icon`: `string | ReactNode`
- `title`: `string`
- `description`: `string`
- `actionLabel`: `string`
- `onAction`: `() => void`

### InlineError (`src/components/Feedback/InlineError/`)
- `message`: `string`
- `visible`: `boolean`
