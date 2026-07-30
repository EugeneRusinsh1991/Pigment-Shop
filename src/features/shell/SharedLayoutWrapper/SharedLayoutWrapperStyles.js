import { Platform, StyleSheet } from 'react-native';
import { layout } from '../../../theme/tokens';

export const sharedLayoutWrapperStyles = StyleSheet.create({
  scrollRoot: {
    flexGrow: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    flexShrink: 0,
    width: '100%',
    alignSelf: 'stretch',
  },
  footerRegion: {
    width: '100%',
    alignSelf: 'stretch',
    flexShrink: 0,
  },
  footerInner: {
    width: '100%',
    alignSelf: 'stretch',
  },
});
