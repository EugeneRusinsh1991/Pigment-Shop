import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../AppStyles';
import HeroCarousel from './HeroCarousel';

function HeroBanner({ isDark, isWide, t, onCardPress, firstCategory }) {
  return (
    <View style={[styles.heroContainer, isWide ? styles.heroRow : styles.heroStack]}>
      <View style={styles.heroLeft}>
        <Text style={styles.heroBadge}>{t.heroBadge}</Text>
        <Text style={[styles.heroTitle, isDark ? styles.textDark : styles.textLight]}>
          {t.heroTitle}
        </Text>
        <Text style={[styles.heroSub, isDark ? styles.descDark : styles.descLight]}>
          {t.heroSub}
        </Text>
        <TouchableOpacity style={styles.heroBtn} onPress={() => firstCategory && onCardPress(firstCategory)}>
          <Text style={styles.heroBtnText}>{t.heroBtn}</Text>
        </TouchableOpacity>
      </View>
      <HeroCarousel isDark={isDark} />
    </View>
  );
}



function SectionTitleRow({ isDark, depth, currentLevel, t }) {
  const tc = isDark ? styles.textDark : styles.textLight;
  const sectionLabel = depth === 0 ? t.categories : currentLevel.label;
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={[styles.sectionTitle, tc]}>{sectionLabel}</Text>
      {depth === 0 && (
        <TouchableOpacity>
          <Text style={styles.allSectionsLink}>{t.allSections}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function CatalogHeader({ isDark, isWide, depth, currentLevel, crumbs, t, onCrumbPress, onCardPress }) {
  const firstCategory = currentLevel?.items?.[0] || null;
  return (
    <>
      {depth === 0 && <HeroBanner isDark={isDark} isWide={isWide} t={t} onCardPress={onCardPress} firstCategory={firstCategory} />}
      <SectionTitleRow isDark={isDark} depth={depth} currentLevel={currentLevel} t={t} />
    </>
  );
}
