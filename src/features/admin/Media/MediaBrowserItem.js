/**
 * MediaBrowserItem.js
 *
 * Renders a single selectable media asset tile inside the MediaBrowser.
 */
import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { resolveMediaUrl } from '../../../media';
import MediaRenderer from '@/components/ui/Media/MediaRenderer';
import { AnimatedButton, IconButton } from '@/components/ui/Button';
import { TrashIcon } from '@/components/Icons';
import styles from './MediaBrowserStyles';
import { colors } from '../../../theme/tokens';

export default function MediaBrowserItem({ item, selected, onSelect, onDelete }) {
  const [hasError, setHasError] = useState(false);
  const rawUri = item.url || item.path || '';
  const uri = resolveMediaUrl(rawUri);

  const isVideo = item.category === 'videos' || item.type === 'video';
  const previewUri = isVideo && uri.includes('res.cloudinary.com')
    ? uri.replace(/\.(mp4|webm|mov|mkv)$/i, '.jpg')
    : uri;

  return (
    <AnimatedButton
      style={[styles.itemBtn, selected && styles.itemBtnSelected]}
      onPress={() => onSelect(item)}
    >
      <View style={styles.itemThumbContainer}>
        {hasError ? (
          <View style={styles.videoPlaceholder}>
            <Text variant="caption" style={{ color: colors.slateText, fontSize: 10 }}>Preview N/A</Text>
          </View>
        ) : (
          <MediaRenderer
            uri={previewUri}
            style={styles.itemThumb}
            resizeMode="cover"
            autoPlay={false}
            loop={false}
            muted={true}
            onError={() => setHasError(true)}
          />
        )}
      </View>
      <Text style={styles.itemName} variant="caption" numberOfLines={1}>{item.name}</Text>
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
