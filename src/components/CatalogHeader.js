import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Breadcrumb from './Breadcrumb';
import styles from '../AppStyles';

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
      <View style={styles.heroRight}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop' }}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

function CatalogBreadcrumbs({ crumbs, isDark, onCrumbPress }) {
  if (crumbs.length === 0) return null;
  return (
    <View style={[styles.breadcrumbBar, isDark ? styles.breadcrumbBarDark : styles.breadcrumbBarLight]}>
      <Breadcrumb stack={crumbs} onPress={onCrumbPress} isDark={isDark} />
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
      <CatalogBreadcrumbs crumbs={crumbs} isDark={isDark} onCrumbPress={onCrumbPress} />
      {depth === 0 && <HeroBanner isDark={isDark} isWide={isWide} t={t} onCardPress={onCardPress} firstCategory={firstCategory} />}
      <SectionTitleRow isDark={isDark} depth={depth} currentLevel={currentLevel} t={t} />
    </>
  );
}
