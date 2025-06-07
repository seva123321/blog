export const getDateString = (updatedAt, createdAt) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const dateArticle = updatedAt || createdAt
  const createdAtDate = new Date(dateArticle).toLocaleDateString(
    'en-En',
    options,
  )
  return createdAtDate
}

export const getUpperCaseStartedWord = (word) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  word[0].toUpperCase() + word.slice(1).toLowerCase()

export const PAGINATION_LIMIT = 20
