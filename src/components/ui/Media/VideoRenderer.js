import { useEffect, useRef } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useMediaTheme } from './useMediaTheme';
import { mediaStyles } from './MediaStyles';

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
      style={StyleSheet.flatten([mediaStyles.webMedia, { objectFit: resizeMode === 'cover' ? 'cover' : 'contain' }, flatStyle])}
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
  const { overlayBg, iconColor, containerBg } = useMediaTheme();

  if (ExpoVideo) {
    return (
      <ExpoVideo
        source={{ uri }}
        style={[style]}
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
    <View style={[style, mediaStyles.nativeContainer, { backgroundColor: containerBg }]}>
      <Image source={{ uri }} style={[StyleSheet.absoluteFill]} resizeMode={resizeMode} />
      <View style={[mediaStyles.playOverlay, { backgroundColor: overlayBg }]}>
        <View style={[mediaStyles.playTriangle, { borderLeftColor: iconColor }]} />
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
      style={[style]}
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

