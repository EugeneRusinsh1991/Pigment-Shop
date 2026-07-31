/**
 * ContactPageStyles - legacy styles retained for backward compatibility.
 * New contact page layout uses ContactInfoSection, ContactFormSection, ContactAuxiliarySection.
 * This file is preserved to avoid breaking any residual import references.
 */
import { StyleSheet } from 'react-native';
import { layout } from '../../theme/tokens';

export default StyleSheet.create({
  flex1: {
    flex: 1,
  },
  contentPadding: {
    paddingBottom: layout.spacing.xl,
  },
  svgInline: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
});
