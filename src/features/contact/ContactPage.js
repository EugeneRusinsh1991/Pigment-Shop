import { ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import commonStyles from '../../theme/commonStyles';
import Footer from '../../components/Footer';
import ScrollFadeUp from '../../components/ScrollFadeUp';
import { getContentGridWidth } from '../../utils/layout';
import SocialButtons from './SocialButtons';
import ContactQuestionForm from './ContactQuestionForm';

export default function ContactPage({ isDark }) {
  const { t, ic } = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  const isMobile = windowWidth < 768;
  const contentWidth = getContentGridWidth(windowWidth);

  return (
    <ScrollView
      style={[commonStyles.container, ic(commonStyles.containerDark, commonStyles.containerLight)]}
      contentContainerStyle={[commonStyles.scrollContent, { paddingBottom: 0 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1 }}>
        <View style={[commonStyles.content, { paddingBottom: 24 }]}>
          <ScrollFadeUp>
            <Text style={[commonStyles.title, ic(commonStyles.textDark, commonStyles.textLight)]}>
              {t('contactUsTitle')}
            </Text>
          </ScrollFadeUp>

          <SocialButtons t={t} isMobile={isMobile} contentWidth={contentWidth} ic={ic} isDark={isDark} />

          <ContactQuestionForm t={t} ic={ic} isDark={isDark} isMobile={isMobile} contentWidth={contentWidth} />
        </View>
      </View>
      <View style={{ height: 40 }} />
      <Footer />
    </ScrollView>
  );
}
