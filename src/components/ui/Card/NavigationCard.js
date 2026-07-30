import React from 'react';
import { StyleSheet, View } from 'react-native';
import useCardDimensions from '../../../hooks/useCardDimensions';
import { colors, layout } from '../../../theme/tokens';
import { ForwardArrowIcon } from '../../Icons/ControlIcons';
import { Heading } from '../Text';
import Card from './Card';

const NavigationCard = React.forwardRef(({ type, isDark, text, depth = 1, style, ...rest }, ref) => {
  const { cardHeight } = useCardDimensions(depth);
  const displayText = text && !text.includes('→') ? `${text} →` : text;

  return (
    <Card
      ref={ref}
      variant="grid"
      isDark={isDark}
      interactive={true}
      style={[styles.root, { minHeight: cardHeight }, isDark ? styles.bgDark : styles.bgLight, style]}
      {...rest}
    >
      <View style={styles.overlayContainer}>
        <View style={[styles.accentBanner, isDark ? styles.bannerDark : styles.bannerLight]} />
        <View style={styles.content}>
          <View style={[styles.circle, isDark ? styles.circleDark : styles.circleLight]}>
            <ForwardArrowIcon color={colors.white} size={22} />
          </View>
          <Heading level={3} style={[styles.text, isDark ? styles.textDark : styles.textLight]}>
            {displayText}
          </Heading>
        </View>
      </View>
    </Card>
  );
});

export default NavigationCard;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.spacing.lg,
  },
  accentBanner: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9,
  },
  bannerDark: {
    backgroundColor: colors.accentDark,
  },
  bannerLight: {
    backgroundColor: colors.accent,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: layout.spacing.md,
    zIndex: layout.zIndices.base,
  },
  circle: {
    width: 52,
    height: 52,
    borderRadius: layout.radii.full,
    borderWidth: layout.borderWidth.thick,
    borderColor: colors.white,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  circleLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  text: {
    textAlign: 'center',
    color: colors.white,
  },
  textDark: {
    color: colors.white,
  },
  textLight: {
    color: colors.white,
  },
});
