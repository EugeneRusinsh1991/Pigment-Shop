import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, layout } from '../../../theme/tokens';
import { ForwardArrowIcon } from '../../Icons/ControlIcons';
import { Text } from '../Text';
import Card from './Card';

const NavigationCard = React.forwardRef(({ type, isDark, text, style, ...rest }, ref) => {
  return (
    <Card
      ref={ref}
      variant="compact"
      isDark={isDark}
      interactive={true}
      style={[styles.root, style]}
      {...rest}
    >
      <View style={styles.content}>
        <View style={[styles.circle, isDark ? styles.circleDark : styles.circleLight]}>
          <ForwardArrowIcon color={colors.accent} size={20} />
        </View>
        <Text variant="subtitle1" weight="semibold" style={[styles.text, isDark ? styles.textDark : styles.textLight]}>
          {text}
        </Text>
      </View>
    </Card>
  );
});

export default NavigationCard;

const styles = StyleSheet.create({
  root: {},
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: layout.spacing.md,
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: layout.radii.xl,
    borderWidth: layout.borderWidth.thin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleDark: {
    backgroundColor: colors.borderDark,
    borderColor: colors.surfaceSubtleDark,
  },
  circleLight: {
    backgroundColor: colors.backgroundLight,
    borderColor: colors.warmNeutralBorder,
  },
  text: {
    textAlign: 'center',
  },
  textDark: {
    color: colors.textDark,
  },
  textLight: {
    color: colors.textLight,
  },
});
