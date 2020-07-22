const fetchResult = (result) => {
  return {
    type: 'FETCH_RESULT',
    result,
  };
};

export const fetchCategorySearch = (result) => {
  return {
    type: 'FETCH_CAT_RESULT',
    result,
  }
}

export default fetchResult;