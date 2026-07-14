import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../AppStyles';
import HeroCarousel from './HeroCarousel';

function HeroBanner({ isDark, isWide, t, onCatalogPress }) {
  return (
    <View style={styles.heroContainer}>
      <Text style={styles.heroBadge}>{t.heroBadge}</Text>
      <HeroCarousel isDark={isDark} isWide={isWide} />
      <TouchableOpacity style={styles.heroBtn} onPress={onCatalogPress}>
        <Text style={styles.heroBtnText}>{t.heroBtn}</Text>
      </TouchableOpacity>
    </View>
  );
}

function SectionTitleRow({ isDark, depth, currentLevel, t, showSectionTitle }) {
  if (!showSectionTitle) return null;
  const tc = isDark ? styles.textDark : styles.textLight;
  const sectionLabel = depth === 0 ? t.categories : currentLevel.label;
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={[styles.sectionTitle, tc]}>{sectionLabel}</Text>
    </View>
  );
}

export default function CatalogHeader({ isDark, isWide, depth, currentLevel, crumbs, t, onCrumbPress, onCardPress, onCatalogPress, showSectionTitle = true, showHeroBanner = true }) {
  return (
    <>
      {depth === 0 && showHeroBanner && <HeroBanner isDark={isDark} isWide={isWide} t={t} onCatalogPress={onCatalogPress} />}
      <SectionTitleRow isDark={isDark} depth={depth} currentLevel={currentLevel} t={t} showSectionTitle={showSectionTitle} />
    </>
  );
}
