import { AlertIcon, CrossIcon, RefreshIcon } from '@/components/Icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MEDIA_CATEGORY } from '../../../media';
import EmptyState from '../../DataTable/EmptyState';
import MediaBrowserItem from './MediaBrowserItem';
import styles from './MediaBrowserStyles';

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
      <TouchableOpacity style={[styles.refreshBtn, { flexDirection: 'row', alignItems: 'center' }]} onPress={onRefresh} activeOpacity={0.8}>
        <RefreshIcon color="#4f46e5" size={12} style={{ marginRight: 4 }} />
        <Text style={styles.refreshBtnText}>Refresh</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose} style={{ padding: 4 }}>
        <CrossIcon color="#475569" size={14} />
      </TouchableOpacity>
    </View>
  );
}

export function BrowserTabs({ activeTab, onTabChange }) {
  return (
    <View style={styles.tabs}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.tabActive]}
          onPress={() => onTabChange(tab.key)}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
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
      <TouchableOpacity style={styles.cancelBtn} onPress={onClose} activeOpacity={0.8}>
        <Text style={styles.cancelBtnText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.selectBtn, !selectedItem && styles.selectBtnDisabled]}
        onPress={onConfirm}
        disabled={!selectedItem}
        activeOpacity={0.8}
      >
        <Text style={styles.selectBtnText}>Select</Text>
      </TouchableOpacity>
    </View>
  );
}
