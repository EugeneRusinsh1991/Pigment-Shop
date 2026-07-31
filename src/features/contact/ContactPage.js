import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { ScrollFadeUp } from '../../components/ui/Motion';
import commonStyles from '../../theme/commonStyles';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { layout } from '../../theme/tokens';
import ContactAuxiliarySection from './ContactAuxiliarySection';
import ContactFormSection from './ContactFormSection';
import ContactInfoSection from './ContactInfoSection';

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  content: {
    paddingVertical: layout.spacing.xl,
    paddingBottom: layout.spacing.xxl,
  },
  grid: {
    flexDirection: 'row',
    gap: layout.spacing.xl,
    alignItems: 'flex-start',
  },
  gridDesktop: {
    flexDirection: 'row',
  },
  gridMobile: {
    flexDirection: 'column',
  },
  colLeft: {
    flex: 1,
  },
  colCenter: {
    flex: 1.5,
  },
  colRight: {
    flex: 1,
  },
  colFull: {
    width: '100%',
  },
});

export default function ContactPage({ isDark }) {
  const { ic } = useTheme();
  const { t } = useLanguage();
  const { width: windowWidth } = useWindowDimensions();
  const isMultiCol = windowWidth >= layout.breakpoints.mobile;

  return (
    <View
      style={[commonStyles.container, ic(commonStyles.containerDark, commonStyles.containerLight)]}
    >
      <View style={styles.flex1}>
        <View style={[commonStyles.content, styles.content]}>
          <ScrollFadeUp>
            <View style={[styles.grid, isMultiCol ? styles.gridDesktop : styles.gridMobile]}>
              <View style={isMultiCol ? styles.colLeft : styles.colFull}>
                <ContactInfoSection t={t} isDark={isDark} />
              </View>
              <View style={isMultiCol ? styles.colCenter : styles.colFull}>
                <ContactFormSection t={t} isDark={isDark} />
              </View>
              <View style={isMultiCol ? styles.colRight : styles.colFull}>
                <ContactAuxiliarySection t={t} isDark={isDark} />
              </View>
            </View>
          </ScrollFadeUp>
        </View>
      </View>
    </View>
  );
}
