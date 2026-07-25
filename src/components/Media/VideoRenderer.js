import { useEffect, useRef } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { colors } from '../../theme/tokens';

let ExpoVideo = null;
try {
  ExpoVideo = require('expo-av').Video;
} catch (e) {
  try {
    ExpoVideo = require('expo-video').VideoView;
  } catch (err) {
    ExpoVideo = null;
  }
}

/**
 * WebVideoRenderer
 * Renders HTML5 video element on Web.
 */
function WebVideoRenderer({ uri, resizeMode, flatStyle, autoPlay, loop, muted, preload = 'auto', onReady, shouldPlay, onProgress }) {
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (typeof onProgress === 'function' && video.duration) {
        onProgress(video.currentTime / video.duration);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [uri, onProgress]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!shouldPlay) {
      video.pause();
      return;
    }

    const restartPlayback = async () => {
      try {
        video.pause();
        video.currentTime = 0;
        await video.play();
      } catch (error) {
        // Ignore autoplay restrictions and let the next activation retry.
      }
    };

    restartPlayback();
  }, [uri, shouldPlay]);

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
      autoPlay={shouldPlay && autoPlay}
      loop={loop}
      muted={muted}
      playsInline
      preload={preload}
    />
  );
}

/**
 * NativeVideoRenderer
 * Renders native video player using expo-av/expo-video with thumbnail fallback.
 */
function NativeVideoRenderer({ uri, style, resizeMode, autoPlay, loop, muted, onReady, shouldPlay, onProgress }) {
  if (ExpoVideo) {
    return (
      <ExpoVideo
        source={{ uri }}
        style={style}
        resizeMode={resizeMode === 'cover' ? 'cover' : 'contain'}
        shouldPlay={shouldPlay && autoPlay}
        isLooping={loop}
        isMuted={muted}
        onLoad={onReady}
        onPlaybackStatusUpdate={(status) => {
          if (status?.isLoaded && status?.durationMillis && typeof onProgress === 'function') {
            onProgress(status.positionMillis / status.durationMillis);
          }
        }}
        useNativeControls={false}
      />
    );
  }

  return (
    <View style={[style, styles.nativeContainer]}>
      <Image source={{ uri }} style={StyleSheet.absoluteFill} resizeMode={resizeMode} />
      <View style={styles.playOverlay}>
        <View style={styles.playTriangle} />
      </View>
    </View>
  );
}

/**
 * VideoRenderer
 * Dispatches video rendering between Web and Native.
 */
export default function VideoRenderer({ isWeb, uri, resizeMode, flatStyle, autoPlay, loop, muted, style, preload, onReady, shouldPlay, onProgress }) {
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
        shouldPlay={shouldPlay}
        onProgress={onProgress}
      />
    );
  }
  return (
    <NativeVideoRenderer
      uri={uri}
      style={style}
      resizeMode={resizeMode}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      onReady={onReady}
      shouldPlay={shouldPlay}
      onProgress={onProgress}
    />
  );
}

const styles = StyleSheet.create({
  nativeContainer: {
    backgroundColor: colors.black,
    alignItems: 'center',
    justify: 'center',
    overflow: 'hidden',
  },
  playOverlay: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justify: 'center',
  },
  playTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 16,
    borderRightWidth: 0,
    borderBottomWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: colors.white,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginLeft: 4,
  },
});
