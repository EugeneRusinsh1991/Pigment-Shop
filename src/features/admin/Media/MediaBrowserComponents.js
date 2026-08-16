import { AlertIcon, CrossIcon, RefreshIcon } from '@/components/Icons';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { Text, Heading } from '@/components/ui/Text';
import { useLanguage } from '../../../context/LanguageContext';
import { MEDIA_CATEGORY } from '../../../media';
import EmptyState from '@/components/domain/DataTable/EmptyState';
import MediaBrowserItem from './MediaBrowserItem';
import styles from './MediaBrowserStyles';
import { Button } from '@/components/ui/Button';
import { ChipButton } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/Button';
import { colors } from '../../../theme/tokens';

const TABS = [
  { key: MEDIA_CATEGORY.IMAGES, label: 'Images' },
  { key: MEDIA_CATEGORY.GIFS, label: 'GIFs' },
  { key: MEDIA_CATEGORY.VIDEOS, label: 'Videos' },
];

export function OutdatedBanner() {
  const { t } = useLanguage();
  return (
    <View style={styles.outdatedBanner}>
      <Text style={styles.outdatedBannerTitle} variant="subtitle2">
        <AlertIcon color={colors.dangerMid} size={14} style={styles.alertIcon} /> Media index not generated
      </Text>
      <Text style={styles.outdatedBannerText} variant="caption">
        {t('adminMediaGeneratePrefix')}
        <Text style={styles.outdatedBannerCode} variant="code">npm run generate-media</Text>
        {t('adminMediaGenerateSuffix')}
      </Text>
    </View>
  );
}

export function BrowserHeader({ onRefresh, onClose, loading }) {
  const { t } = useLanguage();
  return (
    <View style={styles.header}>
      <Heading level={3} style={styles.title}>{t('adminMediaLibrary')}</Heading>
      <Button
        title="Refresh"
        leftIcon={<RefreshIcon color={colors.purpleStrong} size={12} style={styles.refreshIcon} />}
        onPress={onRefresh}
        variant="secondary"
        size="sm"
        loading={loading}
        disabled={loading}
      />
      <IconButton
        icon={<CrossIcon color={colors.slateText} size={14} />}
        onPress={onClose}
        variant="transparent"
        size="sm"
      />
    </View>
  );
}

export function BrowserTabs({ activeTab, onTabChange }) {
  return (
    <View style={styles.tabs}>
      {TABS.map((tab) => (
        <ChipButton
          key={tab.key}
          label={tab.label}
          active={activeTab === tab.key}
          variant="rect"
          onPress={() => onTabChange(tab.key)}
        />
      ))}
    </View>
  );
}

export function BrowserBody({ currentItems, manifestReady, selectedItem, onSelectItem, loading }) {
  if (loading) {
    return (
      <View style={[styles.body, { minHeight: 220, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.purpleStrong} />
        <Text style={{ marginTop: 12, color: colors.secondaryLightText }} variant="caption">
          Fetching live Cloudinary media...
        </Text>
      </View>
    );
  }

  if (currentItems.length === 0) {
    return (
      <ScrollView style={styles.body}>
        <EmptyState>
          {manifestReady
            ? 'No assets found in Cloudinary for this category.'
            : 'Run npm run generate-media or fetch-media-pool to sync assets.'}
        </EmptyState>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.body}>
      <View style={styles.grid}>
        {currentItems.map((item) => (
          <MediaBrowserItem
            key={item.id}
            item={item}
            selected={selectedItem?.id === item.id}
            onSelect={onSelectItem}
          />
        ))}
      </View>
    </ScrollView>
  );
}

export function BrowserFooter({ selectedItem, onClose, onConfirm }) {
  return (
    <View style={styles.footer}>
      <Button
        title="Cancel"
        onPress={onClose}
        variant="secondary"
        size="md"
      />
      <Button
        title="Select"
        onPress={onConfirm}
        disabled={!selectedItem}
        variant="primary"
        size="md"
      />
    </View>
  );
}
