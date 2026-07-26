import React, { useCallback } from 'react';
import { View, Animated } from 'react-native';
import { Text } from '../../components/Text/Text';
import styles from './ProductPageStyles';
import MediaRenderer from '../../components/Media/MediaRenderer';
import { useCarouselState, getCarouselOpacity } from '../../hooks/useCarouselState';
import { HeartIcon } from '@/components/Icons';
import { AnimatedButton } from '../../components/Button';
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
        <Text style={styles.arrowText}>‹</Text>
      </AnimatedButton>
      <AnimatedButton
        style={[styles.arrowBtn, styles.rightArrow]}
        onPress={onNext}
      >
        <Text style={styles.arrowText}>›</Text>
      </AnimatedButton>
    </>
  );
}

function CarouselDots({ banners, currentIndex, handleSwitch }) {
  if (banners.length <= 1) return null;
  return (
    <View style={styles.dotsContainer}>
      {banners.map((_, index) => (
        <AnimatedButton
          key={index}
          style={[
            styles.dot,
            index === currentIndex ? styles.dotActive : styles.dotInactive,
          ]}
          onPress={() => handleSwitch(index)}
          hitSlop={{ top: 18, bottom: 18, left: 12, right: 12 }}
        />
      ))}
    </View>
  );
}

function ProductFavoriteBtn({ isWide, isDark, isFavorite, onToggleFavorite, product }) {
  if (isWide) return null;
  const overlayStyle = [
    styles.favOverlay,
    isDark ? styles.favOverlayDark : styles.favOverlayLight,
  ];
  const heartColor = isFavorite ? colors.accent : isDark ? colors.white : colors.dark;
  return (
    <AnimatedButton
      style={overlayStyle}
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

        <ProductBadges isNew={product?.isNew} discountPercent={product?.discountPercent} containerStyle={{ top: 12, left: 12, zIndex: 20 }} />

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
