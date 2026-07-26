# UI Design System & Tokenization

## Purpose
The application uses a unified, tokenized design system to ensure consistency across all UI components. This avoids hardcoded styles and ensures a single source of truth for colors, layout spacing, border radii, and typography.

## Architecture

### 1. Theme Tokens (`src/theme/tokens.js` & `AppStyles.js`)
- Contains all raw design system values (colors, spacing, font sizes).
- Components consume these tokens dynamically through the `useTheme()` hook.

### 2. UI Primitives (`src/components/`)
All atomic components must consume design tokens instead of hardcoded values.
- **Form Primitives**: `TextField`, `Toggle`, `Search`
- **Feedback & Status**: `Toast`, `Skeleton`, `EmptyState`, `Badge`, `Flag`
- **Navigation & Layout**: `Navigation`, `Drawer`, `Modal`, `DataTable`, `Card`, `Media`
- **Typography & Interaction**: `Text`, `Heading`, `Button`, `IconButton`

## Known Rules & Guidelines
- **No Hardcoded Styles**: Never use hardcoded pixel values for layout padding, margins, or colors inside component files.
- **Dynamic Styling**: Always extract `theme` from `useTheme()` context to access `theme.colors`, `theme.layout`, `theme.radius`, etc.
- **Reusability**: Build UI components to be highly reusable without domain-specific logic.

## Current State
- The majority of complex and simple UI components have been refactored to consume the theme tokens (Step 3.1 & 3.2 of style-tokenization roadmap).

## Recommended Next Steps
- Audit the remaining components (if any) to ensure 100% tokenization.
- Maintain strict adherence to these tokens in any newly created components.
