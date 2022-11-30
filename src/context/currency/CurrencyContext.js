import { createContext, useReducer } from "react";
import currencyReducer from "./CurrencyReducer";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const initialState = {
    currencies: [],
    currency: {},
    tickers: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(currencyReducer, initialState);

  // Get initial currencies (testing purposes)
  // const fetchCurrencies = async () => {
  //   setLoading();

  //   const response = await fetch(`${CURRENCY_URL}/films`, {
  //     headers: {},
  //   });

  //   const data = await response.json();

  //   dispatch({
  //     type: "GET_CURRENCIES",
  //     payload: data,
  //   });
  // };

  return (
    <CurrencyContext.Provider
      value={{
        // currencies: state.currencies,
        // loading: state.loading,
        // currency: state.currency,
        // tickers: state.tickers,
        ...state,
        dispatch,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContext;
