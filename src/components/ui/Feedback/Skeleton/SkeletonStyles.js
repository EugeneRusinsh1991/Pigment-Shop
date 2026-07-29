import { StyleSheet } from 'react-native';
import { layout } from '../../../../theme/tokens';

export const styles = StyleSheet.create({
  container: {
    gap: layout.spacing.md,
    paddingVertical: layout.spacing.md,
  },
  skeleton: {
    overflow: 'hidden',
  },
  catalogGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: layout.spacing.lg,
    padding: layout.spacing.lg,
    width: '100%',
  },
  catalogItem: {
    marginBottom: layout.spacing.lg,
  },
  catalogCardItem: {
    marginBottom: layout.spacing.sm,
  },
  catalogTitleItem: {
    marginBottom: layout.spacing.xs,
  },
  productDetailContainer: {
    flexDirection: 'row',
    gap: layout.spacing.xl,
    padding: layout.spacing.xl,
    flexWrap: 'wrap',
    width: '100%',
  },
  productDetailInfo: {
    flex: 1,
    minWidth: 260,
    gap: layout.spacing.md,
  },
  productDetailButton: {
    marginTop: layout.spacing.md,
  },
  profileContainer: {
    padding: layout.spacing.xl,
    gap: layout.spacing.lg,
    maxWidth: 580,
    alignSelf: 'center',
    width: '100%',
  },
  profileHeaderItem: {
    marginBottom: layout.spacing.md,
  },
  profileButtonItem: {
    marginTop: layout.spacing.md,
  },
});

