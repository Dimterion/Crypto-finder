const currencyReducer = (state, action) => {
  switch (action.type) {
    case "GET_CURRENCIES":
      return {
        ...state,
        currencies: action.payload,
        loading: false,
      };
    case "GET_CURRENCY_AND_TICKERS":
      return {
        ...state,
        currency: action.payload.currency,
        tickers: action.payload.tickers,
        loading: false,
      };
    case "CLEAR_CURRENCIES":
      return {
        ...state,
        currencies: [],
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
