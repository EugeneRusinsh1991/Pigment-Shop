import { Animated } from 'react-native';
import MediaRenderer from '@/components/Media/MediaRenderer';
import { localStyles } from './carouselStyles';
import { getCarouselOpacity } from '@/hooks/useCarouselState';

function CarouselLayer({ uri, index, currentIndex, prevIndex, fadeAnim, onVideoProgress }) {
  const opacity = getCarouselOpacity(index, currentIndex, prevIndex, fadeAnim);
  const isActive = index === currentIndex;

  return (
    <Animated.View
      pointerEvents={isActive ? 'auto' : 'none'}
      style={[localStyles.imageFill, { opacity }]}
    >
      <MediaRenderer
        uri={uri}
        style={localStyles.imageFill}
        resizeMode="cover"
        isActive={isActive}
        onProgress={isActive ? onVideoProgress : undefined}
      />
    </Animated.View>
  );
}

export function CarouselLayers({ banners, currentIndex, prevIndex, fadeAnim, onVideoProgress }) {
  return (
    <>
      {banners.map((uri, index) => (
        <CarouselLayer
          key={index}
          uri={uri}
          index={index}
          currentIndex={currentIndex}
          prevIndex={prevIndex}
          fadeAnim={fadeAnim}
          onVideoProgress={onVideoProgress}
        />
      ))}
    </>
  );
}
