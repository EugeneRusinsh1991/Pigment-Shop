import { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { localStyles } from './carouselStyles';
import { getMediaType } from '@/media/MediaTypeDetector';
import { AnimatedButton } from '@/components/Button';
import { colors, layout } from '@/theme/tokens';

function ActiveDotProgress({ isVideo, videoProgress }) {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
      style={{
        backgroundColor: colors.white,
        height: '100%',
        width,
      }}
    />
  );
}

export function CarouselDots({ banners, currentIndex, handleSwitch, videoProgress }) {
  if (banners.length <= 1) return null;
  return (
    <View style={localStyles.dotsContainer}>
      {banners.map((uri, index) => {
        const isActive = index === currentIndex;
        const isVideo = getMediaType(uri) === 'video';

        return (
          <AnimatedButton
            key={index}
            style={[
              localStyles.dot,
              isActive ? localStyles.dotActive : localStyles.dotInactive,
              isActive && { backgroundColor: colors.overlayScrim, overflow: 'hidden' }
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

