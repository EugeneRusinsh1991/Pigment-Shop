import { AlertIcon, CrossIcon, RefreshIcon } from '@/components/Icons';
import { ScrollView, Text, View } from 'react-native';
import { MEDIA_CATEGORY } from '../../../media';
import EmptyState from '../../DataTable/EmptyState';
import MediaBrowserItem from './MediaBrowserItem';
import styles from './MediaBrowserStyles';
import { Button } from '../../Button';
import { ChipButton } from '../../Button';
import { IconButton } from '../../Button';
import { colors } from '../../../theme/tokens';

const TABS = [
  { key: MEDIA_CATEGORY.IMAGES, label: 'Images' },
  { key: MEDIA_CATEGORY.GIFS, label: 'GIFs' },
  { key: MEDIA_CATEGORY.VIDEOS, label: 'Videos' },
];

export function OutdatedBanner() {
  return (
    <View style={styles.outdatedBanner}>
      <Text style={styles.outdatedBannerTitle}>
        <AlertIcon color="#DC2626" size={14} style={{ marginRight: 6 }} /> Media index not generated
      </Text>
      <Text style={styles.outdatedBannerText}>
        {'Run '}
        <Text style={styles.outdatedBannerCode}>npm run generate-media</Text>
        {' in your terminal, then press Refresh to see your local files.'}
      </Text>
    </View>
  );
}

export function BrowserHeader({ onRefresh, onClose }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Media Library</Text>
      <Button
        title="Refresh"
        leftIcon={<RefreshIcon color="#4f46e5" size={12} style={{ marginRight: 4 }} />}
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
