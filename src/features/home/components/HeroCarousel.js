import { useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import globalStyles from '@/AppStyles';
import { useCatalog } from '@/context/CatalogContext';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons';
import { DEFAULT_ACTIVE_OPACITY } from '@/theme/buttonCommon';
import { colors } from '@/theme/tokens';
import { CarouselDots } from './HeroCarousel/CarouselDots';
import { CarouselLayers } from './HeroCarousel/CarouselLayers';
import { useCarouselData } from './HeroCarousel/useCarouselData';
import { localStyles } from './HeroCarousel/carouselStyles';

import { AnimatedButton } from '@/components/Button';

function CarouselArrows({ show, onPrev, onNext }) {
  if (!show) return null;
  return (
    <>
      <AnimatedButton
        style={[localStyles.arrowBtn, localStyles.leftArrow]}
        onPress={onPrev}
      >
        <ChevronLeftIcon color={colors.white} size={18} />
      </AnimatedButton>
      <AnimatedButton
        style={[localStyles.arrowBtn, localStyles.rightArrow]}
        onPress={onNext}
      >
        <ChevronRightIcon color={colors.white} size={18} />
      </AnimatedButton>
    </>
  );
}

function getBreakoutStyle(isWide, windowWidth) {
  if (isWide) return {};
  return { width: windowWidth, alignSelf: 'center', borderRadius: 0 };
}

function getCarouselBaseStyle(isWide, windowWidth) {
  const breakoutStyle = getBreakoutStyle(isWide, windowWidth);
  const responsiveStyle = isWide ? globalStyles.heroRightWide : globalStyles.heroRightMobile;
  return [globalStyles.heroRight, responsiveStyle, breakoutStyle];
}

function getPlaceholderStyle(isWide, isDark, windowWidth) {
  const baseStyle = getCarouselBaseStyle(isWide, windowWidth);
  const backgroundColor = isDark ? colors.borderDarkAlt : colors.borderSlateLight;
  return [...baseStyle, { backgroundColor }];
}

export default function HeroCarousel({ isDark, isWide }) {
  const { banners } = useCatalog();
  const { width: windowWidth } = useWindowDimensions();
  const carouselState = useCarouselData(banners);
  const [videoProgress, setVideoProgress] = useState(0);

  useEffect(() => {
    setVideoProgress(0);
  }, [carouselState.currentIndex]);

  if (banners === null) {
    const placeholderStyle = getPlaceholderStyle(isWide, isDark, windowWidth);
    return <View style={placeholderStyle} />;
  }

  if (banners.length === 0) return null;

  const baseStyle = getCarouselBaseStyle(isWide, windowWidth);
  return (
    <View style={baseStyle}>
      <View style={localStyles.carouselContainer}>
        <CarouselLayers
          banners={carouselState.banners}
          currentIndex={carouselState.currentIndex}
          prevIndex={carouselState.prevIndex}
          fadeAnim={carouselState.fadeAnim}
          onVideoProgress={setVideoProgress}
        />
        <CarouselArrows show={carouselState.hasMultiple} onPrev={carouselState.handlePrev} onNext={carouselState.handleNext} />
        <CarouselDots
          banners={banners}
          currentIndex={carouselState.currentIndex}
          handleSwitch={carouselState.handleSwitch}
          videoProgress={videoProgress}
        />
      </View>
    </View>
  );
}
