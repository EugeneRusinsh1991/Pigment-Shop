/**
 * MediaBrowserItem.js
 *
 * Renders a single selectable media asset tile inside the MediaBrowser.
 */
import { View } from 'react-native';
import { Text } from '../../Text';
import { resolveMediaUrl } from '../../../media';
import MediaRenderer from '../../Media/MediaRenderer';
import { AnimatedButton, IconButton } from '../../Button';
import { TrashIcon } from '@/components/Icons';
import styles from './MediaBrowserStyles';

export default function MediaBrowserItem({ item, selected, onSelect, onDelete }) {
  const uri = resolveMediaUrl(item.path);

  return (
    <AnimatedButton
      style={[styles.itemBtn, selected && styles.itemBtnSelected]}
      onPress={() => onSelect(item)}
    >
      <View style={{ width: '100%', height: 80, overflow: 'hidden' }}>
        <MediaRenderer uri={uri} style={styles.itemThumb} resizeMode="cover" />
      </View>
      <Text style={styles.itemName} size={10} numberOfLines={1}>{item.name}</Text>
      {onDelete && (
        <IconButton
          icon={<TrashIcon size={12} />}
          onPress={(e) => {
            e?.stopPropagation?.();
            onDelete(item);
          }}
          size="sm"
          variant="transparent"
          style={styles.removeBtn}
        />
      )}
    </AnimatedButton>
  );
}

