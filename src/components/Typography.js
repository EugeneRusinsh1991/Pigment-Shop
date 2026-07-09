import React from 'react';
import { Text } from 'react-native';
import { typography } from '../theme/typography';

/**
 * Header
 *
 * Large, bold heading text. Color is controlled by the `style` prop
 * to allow theme-aware or context-specific coloring.
 *
 * Props:
 *   style        – additional style (use to set `color`)
 *   children     – text content
 *   numberOfLines – optional line clamp
 */
export function Header({ style, children, numberOfLines }) {
  return (
    <Text style={[typography.header, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}

/**
 * Subheader
 *
 * Medium-weight label below a heading. Color via `style` prop.
 *
 * Props:
 *   style        – additional style (use to set `color`)
 *   children     – text content
 *   numberOfLines – optional line clamp
 */
export function Subheader({ style, children, numberOfLines }) {
  return (
    <Text style={[typography.subheader, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}

/**
 * BodyText
 *
 * Regular paragraph / body copy. Color via `style` prop.
 *
 * Props:
 *   style        – additional style (use to set `color`)
 *   children     – text content
 *   numberOfLines – optional line clamp
 */
export function BodyText({ style, children, numberOfLines }) {
  return (
    <Text style={[typography.body, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}
