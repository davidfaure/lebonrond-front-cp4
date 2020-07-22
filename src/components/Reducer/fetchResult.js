const initialState = {
  search:[], 
  favorite:[], 
  searchClicked: false, 
  favoriteClicked: false 
}

const fetchResult = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_RESULT':
      return {
        ...state,
        search: action.result
      };
    case 'FETCH_CAT_RESULT':
      return {
        ...state,
        favorite: action.result
      };
    case 'SEARCH_CLICKED':
      return {
        ...state,
        searchClicked: action.payload,
      }
    case 'FAV_CLICKED':
      return {
        ...state,
        favoriteClicked: action.payload,
      }
    default:
      return state;
  }
};

export default fetchResult;