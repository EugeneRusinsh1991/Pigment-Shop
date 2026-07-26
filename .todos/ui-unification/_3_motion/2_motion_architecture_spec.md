# Motion System Architecture Specification

## Target Directory Structure

```
src/components/Motion/
├── index.js                     # Public API barrel export
├── ScrollFadeUp/
│   ├── index.js                 # Barrel export for ScrollFadeUp
│   ├── ScrollFadeUp.js          # Core scroll reveal animation wrapper
│   └── useScrollAnimation.js    # Scroll listener & spring animation driver hook
└── PageTransition/
    ├── index.js                 # Barrel export for PageTransition
    ├── PageTransition.js        # Core route transition wrapper
    └── useTransitionTheme.js    # Layout/theme hook
```

## Public API Contract

### ScrollFadeUp (`src/components/Motion/ScrollFadeUp/`)
- `children`: `ReactNode`
- `delay`: `number` (default: `0`)
- `duration`: `number` (default: `300`)
- `distance`: `number` (default: `20`)

### PageTransition (`src/components/Motion/PageTransition/`)
- `children`: `ReactNode`
- `type`: `'fade' | 'slide' | 'scale'` (default: `'fade'`)
