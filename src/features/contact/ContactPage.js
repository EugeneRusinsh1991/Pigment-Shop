import { View, useWindowDimensions } from 'react-native';
import { Heading } from '../../components/ui/Text';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import commonStyles from '../../theme/commonStyles';

import { ScrollFadeUp } from '../../components/ui/Motion';
import { getContentGridWidth } from '../../utils/layoutUtils';
import SocialButtons from './SocialButtons';
import ContactQuestionForm from './ContactQuestionForm';
import styles from './ContactPageStyles';

export default function ContactPage({ isDark }) {
  const { ic } = useTheme();
  const { t } = useLanguage();
  const { width: windowWidth } = useWindowDimensions();
  const isMobile = windowWidth < 768;
  const contentWidth = getContentGridWidth(windowWidth);

  return (
    <View
      style={[commonStyles.container, ic(commonStyles.containerDark, commonStyles.containerLight)]}
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
    </View>
  );
}
