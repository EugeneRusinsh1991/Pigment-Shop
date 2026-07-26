import { StyleSheet } from 'react-native';

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
    minHeight: 0,
    width: '100%',
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  footerRegion: {
    width: '100%',
    alignSelf: 'stretch',
    flexShrink: 0,
    paddingTop: 16,
    paddingBottom: 12,
  },
  footerInner: {
    width: '100%',
    alignSelf: 'stretch',
  },
});

export default sharedLayoutWrapperStyles;
