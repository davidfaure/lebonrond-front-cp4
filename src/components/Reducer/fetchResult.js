const initialState = {
  search: [],
  favorite: [],
  userOffer: [],
  searchClicked: false,
  favoriteClicked: false,
  userOfferClicked: false,
  searchKeyword: {
    name: "",
    region: "",
    category: "",
  },
};

const fetchResult = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_RESULT":
      return {
        ...state,
        search: action.result,
      };
    case "FETCH_CAT_RESULT":
      return {
        ...state,
        favorite: action.result,
      };
    case "FETCH_USER_OFFER":
      return {
        ...state,
        userOffer: action.result,
      };
    case "SEARCH_CLICKED":
      return {
        ...state,
        searchClicked: action.payload,
      };
    case "FAV_CLICKED":
      return {
        ...state,
        favoriteClicked: action.payload,
      };
    case "USER_OFFER_CLICKED":
      return {
        ...state,
        userOfferClicked: action.payload,
      };
    case "KEYWORD_NAME":
      return {
        ...state,
        searchKeyword: {
          ...state.searchKeyword,
          name: action.payload,
        },
      };
    case "KEYWORD_REGION":
      return {
        ...state,
        searchKeyword: {
          ...state.searchKeyword,
          region: action.payload,
        },
      };
    case "KEYWORD_CATEGORY":
      return {
        ...state,
        searchKeyword: {
          ...state.searchKeyword,
          category: action.payload,
        },
      };
    default:
      return state;
  }
};

export default fetchResult;
