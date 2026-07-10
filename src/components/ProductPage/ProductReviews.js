import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './ProductReviewsStyles';
import { useTheme } from '../../context/ThemeContext';

const getAvgRating = (list) => list.length
  ? (list.reduce((sum, r) => sum + r.rating, 0) / list.length).toFixed(1)
  : '0.0';

const createReview = (author, comment, rating, lang) => {
  const locale = lang === 'uk' ? 'uk-UA' : lang === 'en' ? 'en-US' : 'ru-RU';
  return {
    id: String(Date.now()),
    author,
    comment,
    rating,
    date: new Date().toLocaleDateString(locale),
  };
};

function useReviewsState(product) {
  const { lang } = useTheme();
  const [reviewsList, setReviewsList] = useState(product.reviews || []);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const addReview = () => {
    if (!newAuthor.trim() || !newComment.trim()) return;
    setReviewsList([createReview(newAuthor, newComment, newRating, lang), ...reviewsList]);
    setNewAuthor('');
    setNewComment('');
    setNewRating(5);
  };

  return {
    reviewsList,
    newAuthor,
    setNewAuthor,
    newComment,
    setNewComment,
    newRating,
    setNewRating,
    addReview,
  };
}

function ReviewCard({ rev, isDark }) {
  const stars = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
  return (
    <View style={[styles.reviewCard, isDark ? styles.reviewCardDark : styles.reviewCardLight]}>
      <View style={styles.reviewHeader}>
        <Text style={[styles.author, isDark ? styles.textDark : styles.textLight]}>{rev.author}</Text>
        <Text style={styles.reviewStars}>{stars}</Text>
      </View>
      <Text style={[styles.comment, isDark ? styles.descDark : styles.descLight]}>{rev.comment}</Text>
      <Text style={styles.dateText}>{rev.date}</Text>
    </View>
  );
}

function RatingSelector({ isDark, rating, onChangeRating }) {
  const { t } = useTheme();
  return (
    <View style={styles.ratingSelector}>
      <Text style={[styles.ratingLabel, isDark ? styles.textDark : styles.textLight]}>{t('reviewsRatingLabel')}: </Text>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => onChangeRating(star)}>
          <Text style={star <= rating ? styles.activeStar : styles.inactiveStar}>★</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function ReviewForm({
  isDark,
  newAuthor,
  setNewAuthor,
  newComment,
  setNewComment,
  newRating,
  setNewRating,
  addReview,
}) {
  const { t } = useTheme();
  return (
    <View style={[styles.reviewForm, isDark ? styles.formDark : styles.formLight]}>
      <Text style={[styles.formTitle, isDark ? styles.textDark : styles.textLight]}>{t('reviewsWrite')}</Text>
      <TextInput
        style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
        placeholder={t('reviewsAuthorPlaceholder')}
        placeholderTextColor="#94a3b8"
        value={newAuthor}
        onChangeText={setNewAuthor}
      />
      <TextInput
        style={[styles.input, isDark ? styles.inputDark : styles.inputLight, styles.textArea]}
        placeholder={t('reviewsPlaceholder')}
        placeholderTextColor="#94a3b8"
        multiline
        numberOfLines={3}
        value={newComment}
        onChangeText={setNewComment}
      />
      <RatingSelector isDark={isDark} rating={newRating} onChangeRating={setNewRating} />
      <TouchableOpacity style={styles.submitBtn} onPress={addReview}>
        <Text style={styles.submitBtnText}>{t('reviewsSubmitBtn')}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ProductReviews({ product, isDark }) {
  const { t } = useTheme();
  const state = useReviewsState(product);
  const avgRating = getAvgRating(state.reviewsList);

  return (
    <View style={[styles.reviewsSection, isDark ? styles.reviewsDark : styles.reviewsLight]}>
      <Text style={[styles.sectionTitle, isDark ? styles.textDark : styles.textLight]}>{t('reviewsTitle')}</Text>
      <View style={styles.ratingSummary}>
        <Text style={styles.starDisplay}>★★★★★</Text>
        <Text style={[styles.ratingValueText, isDark ? styles.descDark : styles.descLight]}>
          {avgRating} - {t('reviewsCount').replace('{count}', state.reviewsList.length)}
        </Text>
      </View>
      <ReviewForm isDark={isDark} {...state} />
      <View style={styles.reviewsList}>
        {state.reviewsList.map((rev) => (
          <ReviewCard key={rev.id} rev={rev} isDark={isDark} />
        ))}
      </View>
    </View>
  );
}
