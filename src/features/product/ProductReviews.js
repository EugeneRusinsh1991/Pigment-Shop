import { View, useWindowDimensions } from 'react-native';
import { Text } from '../../components/ui/Text/Text';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useProfile } from '../profile/useProfile';
import styles from './ProductReviewsStyles';
import {
    RegistrationPrompt,
    ReviewCard,
    ReviewForm,
    SegmentedToggle,
    getAccountName,
    useReviewsState,
} from './ProductReviewSubcomponents';

function getTabData(state, t) {
  const isQuestions = state.contentTab === 'questions';
  const displayList = (isQuestions ? state.questionsList : state.reviewsList) || [];
  const template = isQuestions ? t('questionsCount') : t('reviewsCount');
  return {
    displayList,
    countText: template.replace('{count}', displayList.length),
  };
}

function MobileFormArea({ isDark, isAuthenticated, state }) {
  if (isAuthenticated) {
    return <ReviewForm isDark={isDark} showModeToggle {...state} />;
  }
  return <RegistrationPrompt isDark={isDark} />;
}

export default function ProductReviews({ product, isDark, reviewsState: parentState }) {
  const { t } = useTheme();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const { isAuthenticated, user } = useAuth();
  const { profile } = useProfile(user);

  const accountName = getAccountName(user, profile);
  const fallbackState = useReviewsState(product, isAuthenticated, accountName);
  const state = parentState || fallbackState;

  const contentTabOptions = [
    { value: 'reviews', label: t('toggleCustomerReviews') },
    { value: 'questions', label: t('toggleCustomerQuestions') },
  ];

  const { displayList, countText } = getTabData(state, t);

  return (
    <View style={[styles.reviewsSection, isDesktop && styles.reviewsSectionDesktop]}>
      <SegmentedToggle
        options={contentTabOptions}
        activeValue={state.contentTab || 'reviews'}
        onChange={state.setContentTab}
        isDark={isDark}
      />

      <View style={styles.ratingSummary}>
        <Text style={[styles.ratingValueText, isDark ? styles.descDark : styles.descLight]}>
          {countText}
        </Text>
      </View>

      {!isDesktop && (
        <MobileFormArea
          isDark={isDark}
          isAuthenticated={isAuthenticated}
          state={state}
        />
      )}

      <View style={styles.reviewsList}>
        {displayList.map((item) => (
          <ReviewCard key={item.id} rev={item} isDark={isDark} />
        ))}
      </View>
    </View>
  );
}
