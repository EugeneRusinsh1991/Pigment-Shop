# Feature Architecture Spec & Tasks

## Overview
Standards for feature modules (`src/features/<feature-name>`). Defines standard layer structure for application pages and features.

## Feature Layer Requirements
Every feature module in `src/features/<feature-name>` must follow:
- **`components/`**: Private UI components used strictly within this feature.
- **`hooks/`**: Custom hooks encapsulating feature state and side-effects.
- **`styles/`**: Dedicated CSS-in-JS or tokenized style definitions.
- **`index.js`**: Unified root export exposing the feature page to the router/shell.

## Step 1: Feature Architecture Specification
- Document feature architectural boundary rules.

## Step 2: Audit Existing Features
- Audit `catalog`, `cart`, `orders`, `profile`, `home`, `contact`, `auth`, `shell`.

## Step 3: Standardize Features
- Refactor non-conforming features to unified folder/export layout.
