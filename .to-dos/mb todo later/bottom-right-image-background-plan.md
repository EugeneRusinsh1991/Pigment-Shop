# Flexible Decorative Background Watermark Architecture & Implementation Plan

## Executive Summary
This document provides a comprehensive architectural investigation and step-by-step implementation plan for introducing dynamic, token-driven decorative background watermark graphics (such as the red petri dish & pipette liquid accent image) across the application. 

Rather than hardcoding an image onto specific page components, this plan introduces a **Reusable Background Watermark Architecture Subsystem** that supports:
1. Flexible asset assignment per route or container context.
2. Customizable positioning (bottom-right, bottom-left, top-right, etc.), size scaling, opacity, blend modes, and dark/light theme behaviors.
3. Zero hardcoding — using design system tokens (`zIndices`, `opacity`, `layout`) and a centralized `WatermarkRegistry`.
4. Dynamic enablement — easily enabling, disabling, or swapping images across any present or future page without changing layout code.

---

## 1. Architectural Foundation: Is a New Layer Required?

### Assessment: Yes, a Dedicated UI/Shell Background Primitive Subsystem is Required
Currently, the codebase manages page backgrounds via uniform container background colors (`commonStyles.container`, `colors.backgroundLight`, `colors.backgroundDark`). Placing absolute images directly inside feature page files (e.g. `ContactPage.js`) creates tight coupling, duplicated positioning logic, and hardcoded asset paths.

To ensure long-term flexibility, we establish the **Background Watermark Layer (BWL)**:
- **Design Tokens Layer** (`src/theme/watermarkTokens.js` & `layout.js`): Standardized positioning presets, z-index levels, and responsive scaling tokens.
- **Watermark Registry Layer** (`src/config/watermarkRegistry.js`): A centralized configuration mapping routes/screen keys to asset specs and layout profiles.
- **Component Layer** (`src/components/ui/Media/WatermarkOverlay.js`): Non-interactive, theme-aware, responsive presentation primitive rendering background accents.
- **Shell Layer Wrapper** (`PageWatermarkWrapper.js` or direct insertion in page route templates): Connects route configuration to the primitive seamlessly.

---

## 2. Tokenized Design System Additions

### 2.1 Z-Index & Layout Tokens (`src/theme/layout.js`)
Extend `layout.zIndices` to safely place watermarks above container backgrounds but below interactive content:
```javascript
// Add to layout.zIndices in src/theme/layout.js
zIndices: {
  backgroundWatermark: 0,
  base: 1,
  // ... existing zIndices
}
```

### 2.2 Dedicated Watermark Tokens (`src/theme/watermarkTokens.js`)
Create tokenized specs for watermark variants to eliminate magic numbers:
```javascript
export const watermarkTokens = {
  presets: {
    bottomRightLarge: {
      position: { bottom: 0, right: 0 },
      dimensions: { desktop: 420, tablet: 320, mobile: 220 },
    },
    bottomRightMedium: {
      position: { bottom: 0, right: 0 },
      dimensions: { desktop: 320, tablet: 240, mobile: 180 },
    },
  },
  opacity: {
    lightMode: 0.95,
    darkMode: 0.75,
  },
};
```

---

## 3. Centralized Asset & Route Registry (`src/config/watermarkRegistry.js`)

To decouple assets from screen components, define a centralized registry:

```javascript
import { watermarkTokens } from '../theme/watermarkTokens';

export const WATERMARK_ASSETS = {
  PETRI_PIPETTE_RED: require('@/assets/images/bg-petri-pipettes.png'),
  // Future asset keys added here seamlessly
};

export const watermarkRegistry = {
  // Configured routes/screens
  contact: {
    asset: WATERMARK_ASSETS.PETRI_PIPETTE_RED,
    preset: watermarkTokens.presets.bottomRightLarge,
    opacityLight: 1.0,
    opacityDark: 0.8,
    enabled: true,
  },
  emptyState: {
    asset: WATERMARK_ASSETS.PETRI_PIPETTE_RED,
    preset: watermarkTokens.presets.bottomRightMedium,
    opacityLight: 0.85,
    opacityDark: 0.6,
    enabled: true,
  },
};
```

---

## 4. Presentational Primitive (`src/components/ui/Media/WatermarkOverlay.js`)

A reusable, responsive, non-interactive overlay component:

```javascript
import React from 'react';
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { layout } from '@/theme/layout';

export default function WatermarkOverlay({ config }) {
  const { isDark } = useTheme();
  const { width } = useWindowDimensions();

  if (!config || !config.enabled || !config.asset) return null;

  const isMobile = width < layout.breakpoints.mobile;
  const isTablet = width < layout.breakpoints.desktop;

  const size = isMobile
    ? config.preset.dimensions.mobile
    : isTablet
    ? config.preset.dimensions.tablet
    : config.preset.dimensions.desktop;

  const opacity = isDark ? config.opacityDark : config.opacityLight;

  return (
    <View style={[styles.container, config.preset.position, { zIndex: layout.zIndices.backgroundWatermark }]} pointerEvents="none">
      <Image
        source={config.asset}
        style={{
          width: size,
          height: size,
          opacity: opacity,
        }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    pointerEvents: 'none',
  },
});
```

---

## 5. Screen Integration Strategy

### Scenario A: Explicit Injection in Empty/Feature Pages
In components with empty space (such as `ContactPage.js` or `EmptyState.js`), insert `<WatermarkOverlay config={watermarkRegistry.contact} />` inside the outer relative container:

```javascript
// ContactPage.js
<View style={[commonStyles.container, { position: 'relative' }]}>
  <WatermarkOverlay config={watermarkRegistry.contact} />
  <ScrollView>
    {/* Page Content */}
  </ScrollView>
</View>
```

### Scenario B: Dynamic Layout Wrapper (`app/(store)/_layout.js`)
Optionally inject the overlay based on the current active route name automatically, allowing pages to opt-in or opt-out without touching screen code.

---

## 6. Implementation Plan & Execution Phases

### Phase 1: Foundational Design Tokens & Asset Setup
1. Copy target image to `assets/images/bg-petri-pipettes.png`.
2. Add `backgroundWatermark: 0` to `layout.zIndices` in `src/theme/layout.js`.
3. Create `src/theme/watermarkTokens.js` with preset dimensions, positioning, and theme opacity defaults.

### Phase 2: Architecture Registry & UI Primitive Component
1. Create `src/config/watermarkRegistry.js` mapping screen keys (`contact`, `emptyCart`, `profile`) to asset configurations.
2. Create `src/components/ui/Media/WatermarkOverlay.js` supporting responsive scaling and pointer-events passthrough.

### Phase 3: Page Integration (Contact Page & Empty States)
1. Update `ContactPage.js` relative positioning and integrate `<WatermarkOverlay config={watermarkRegistry.contact} />`.
2. Update `EmptyState.js` or secondary layout spaces to render configured watermarks when active.

### Phase 4: Automated Audit & Visual Verification
1. Validate code hygiene using `.tools` UI auditor (`npm run audit:ui`).
2. Test responsive scaling (Mobile 375px, Tablet 768px, Desktop 1440px) and dark mode toggling using Playwright inspection scripts.

---

## 7. Open Questions / Design Considerations
1. **Dark Mode Blend Modes**: Does the red petri dish need an overlay tint/alpha adjustment in Dark Mode, or does standard opacity reduction (e.g. `0.75`) suffice?
2. **Asset Optimization**: Ensure PNG asset is losslessly compressed or formatted as WebP for optimal page load speed.

