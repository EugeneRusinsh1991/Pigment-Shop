export function getTabData(state, t) {
  const isQuestions = state.contentTab === 'questions';
  const displayList = (isQuestions ? state.questionsList : state.reviewsList) || [];
  const template = isQuestions ? t('questionsCount') : t('reviewsCount');
  return {
    displayList,
    countText: template.replace('{count}', displayList.length),
  };
}
