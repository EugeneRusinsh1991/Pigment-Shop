import { useWindowDimensions, View } from 'react-native';
import { Text } from '../../components/ui/Text/Text';
import styles from '../../theme/appStyles';
import { Link } from 'expo-router';
import HeroCarousel from '../home/components/HeroCarousel';
import { getCarouselBaseStyle } from '../home/components/HeroCarousel/carouselStyles';
import Button from '../../components/ui/Button';
import { ScrollFadeUp } from '../../components/ui/Motion';
import { colors } from '../../theme/tokens';
import { useLanguage } from '../../context/LanguageContext';

function HeroBanner({ isDark, isWide, t, isTransitionReady }) {
  const { width: windowWidth } = useWindowDimensions();
  return (
    <View style={styles.heroContainer}>
      {isTransitionReady ? (
        <HeroCarousel isDark={isDark} isWide={isWide} />
      ) : (
        <View style={[getCarouselBaseStyle(isWide, windowWidth), { backgroundColor: isDark ? colors.textDimDark : colors.borderSlateLight }]} />
      )}
      <Link href="/catalog" asChild>
        <Button
          title={t('heroBtn')}
          variant="accent"
          size="lg"
        />
      </Link>
    </View>
  );
}

function SectionTitleRow({ isDark, depth, currentLevel, t, showSectionTitle }) {
  if (!showSectionTitle) return null;
  const tc = isDark ? styles.textDark : styles.textLight;
  const sectionLabel = depth === 0 ? t('categories') : currentLevel.label;
  return (
    <ScrollFadeUp style={styles.sectionTitleRow}>
      <Text variant="label" style={[styles.sectionTitle, tc]}>{sectionLabel}</Text>
    </ScrollFadeUp>
  );
}

export default function CatalogHeader({ isDark, isWide, depth, currentLevel, crumbs, t: propT, onCrumbPress, showSectionTitle = true, showHeroBanner = true, isTransitionReady = true }) {
  const { t: langT } = useLanguage();
  const t = typeof propT === 'function' ? propT : langT;

  return (
    <>
      {depth === 0 && showHeroBanner && <HeroBanner isDark={isDark} isWide={isWide} t={t} isTransitionReady={isTransitionReady} />}
      <SectionTitleRow isDark={isDark} depth={depth} currentLevel={currentLevel} t={t} showSectionTitle={showSectionTitle} />
    </>
  );
}
