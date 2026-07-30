import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { getMediaType } from '@/media/MediaTypeDetector';
import { AnimatedButton } from '@/components/ui/Button';
import { carouselTokens, layout } from '@/theme/tokens';

export const dotStyles = StyleSheet.create({
  dotsContainer: {
    position: 'absolute',
    bottom: layout.spacing.lg,
    left: layout.spacing.none,
    right: layout.spacing.none,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: layout.zIndices.dropdown,
    gap: carouselTokens.dots.gap,
  },
  dot: {
    height: carouselTokens.dots.height,
    borderRadius: carouselTokens.dots.borderRadius,
    backgroundColor: carouselTokens.dots.inactiveColor,
    transition: 'width 0.3s ease, opacity 0.3s ease',
  },
  dotActive: {
    width: carouselTokens.dots.activeWidth,
    opacity: layout.opacity.full,
    backgroundColor: carouselTokens.dots.activeBgColor,
    overflow: 'hidden',
    borderRadius: carouselTokens.dots.borderRadius,
  },
  dotInactive: {
    width: carouselTokens.dots.inactiveWidth,
    opacity: layout.opacity.full,
  },
  progressBar: {
    backgroundColor: carouselTokens.dots.activeColor,
    height: '100%',
    borderRadius: carouselTokens.dots.borderRadius,
  },
});

function ActiveDotProgress({ isVideo, videoProgress }) {
  const progressAnim = useRef(new Animated.Value(videoProgress !== undefined ? 0 : 1)).current;

  useEffect(() => {
    if (videoProgress === undefined) {
      progressAnim.setValue(1);
      return;
    }

    if (isVideo) {
      Animated.timing(progressAnim, {
        toValue: videoProgress || 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    } else {
      progressAnim.setValue(0);
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }).start();
    }
  }, [isVideo, videoProgress]);

  const width = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View
      style={[dotStyles.progressBar, { width }]}
    />
  );
}

export function CarouselDots({ banners, currentIndex, handleSwitch, videoProgress, containerStyle }) {
  if (!banners || banners.length <= 1) return null;

  return (
    <View style={[dotStyles.dotsContainer, containerStyle]}>
      {banners.map((item, index) => {
        const isActive = index === currentIndex;
        const uri = typeof item === 'string' ? item : item?.uri || item?.path || '';
        const isVideo = uri ? getMediaType(uri) === 'video' : false;

        return (
          <AnimatedButton
            key={index}
            style={[
              dotStyles.dot,
              isActive ? dotStyles.dotActive : dotStyles.dotInactive,
            ]}
            onPress={() => handleSwitch(index)}
            hitSlop={{ top: layout.spacing.lg, bottom: layout.spacing.lg, left: layout.spacing.md, right: layout.spacing.md }}
          >
            {isActive && (
              <ActiveDotProgress isVideo={isVideo} videoProgress={videoProgress} />
            )}
          </AnimatedButton>
        );
      })}
    </View>
  );
}

export default CarouselDots;
