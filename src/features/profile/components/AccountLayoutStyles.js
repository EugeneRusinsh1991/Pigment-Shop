import { StyleSheet } from 'react-native';
import { layout } from '../../../theme/tokens';
import commonStyles from '../../../theme/commonStyles';

const styles = StyleSheet.create({
  container: commonStyles.container,
  containerDark: commonStyles.containerDark,
  containerLight: commonStyles.containerLight,
  scrollContent: commonStyles.pageScrollContent,
  pageContent: commonStyles.pageContent,
  title: {
    marginBottom: layout.spacing.lg,
    textAlign: 'center',
  },
  noPaddingBottom: {
    paddingBottom: layout.spacing.none,
  },
  flex1: {
    flex: 1,
  },
  layoutWrapper: {
    width: '100%',
    gap: layout.spacing.lg,
  },
  sidebarContainer: {
    width: 260,
    flexShrink: 0,
  },
  sidebarContainerTablet: {
    width: 200,
    flexShrink: 0,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
});

export default styles;
