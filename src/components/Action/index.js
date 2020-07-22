const fetchResult = (result) => {
  return {
    type: 'FETCH_RESULT',
    result,
  };
};

export default fetchResult;