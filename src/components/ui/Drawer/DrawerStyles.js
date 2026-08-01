import { Platform, StyleSheet } from 'react-native';
import { colors, layout, shadows } from '../../../theme/tokens';

export const getDrawerStyles = (position = 'left') => {
  const isHorizontal = position === 'left' || position === 'right';
  const flexDirection = position === 'right' ? 'row-reverse' : isHorizontal ? 'row' : 'column';

  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection,
      position: 'relative',
      zIndex: layout.zIndices.drawer,
    },
    panel: {
      height: isHorizontal ? (Platform.OS === 'web' ? ['100%', '100dvh'] : '100%') : 'auto',
      width: isHorizontal ? 'auto' : '100%',
      ...Platform.select({
        web: shadows.drawerSide.web,
        default: shadows.drawerSide.native,
      }),
      elevation: layout.elevation.xl,
    },
    panelDark: { backgroundColor: colors.navSurfaceDark },
    panelLight: { backgroundColor: colors.white },
    header: {
      padding: layout.spacing.lg,
      borderBottomWidth: layout.borderWidth.thin,
      borderBottomColor: colors.secondaryLightBorder,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    footer: {
      padding: layout.spacing.lg,
      borderTopWidth: layout.borderWidth.thin,
      borderTopColor: colors.secondaryLightBorder,
      marginTop: 'auto',
      ...Platform.select({
        web: {
          paddingBottom: `max(${layout.spacing.lg}px, env(safe-area-inset-bottom))`,
        },
        default: {},
      }),
    },
    dismissPressable: {
      flex: 1,
    },
    title: {
      flex: 1,
    },
  });
};

export const drawerStyles = getDrawerStyles('left');
