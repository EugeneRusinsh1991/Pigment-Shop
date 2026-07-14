import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import styles from './ProductPageStyles';
import { MediaRenderer } from '../../media';
import { useCarouselState } from '../../hooks/useCarouselState';
import { HeartIcon } from '../Icons';

const PRODUCT_PLACEHOLDER = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop';

const getImages = (product) => {
  if (product?.images && product.images.length > 0) {
    return product.images;
  }
  const mainImage = product?.image || PRODUCT_PLACEHOLDER;
  return [mainImage, PRODUCT_PLACEHOLDER, PRODUCT_PLACEHOLDER];
};

function StaticImage({ uri }) {
  if (!uri) return null;
  return (
    <View style={styles.imageFill}>
      <MediaRenderer uri={uri} style={styles.imageFill} resizeMode="cover" />
    </View>
  );
}

function FadeImage({ active, uri, fadeAnim }) {
  if (!active || !uri) return null;
  return (
    <Animated.View style={[styles.imageFill, { opacity: fadeAnim }]}>
      <MediaRenderer uri={uri} style={styles.imageFill} resizeMode="cover" />
    </Animated.View>
  );
}

function CarouselArrows({ show, onPrev, onNext }) {
  if (!show) return null;
  return (
    <>
      <TouchableOpacity
        style={[styles.arrowBtn, styles.leftArrow]}
        onPress={onPrev}
        activeOpacity={0.7}
      >
        <Text style={styles.arrowText}>‹</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.arrowBtn, styles.rightArrow]}
        onPress={onNext}
        activeOpacity={0.7}
      >
        <Text style={styles.arrowText}>›</Text>
      </TouchableOpacity>
    </>
  );
}

function CarouselDots({ banners, currentIndex, handleSwitch }) {
  if (banners.length <= 1) return null;
  return (
    <View style={styles.dotsContainer}>
      {banners.map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dot,
            index === currentIndex ? styles.dotActive : styles.dotInactive,
          ]}
          onPress={() => handleSwitch(index)}
          activeOpacity={0.7}
        />
      ))}
    </View>
  );
}

export function ProductImagePanel({ product, isWide, isFavorite, onToggleFavorite, isDark }) {
  const images = getImages(product);
  const { currentIndex, prevIndex, fadeAnim, handleSwitch } = useCarouselState(images, 10000);

  const activeImage = images[currentIndex];
  const prevImage = images[prevIndex];
  const hasMultiple = images.length > 1;

  const handlePrev = () => handleSwitch((currentIndex - 1 + images.length) % images.length);
  const handleNext = () => handleSwitch((currentIndex + 1) % images.length);

  return (
    <View style={[styles.imageArea, isWide && styles.imageAreaWide]}>
      <View style={styles.carouselContainer}>
        <StaticImage uri={prevImage} />

        <FadeImage
          active={currentIndex !== prevIndex}
          uri={activeImage}
          fadeAnim={fadeAnim}
        />

        <CarouselArrows
          show={hasMultiple}
          onPrev={handlePrev}
          onNext={handleNext}
        />

        <CarouselDots
          banners={images}
          currentIndex={currentIndex}
          handleSwitch={handleSwitch}
        />

        {!isWide && (
          <TouchableOpacity
            style={[styles.favOverlay, isDark ? styles.favOverlayDark : styles.favOverlayLight]}
            onPress={() => onToggleFavorite && onToggleFavorite(product)}
            activeOpacity={0.8}
          >
            <HeartIcon filled={isFavorite} color={isFavorite ? '#E31B23' : (isDark ? '#FFFFFF' : '#1C1C1C')} size={16} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
