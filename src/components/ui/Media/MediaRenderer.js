import { useEffect } from 'react';
import { Image, Platform, StyleSheet } from 'react-native';
import GifRenderer from './GifRenderer';
import { getMediaType } from '../../../media/MediaTypeDetector';
import VideoRenderer from './VideoRenderer';

/**
 * MediaRenderer
 * 
 * A unified component that renders images, GIFs, and videos.
 * - Uses <video> on Web for .mp4/.webm (via VideoRenderer).
 * - Uses <img> on Web for .gif to avoid RNW caching/playback issues (via GifRenderer).
 * - Uses <Image> otherwise.
 */
export default function MediaRenderer({ uri, style, resizeMode = 'cover', autoPlay = true, loop = true, muted = true, preload = 'auto', onReady, isActive = false, onProgress }) {
  const type = getMediaType(uri);
  if (type === 'none') return null;

  const isWeb = Platform.OS === 'web';
  const flatStyle = StyleSheet.flatten(style) || {};

  useEffect(() => {
    if (type === 'video' || typeof onReady !== 'function') return;
    onReady();
  }, [type, uri, onReady]);

  if (type === 'video') {
    return (
      <VideoRenderer
        isWeb={isWeb}
        uri={uri}
        resizeMode={resizeMode}
        flatStyle={flatStyle}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        preload={preload}
        style={[style]}
        onReady={onReady}
        shouldPlay={isActive}
        onProgress={onProgress}
      />
    );
  }

  if (type === 'gif') {
    return (
      <GifRenderer
        isWeb={isWeb}
        uri={uri}
        resizeMode={resizeMode}
        flatStyle={flatStyle}
        style={[style]}
      />
    );
  }

  return (
    <Image
      source={{ uri }}
      style={[style]}
      resizeMode={resizeMode}
    />
  );
}
