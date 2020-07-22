const fetchResult = (state = { search:[], searchClicked: false }, action) => {
  switch(action.type) {
    case 'FETCH_RESULT':
      return {
        ...state,
        search: action.result
      };
    case 'SEARCH_CLICKED':
      return {
        ...state,
        searchClicked: action.payload,
      }
    default:
      return state;
  }
};

export default fetchResult;