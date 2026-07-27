import { StyleSheet } from 'react-native';
import { layout } from '../../../theme/tokens';

export const sharedLayoutWrapperStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    minHeight: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    minHeight: layout.spacing.none,
    width: '100%',
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  footerRegion: {
    width: '100%',
    alignSelf: 'stretch',
    flexShrink: 0,
    paddingTop: layout.spacing.lg,
    paddingBottom: layout.spacing.md,
  },
  footerInner: {
    width: '100%',
    alignSelf: 'stretch',
  },
});

export default sharedLayoutWrapperStyles;
