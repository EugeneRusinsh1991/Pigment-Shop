import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ForwardArrowIcon } from '../icons/ControlIcons';
import Card from './Card';
import { colors } from '../../theme/tokens';

const NavigationCard = React.forwardRef(({ type, isDark, text, style, ...rest }, ref) => {
  return (
    <Card
      ref={ref}
      variant="compact"
      isDark={isDark}
      interactive={true}
      style={style}
      {...rest}
    >
      <View style={styles.content}>
        <View style={[styles.circle, isDark ? styles.circleDark : styles.circleLight]}>
          <ForwardArrowIcon color={colors.accent} size={20} />
        </View>
        <Text style={[styles.text, isDark ? styles.textDark : styles.textLight]}>
          {text}
        </Text>
      </View>
    </Card>
  );
});

export default NavigationCard;

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleDark: {
    backgroundColor: colors.borderDark,
    borderColor: colors.neutralDarkMid,
  },
  circleLight: {
    backgroundColor: colors.backgroundLight,
    borderColor: colors.warmNeutralBorder,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  textDark: {
    color: colors.textDark,
  },
  textLight: {
    color: colors.textLight,
  },
});
