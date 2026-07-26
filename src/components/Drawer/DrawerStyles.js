import { Platform, StyleSheet } from 'react-native';
import { colors, layout, shadows } from '../../theme/tokens';

export const getDrawerStyles = (position = 'left') => {
  const isHorizontal = position === 'left' || position === 'right';

  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: isHorizontal ? 'row' : 'column',
      position: 'relative',
      zIndex: layout.zIndices.drawer,
    },
    panel: {
      height: isHorizontal ? '100%' : 'auto',
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
      borderBottomWidth: 1,
      borderBottomColor: colors.secondaryLightBorder,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    footer: {
      padding: layout.spacing.lg,
      borderTopWidth: 1,
      borderTopColor: colors.secondaryLightBorder,
      marginTop: 'auto',
    },
    dismissPressable: {
      flex: 1,
    },
  });
};

export const drawerStyles = getDrawerStyles('left');
