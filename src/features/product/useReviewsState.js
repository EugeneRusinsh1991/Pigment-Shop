import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { COLLECTIONS } from '../../services/collections';

function getProfileName(profile) {
  if (!profile) return '';
  const first = profile.firstName || '';
  const last = profile.lastName || '';
  return `${first} ${last}`.trim();
}

export function getAccountName(user, profile) {
  if (!user) return '';
  const name = getProfileName(profile);
  if (name) return name;
  return user.displayName || user.email || '';
}

const createReview = (author, comment, rating, lang) => {
  const locale = lang === 'uk' ? 'uk-UA' : lang === 'en' ? 'en-US' : 'ru-RU';
  return {
    author,
    comment,
    rating,
    date: new Date().toLocaleDateString(locale),
    createdAt: Date.now(),
  };
};

function useFirestoreSubcollection(productId, subcollectionName, fallbackData, setter) {
  useEffect(() => {
    if (!productId) {
      setter(fallbackData || []);
      return;
    }

    const ref = collection(db, COLLECTIONS.PRODUCTS, productId, subcollectionName);
    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (!snapshot.empty) {
          const docs = snapshot.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          setter(docs);
        } else {
          setter(fallbackData || []);
        }
      },
      (error) => {
        if (error?.code !== 'permission-denied') {
          console.warn(`[useReviewsState] ${subcollectionName} listener failed:`, error);
        }
        setter(fallbackData || []);
      }
    );

    return unsubscribe;
  }, [productId, subcollectionName, fallbackData, setter]);
}

async function saveSubcollectionItem(productId, subcollectionName, item, fallbackSetter) {
  if (productId) {
    try {
      const ref = collection(db, COLLECTIONS.PRODUCTS, productId, subcollectionName);
      await addDoc(ref, item);
      return;
    } catch (error) {
      console.error(`Failed to save ${subcollectionName}:`, error);
    }
  }
  fallbackSetter((prev) => [item, ...prev]);
}

const EMPTY_ARRAY = [];

export function useReviewsState(product, isAuthenticated, accountName) {
  const { lang } = useTheme();
  const productId = product?.id;
  const initialReviews = product?.reviews || EMPTY_ARRAY;
  const initialQuestions = product?.questions || EMPTY_ARRAY;

  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [questionsList, setQuestionsList] = useState(initialQuestions);
  const [submitMode, setSubmitMode] = useState('review');
  const [contentTab, setContentTab] = useState('reviews');
  const [newComment, setNewComment] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newRating, setNewRating] = useState(5);

  useFirestoreSubcollection(productId, 'reviews', initialReviews, setReviewsList);
  useFirestoreSubcollection(productId, 'questions', initialQuestions, setQuestionsList);

  const addReview = async () => {
    const author = isAuthenticated ? accountName : 'Guest';
    if (!author.trim() || !newComment.trim()) return;
    const review = createReview(author, newComment, newRating, lang);

    setNewComment('');
    setNewRating(5);
    await saveSubcollectionItem(productId, 'reviews', review, setReviewsList);
  };

  const addQuestion = async () => {
    const author = isAuthenticated ? accountName : 'Guest';
    if (!author.trim() || !newQuestion.trim()) return;
    const question = createReview(author, newQuestion, 5, lang);

    setNewQuestion('');
    await saveSubcollectionItem(productId, 'questions', question, setQuestionsList);
  };

  return {
    reviewsList,
    questionsList,
    submitMode,
    setSubmitMode,
    contentTab,
    setContentTab,
    newComment,
    setNewComment,
    newQuestion,
    setNewQuestion,
    newRating,
    setNewRating,
    addReview,
    addQuestion,
  };
}
