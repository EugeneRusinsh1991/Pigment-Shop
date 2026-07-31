import React, { useMemo } from 'react';
import { View } from 'react-native';
import Card from '../../components/ui/Card/Card';
import useCardDimensions from '../../hooks/useCardDimensions';
import { layout } from '../../theme/tokens';
import { getThemedValue } from '../../context/ThemeContext';
import styles from './ProductCardStyles';
import { SkeletonItem } from '../../components/ui/Feedback/Skeleton/SkeletonLoader';

const getThemedStyles = (isDark, imgHeight) => {
  const ic = (dark, light) => getThemedValue(isDark, dark, light);
  return {
    imageContainer: [styles.imageContainer, ic(styles.imageContainerDark, styles.imageContainerLight), { height: imgHeight }],
    prodInfo: [styles.prodInfo, ic(styles.prodInfoDark, styles.prodInfoLight)],
  };
};

function getCardStyle(cardHeight, overrideWidth) {
  return [{ minHeight: cardHeight }, overrideWidth ? { width: overrideWidth } : null];
}

const ProductCardSkeleton = React.memo(function ProductCardSkeleton({ isDark, depth = 1, overrideWidth }) {
  const { cardHeight, imgContainerHeight } = useCardDimensions(depth);
  const themed = useMemo(() => getThemedStyles(isDark, imgContainerHeight), [isDark, imgContainerHeight]);

  return (
    <Card
      variant="grid"
      isDark={isDark}
      interactive={false}
      style={[getCardStyle(cardHeight, overrideWidth)]}
    >
      <View style={[themed.imageContainer]}>
        <SkeletonItem width="100%" height="100%" borderRadius={0} />
      </View>
      <View style={[themed.prodInfo]}>
        {/* Category Bar */}
        <SkeletonItem height={14} width="35%" borderRadius={layout.radii.sm} style={{ marginBottom: layout.spacing.xxs }} />
        {/* Title Bars */}
        <SkeletonItem height={16} width="85%" borderRadius={layout.radii.sm} style={{ marginBottom: 4 }} />
        <SkeletonItem height={16} width="60%" borderRadius={layout.radii.sm} style={{ marginBottom: layout.spacing.xs }} />
        {/* Price / Action Bar */}
        <SkeletonItem height={24} width="40%" borderRadius={layout.radii.sm} style={{ marginTop: layout.spacing.xs }} />
      </View>
    </Card>
  );
});

export default ProductCardSkeleton;
