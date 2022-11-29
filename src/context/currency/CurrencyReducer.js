const currencyReducer = (state, action) => {
  switch (action.type) {
    case "GET_CURRENCIES":
      return {
        ...state,
        currencies: action.payload,
        loading: false,
      };
    case "GET_CURRENCY":
      return {
        ...state,
        currency: action.payload,
        loading: false,
      };
    case "CLEAR_CURRENCIES":
      return {
        ...state,
        currencies: [],
      };
    case "GET_TICKERS":
      return {
        ...state,
        tickers: action.payload,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default currencyReducer;
