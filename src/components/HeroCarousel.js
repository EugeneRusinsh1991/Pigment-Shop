import { useEffect, useMemo, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import globalStyles from '../AppStyles';
import { useCatalog } from '../context/CatalogContext';
import { useCarouselState } from '../hooks/useCarouselState';
import { MediaRenderer } from '../media';

function CarouselArrows({ show, onPrev, onNext }) {
  if (!show) return null;
  return (
    <>
      <TouchableOpacity
        style={[localStyles.arrowBtn, localStyles.leftArrow]}
        onPress={onPrev}
        activeOpacity={0.7}
      >
        <Text style={localStyles.arrowText}>‹</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[localStyles.arrowBtn, localStyles.rightArrow]}
        onPress={onNext}
        activeOpacity={0.7}
      >
        <Text style={localStyles.arrowText}>›</Text>
      </TouchableOpacity>
    </>
  );
}

function CarouselDots({ banners, currentIndex, handleSwitch }) {
  if (banners.length <= 1) return null;
  return (
    <View style={localStyles.dotsContainer}>
      {banners.map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            localStyles.dot,
            index === currentIndex ? localStyles.dotActive : localStyles.dotInactive,
          ]}
          onPress={() => handleSwitch(index)}
          activeOpacity={0.7}
        />
      ))}
    </View>
  );
}

function getBreakoutStyle(isWide, windowWidth) {
  if (isWide) return {};
  return { width: windowWidth, alignSelf: 'center', borderRadius: 0 };
}

function useBannerNavigation(banners, currentIndex, handleSwitch) {
  const handlePrev = () => handleSwitch((currentIndex - 1 + banners.length) % banners.length);
  const handleNext = () => handleSwitch((currentIndex + 1) % banners.length);
  return { handlePrev, handleNext };
}

export default function HeroCarousel({ isDark, isWide }) {
  const { banners = [] } = useCatalog();
  const { currentIndex, prevIndex, fadeAnim, handleSwitch } = useCarouselState(banners);
  const { width: windowWidth } = useWindowDimensions();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (currentIndex === prevIndex) {
      setIsTransitioning(false);
      return;
    }
    setIsTransitioning(true);
  }, [currentIndex, prevIndex]);

  if (banners.length === 0) return null;

  const activeBanner = banners[currentIndex];
  const prevBanner = banners[prevIndex];
  const hasMultiple = banners.length > 1;
  const { handlePrev, handleNext } = useBannerNavigation(banners, currentIndex, handleSwitch);
  const breakoutStyle = getBreakoutStyle(isWide, windowWidth);

  const renderLayers = useMemo(() => {
    const layers = [];
    if (prevBanner) {
      layers.push(
        <Animated.View
          key={`prev-${prevBanner}`}
          style={[localStyles.imageFill, { opacity: isTransitioning ? 1 - fadeAnim : 0 }]}
        >
          <MediaRenderer uri={prevBanner} style={localStyles.imageFill} resizeMode="cover" />
        </Animated.View>
      );
    }

    if (activeBanner) {
      layers.push(
        <Animated.View
          key={`active-${activeBanner}`}
          style={[localStyles.imageFill, { opacity: isTransitioning ? fadeAnim : 1 }]}
        >
          <MediaRenderer uri={activeBanner} style={localStyles.imageFill} resizeMode="cover" />
        </Animated.View>
      );
    }

    return layers;
  }, [activeBanner, fadeAnim, isTransitioning, prevBanner]);

  return (
    <View style={[globalStyles.heroRight, isWide ? globalStyles.heroRightWide : globalStyles.heroRightMobile, breakoutStyle]}>
      <View style={localStyles.carouselContainer}>
        {renderLayers}
        <CarouselArrows show={hasMultiple} onPrev={handlePrev} onNext={handleNext} />
        <CarouselDots banners={banners} currentIndex={currentIndex} handleSwitch={handleSwitch} />
      </View>
    </View>
  );
}


const localStyles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  imageFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  arrowBtn: {
    position: 'absolute',
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(28, 28, 28, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  leftArrow: {
    left: 12,
  },
  rightArrow: {
    right: 12,
  },
  arrowText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '300',
    lineHeight: 28,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    transition: 'width 0.3s ease, opacity 0.3s ease',
  },
  dotActive: {
    width: 20,
    opacity: 1,
  },
  dotInactive: {
    width: 8,
    opacity: 0.5,
  },
});
