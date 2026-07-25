import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ForwardArrowIcon } from './icons/ControlIcons';
import BaseCard from './BaseCard';

const NavigationCard = React.forwardRef(({ type, isDark, text, style, ...rest }, ref) => {
  return (
    <BaseCard
      ref={ref}
      isDark={isDark}
      interactive={true}
      useDimensions={true}
      depth={1}
      lightBgColor="#F3EEEA"
      style={style}
      {...rest}
    >
      <View style={styles.content}>
        <View style={[styles.circle, isDark ? styles.circleDark : styles.circleLight]}>
          <ForwardArrowIcon color="#E31B23" size={20} />
        </View>
        <Text style={[styles.text, isDark ? styles.textDark : styles.textLight]}>
          {text}
        </Text>
      </View>
    </BaseCard>
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
    backgroundColor: '#2A2A2A',
    borderColor: '#444444',
  },
  circleLight: {
    backgroundColor: '#FAF8F6',
    borderColor: '#D0C9C0',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  textDark: {
    color: '#FFFFFF',
  },
  textLight: {
    color: '#1C1C1C',
  },
});
