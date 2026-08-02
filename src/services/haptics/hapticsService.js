import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import { hapticTokens } from '../../theme/haptics';

class HapticsService {
  constructor() {
    this.isHapticsEnabled = true;
  }

  setHapticsEnabled(enabled) {
    this.isHapticsEnabled = Boolean(enabled);
  }

  getHapticsEnabled() {
    return this.isHapticsEnabled;
  }

  trigger(type = hapticTokens.selection) {
    if (!this.isHapticsEnabled || Platform.OS === 'web' || !type) return;

    try {
      switch (type) {
        case hapticTokens.selection:
          Haptics.selectionAsync().catch(() => {});
          break;
        case hapticTokens.impactLight:
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
          break;
        case hapticTokens.impactMedium:
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
          break;
        case hapticTokens.success:
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
          break;
        case hapticTokens.warning:
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
          break;
        case hapticTokens.error:
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
          break;
        default:
          break;
      }
    } catch (_) {
      // Gracefully catch hardware or platform unsupported errors
    }
  }
}

export const hapticsService = new HapticsService();
