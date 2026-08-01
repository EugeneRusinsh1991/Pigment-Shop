import React, { useCallback } from 'react';
import { View, Animated } from 'react-native';
import { Text } from '../../components/ui/Text/Text';
import styles from './ProductPageStyles';
import MediaRenderer from '../../components/ui/Media/MediaRenderer';
import { CarouselDots } from '../../components/ui/Media';

import { useCarouselState, getCarouselOpacity } from '../../hooks/useCarouselState';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons';
import { CircularActionButton, FavoriteActionButton } from '../../components/ui/Button';
import ProductBadges from './ProductBadges';
import ProductThumbnails from './ProductThumbnails';
import { colors } from '../../theme/tokens';

import { PRODUCT_PLACEHOLDER } from '../../constants';
import { resolveMediaUrl } from '../../media';

const getRawProductImages = (product) => {
  const rawList = Array.isArray(product?.images) && product.images.length > 0
    ? product.images
    : (typeof product?.image === 'string' && product.image.trim().length > 0 ? [product.image] : []);

  const resolvedValidImages = rawList
    .map((img) => (typeof img === 'string' ? resolveMediaUrl(img) : ''))
    .filter((resolved) => typeof resolved === 'string' && (resolved.startsWith('http://') || resolved.startsWith('https://') || resolved.startsWith('data:')));

  if (resolvedValidImages.length > 0) {
    return resolvedValidImages.slice(0, 3);
  }

  return [PRODUCT_PLACEHOLDER, PRODUCT_PLACEHOLDER, PRODUCT_PLACEHOLDER];
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
      <CircularActionButton
        icon={<ChevronLeftIcon color={colors.white} size={18} />}
        style={[styles.arrowBtn, styles.leftArrow]}
        onPress={onPrev}
        size="xl"
      />
      <CircularActionButton
        icon={<ChevronRightIcon color={colors.white} size={18} />}
        style={[styles.arrowBtn, styles.rightArrow]}
        onPress={onNext}
        size="xl"
      />
    </>
  );
}




function ProductFavoriteBtn({ isWide, isDark, isFavorite, onToggleFavorite, product }) {
  if (isWide) return null;
  return (
    <FavoriteActionButton
      style={[styles.favOverlay, isDark ? styles.favOverlayDark : styles.favOverlayLight]}
      isFavorite={isFavorite}
      onToggle={() => onToggleFavorite && onToggleFavorite(product)}
      isDark={isDark}
      size="lg"
      variant="transparent"
    />
  );
}

export function ProductImagePanel({ product, isWide, isFavorite, onToggleFavorite, isDark }) {
  const images = getRawProductImages(product);
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
      <View style={[styles.carouselContainer, isWide && styles.carouselContainerWide]}>
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

      <ProductThumbnails
        images={images}
        currentIndex={currentIndex}
        onSelectImage={handleSwitchWithTransition}
        isDark={isDark}
      />
    </View>
  );
}
