import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { mediaStyles } from './MediaStyles';

/**
 * WebGifRenderer
 * Renders HTML5 img element on Web for GIF playback compatibility.
 */
function WebGifRenderer({ uri, resizeMode, flatStyle, onError }) {
  return (
    <img 
      src={uri}
      style={StyleSheet.flatten([
        mediaStyles.webMedia,
        { objectFit: resizeMode === 'cover' ? 'cover' : 'contain' },
        flatStyle
      ])}
      alt="media"
      onError={onError}
    />
  );
}

/**
 * GifRenderer
 * Dispatches GIF rendering between Web and Native (fallback to React Native Image).
 */
export default function GifRenderer({ isWeb, uri, resizeMode, flatStyle, style, onError }) {
  if (isWeb) {
    return (
      <WebGifRenderer
        uri={uri}
        resizeMode={resizeMode}
        flatStyle={flatStyle}
        onError={onError}
      />
    );
  }
  return (
    <Image
      source={{ uri }}
      style={style}
      resizeMode={resizeMode}
      onError={onError}
    />
  );
}
