import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import useCardDimensions from '../hooks/useCardDimensions';
import { HeartIcon } from './Icons';
import styles from './ProductCardStyles';

const PRODUCT_PLACEHOLDER = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop';

const getCardWidth = (overrideWidth, hookWidth) => overrideWidth || hookWidth;
const getImageUri = (image) => image || PRODUCT_PLACEHOLDER;
const getBrand = (brand, fallback) => brand || fallback;

const getTitle = (label, lang) => {
  if (label && typeof label === 'object') {
    return label[lang] || '';
  }
  return label || '';
};

const getThemedStyles = (isDark, imgHeight) => {
  const ic = (dark, light) => isDark ? dark : light;
  return {
    prodCard: [styles.prodCard, ic(styles.prodCardDark, styles.prodCardLight)],
    imageContainer: [styles.imageContainer, ic(styles.imageContainerDark, styles.imageContainerLight), { height: imgHeight }],
    prodTitle: [styles.prodTitle, ic(styles.prodTitleDark, styles.prodTitleLight)],
    prodInfo: [styles.prodInfo, ic(styles.prodInfoDark, styles.prodInfoLight)],
    heartColor: isDark ? '#FFFFFF' : '#1C1C1C',
    favStyle: isDark ? styles.favBtnDark : styles.favBtnLight
  };
};

const getHasBadges = (isNew, discountPercent) => {
  return isNew || discountPercent > 0;
};

function ProductBadges({ isNew, discountPercent }) {
  const { t } = useTheme();
  if (!getHasBadges(isNew, discountPercent)) return null;
  return (
    <View style={styles.badgeContainer}>
      {isNew ? (
        <View style={styles.newBadge}>
          <Text style={styles.badgeText}>{t('badgeNew')}</Text>
        </View>
      ) : null}
      {discountPercent > 0 ? (
        <View style={styles.discountBadge}>
          <Text style={styles.discountBadgeText}>-{discountPercent}%</Text>
        </View>
      ) : null}
    </View>
  );
}

function ProductPrice({ price, discountPercent, isDark }) {
  const pStyle = [styles.priceText, isDark ? styles.priceTextDark : styles.priceTextLight];

  if (discountPercent > 0) {
    const finalPrice = Math.round(price * (1 - discountPercent / 100));
    return (
      <View style={styles.priceRow}>
        <Text style={pStyle}>${finalPrice.toLocaleString()}</Text>
        <Text style={styles.originalPriceText}>${price.toLocaleString()}</Text>
      </View>
    );
  }

  return <Text style={pStyle}>${price.toLocaleString()}</Text>;
}

export default function ProductCard({ item, onPress, isDark, depth = 1, isFavorite, onToggleFavorite, overrideWidth }) {
  const { t, lang } = useTheme();
  const { cardWidth: hookWidth, cardHeight, imgContainerHeight, cardMargin } = useCardDimensions(depth, true);
  
  const cardWidth = getCardWidth(overrideWidth, hookWidth);
  const imageUri = getImageUri(item.image);
  const themed = getThemedStyles(isDark, imgContainerHeight);
  const heartColor = isFavorite ? '#E87A8E' : themed.heartColor;
  const brand = getBrand(item.brand, t('brandFallback'));
  const title = getTitle(item.label, lang);

  const handleFavPress = (e) => {
    try {
      if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
    } catch (err) {
      // Defensive: ignore if event isn't provided or stopPropagation isn't available
    }
    if (onToggleFavorite) onToggleFavorite(item);
  };

  return (
    <TouchableOpacity
      style={[
        themed.prodCard, 
        { width: cardWidth, minWidth: cardWidth, height: cardHeight, flex: 0, flexGrow: 0, margin: cardMargin }
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={themed.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.prodImage} resizeMode="cover" />
        <ProductBadges isNew={item.isNew} discountPercent={item.discountPercent} />
        <TouchableOpacity
          style={[styles.favBtn, themed.favStyle]}
          onPress={handleFavPress}
        >
          <HeartIcon filled={isFavorite} color={heartColor} size={14} />
        </TouchableOpacity>
      </View>
      <View style={themed.prodInfo}>
        <Text style={styles.brandText}>{brand}</Text>
        <Text style={themed.prodTitle} numberOfLines={2}>
          {title}
        </Text>
        <ProductPrice price={item.price} discountPercent={item.discountPercent} isDark={isDark} />
      </View>
    </TouchableOpacity>
  );
}
