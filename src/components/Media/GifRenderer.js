import React from 'react';
import { Image } from 'react-native';
import { mediaStyles } from './MediaStyles';

/**
 * WebGifRenderer
 * Renders HTML5 img element on Web for GIF playback compatibility.
 */
function WebGifRenderer({ uri, resizeMode, flatStyle }) {
  return (
    <img 
      src={uri}
      style={{
        ...mediaStyles.webMedia,
        objectFit: resizeMode === 'cover' ? 'cover' : 'contain',
        ...flatStyle
      }}
      alt="media"
    />
  );
}

/**
 * GifRenderer
 * Dispatches GIF rendering between Web and Native (fallback to React Native Image).
 */
export default function GifRenderer({ isWeb, uri, resizeMode, flatStyle, style }) {
  if (isWeb) {
    return (
      <WebGifRenderer
        uri={uri}
        resizeMode={resizeMode}
        flatStyle={flatStyle}
      />
    );
  }
  return (
    <Image
      source={{ uri }}
      style={style}
      resizeMode={resizeMode}
    />
  );
}
