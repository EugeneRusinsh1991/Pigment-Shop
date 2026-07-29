import { AlertIcon, CrossIcon, RefreshIcon } from '@/components/Icons';
import { ScrollView, View } from 'react-native';
import { Text, Heading } from '@/components/ui/Text';
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
  return (
    <View style={styles.outdatedBanner}>
      <Text style={styles.outdatedBannerTitle} size={13} weight="bold">
        <AlertIcon color={colors.dangerMid} size={14} style={styles.alertIcon} /> Media index not generated
      </Text>
      <Text style={styles.outdatedBannerText} size={12}>
        {'Run '}
        <Text style={styles.outdatedBannerCode} size={12} weight="bold">npm run generate-media</Text>
        {' in your terminal, then press Refresh to see your local files.'}
      </Text>
    </View>
  );
}

export function BrowserHeader({ onRefresh, onClose }) {
  return (
    <View style={styles.header}>
      <Heading level={3} style={styles.title}>Media Library</Heading>
      <Button
        title="Refresh"
        leftIcon={<RefreshIcon color={colors.purpleStrong} size={12} style={styles.refreshIcon} />}
        onPress={onRefresh}
        variant="secondary"
        size="sm"
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

export function BrowserBody({ currentItems, manifestReady, selectedItem, onSelectItem }) {
  if (currentItems.length === 0) {
    return (
      <ScrollView style={styles.body}>
        <EmptyState>
          {manifestReady
            ? 'No assets in this category.'
            : 'Run npm run generate-media to index your files.'}
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
