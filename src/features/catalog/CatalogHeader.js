import { Text, View } from 'react-native';
import styles from '../../AppStyles';
import { Link } from 'expo-router';
import HeroCarousel from '../../components/HeroCarousel';
import Button from '../../components/Button';
import ScrollFadeUp from '../../components/ScrollFadeUp';

function HeroBanner({ isDark, isWide, t, isTransitionReady }) {
  return (
    <View style={styles.heroContainer}>
      {isTransitionReady ? (
        <HeroCarousel isDark={isDark} isWide={isWide} />
      ) : (
        <View style={[styles.heroRight, isWide ? styles.heroRightWide : styles.heroRightMobile, { backgroundColor: isDark ? '#1F2937' : '#E5E7EB' }]} />
      )}
      <Link href="/catalog" asChild>
        <Button
          title={t.heroBtn}
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
  const sectionLabel = depth === 0 ? t.categories : currentLevel.label;
  return (
    <ScrollFadeUp style={styles.sectionTitleRow}>
      <Text style={[styles.sectionTitle, tc]}>{sectionLabel}</Text>
    </ScrollFadeUp>
  );
}

export default function CatalogHeader({ isDark, isWide, depth, currentLevel, crumbs, t, onCrumbPress, showSectionTitle = true, showHeroBanner = true, isTransitionReady = true }) {
  return (
    <>
      {depth === 0 && showHeroBanner && <HeroBanner isDark={isDark} isWide={isWide} t={t} isTransitionReady={isTransitionReady} />}
      <SectionTitleRow isDark={isDark} depth={depth} currentLevel={currentLevel} t={t} showSectionTitle={showSectionTitle} />
    </>
  );
}
