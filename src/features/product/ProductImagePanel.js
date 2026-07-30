import React, { useCallback } from 'react';
import { View, Animated } from 'react-native';
import { Text } from '../../components/ui/Text/Text';
import styles from './ProductPageStyles';
import MediaRenderer from '../../components/ui/Media/MediaRenderer';
import { CarouselDots } from '../../components/ui/Media';

import { useCarouselState, getCarouselOpacity } from '../../hooks/useCarouselState';
import { HeartIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons';
import { AnimatedButton } from '../../components/ui/Button';
import ProductBadges from './ProductBadges';
import { colors } from '../../theme/tokens';

import { PRODUCT_PLACEHOLDER } from '../../constants';

const getImages = (product) => {
  if (product?.images && product.images.length > 0) {
    return product.images;
  }
  const mainImage = product?.image || PRODUCT_PLACEHOLDER;
  return [mainImage, PRODUCT_PLACEHOLDER, PRODUCT_PLACEHOLDER];
};


function ProductGalleryLayers({ images, currentIndex, prevIndex, fadeAnim }) {
  return (
    <>
      {images.map((uri, index) => {
        const opacity = getCarouselOpacity(index, currentIndex, prevIndex, fadeAnim);
        const isActive = index === currentIndex;
        return (
          <Animated.View
            key={`${index}-${uri}`}
            style={[styles.imageFill, { opacity, pointerEvents: isActive ? 'auto' : 'none' }]}
          >
            <MediaRenderer uri={uri} style={styles.imageFill} resizeMode="cover" />
          </Animated.View>
        );
      })}
    </>
  );
}

function CarouselArrows({ show, onPrev, onNext }) {
  if (!show) return null;
  return (
    <>
      <AnimatedButton
        style={[styles.arrowBtn, styles.leftArrow]}
        onPress={onPrev}
      >
        <ChevronLeftIcon color={colors.white} size={18} />
      </AnimatedButton>
      <AnimatedButton
        style={[styles.arrowBtn, styles.rightArrow]}
        onPress={onNext}
      >
        <ChevronRightIcon color={colors.white} size={18} />
      </AnimatedButton>
    </>
  );
}




function ProductFavoriteBtn({ isWide, isDark, isFavorite, onToggleFavorite, product }) {
  if (isWide) return null;
  const heartColor = isFavorite ? colors.accent : isDark ? colors.white : colors.dark;
  return (
    <AnimatedButton
      style={[styles.favOverlay, isDark ? styles.favOverlayDark : styles.favOverlayLight]}
      onPress={() => onToggleFavorite && onToggleFavorite(product)}
      scaleTo={1.3}
    >
      <HeartIcon filled={isFavorite} color={heartColor} size={16} />
    </AnimatedButton>
  );
}

export function ProductImagePanel({ product, isWide, isFavorite, onToggleFavorite, isDark }) {
  const images = getImages(product);
  const {
    currentIndex,
    prevIndex,
    fadeAnim,
    handleSwitchWithTransition,
    handlePrev,
    handleNext,
  } = useCarouselState(images);

  const hasMultiple = images.length > 1;

  return (
    <View style={[styles.imageArea, isWide && styles.imageAreaWide]}>
      <View style={styles.carouselContainer}>
        <ProductGalleryLayers
          images={images}
          currentIndex={currentIndex}
          prevIndex={prevIndex}
          fadeAnim={fadeAnim}
        />

        <ProductBadges isNew={product?.isNew} discountPercent={product?.discountPercent} containerStyle={styles.badgesOverlay} />

        <CarouselArrows
          show={hasMultiple}
          onPrev={handlePrev}
          onNext={handleNext}
        />

        <CarouselDots
          banners={images}
          currentIndex={currentIndex}
          handleSwitch={handleSwitchWithTransition}
        />

        <ProductFavoriteBtn
          isWide={isWide}
          isDark={isDark}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
          product={product}
        />
      </View>
    </View>
  );
}
