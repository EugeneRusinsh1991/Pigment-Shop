import { useEffect, useRef } from 'react';
import { View } from 'react-native';

/**
 * WebVideoRenderer
 * Renders HTML5 video element on Web.
 */
function WebVideoRenderer({ uri, resizeMode, flatStyle, autoPlay, loop, muted, preload = 'auto', onReady }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (typeof onReady === 'function') {
      video.addEventListener('canplay', onReady);
      video.addEventListener('loadeddata', onReady);
      return () => {
        video.removeEventListener('canplay', onReady);
        video.removeEventListener('loadeddata', onReady);
      };
    }
  }, [uri, onReady]);

  return (
    <video
      ref={videoRef}
      src={uri}
      style={{
        width: '100%',
        height: '100%',
        objectFit: resizeMode === 'cover' ? 'cover' : 'contain',
        ...flatStyle
      }}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline
      preload={preload}
    />
  );
}

/**
 * NativeVideoPlaceholder
 * Renders a fallback play button placeholder for native platforms.
 */
function NativeVideoPlaceholder({ style }) {
  return (
    <View style={[style, { backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' }]}>
      <View style={{
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 15,
        borderRightWidth: 0,
        borderBottomWidth: 10,
        borderTopWidth: 10,
        borderLeftColor: '#9CA3AF',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        marginLeft: 5
      }} />
    </View>
  );
}

/**
 * VideoRenderer
 * Dispatches video rendering between Web and Native.
 */
export default function VideoRenderer({ isWeb, uri, resizeMode, flatStyle, autoPlay, loop, muted, style, preload, onReady }) {
  if (isWeb) {
    return (
      <WebVideoRenderer
        uri={uri}
        resizeMode={resizeMode}
        flatStyle={flatStyle}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        preload={preload}
        onReady={onReady}
      />
    );
  }
  return <NativeVideoPlaceholder style={style} />;
}
