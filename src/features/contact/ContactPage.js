import { ScrollView, View, useWindowDimensions } from 'react-native';
import { Heading } from '../../components/Text';
import { useTheme } from '../../context/ThemeContext';
import commonStyles from '../../theme/commonStyles';
import Footer from '../shell/components/Footer';
import { ScrollFadeUp } from '../../components/Motion';
import { getContentGridWidth } from '../../utils/layout';
import SocialButtons from './SocialButtons';
import ContactQuestionForm from './ContactQuestionForm';
import styles from './ContactPageStyles';

export default function ContactPage({ isDark }) {
  const { t, ic } = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  const isMobile = windowWidth < 768;
  const contentWidth = getContentGridWidth(windowWidth);

  return (
    <ScrollView
      style={[commonStyles.container, ic(commonStyles.containerDark, commonStyles.containerLight)]}
      contentContainerStyle={[commonStyles.scrollContent, styles.noPaddingBottom]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.flex1}>
        <View style={[commonStyles.content, styles.contentPadding]}>
          <ScrollFadeUp>
            <Heading level={1} style={styles.title} isDark={isDark}>
              {t('contactUsTitle')}
            </Heading>
          </ScrollFadeUp>

          <SocialButtons t={t} isMobile={isMobile} contentWidth={contentWidth} ic={ic} isDark={isDark} />

          <ContactQuestionForm t={t} ic={ic} isDark={isDark} isMobile={isMobile} contentWidth={contentWidth} />
        </View>
      </View>
      <View style={styles.footerSpacer} />
      <Footer />
    </ScrollView>
  );
}
