/**
 * Typography tokens
 *
 * Defines the shared typographic scale for the application.
 * The only permitted variation per usage is `color`, which is
 * determined by the current theme or the component context.
 */

export const typography = {
  header: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: 0.3,
  },
  subheader: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  body: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 0.1,
  },
};
