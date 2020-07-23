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

export const fetchUserOffer = (result) => {
  return {
    type: 'FETCH_USER_OFFER',
    result,
  }
}

export default fetchResult;