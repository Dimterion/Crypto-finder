import { createContext, useReducer } from "react";
import currencyReducer from "./CurrencyReducer";

const CurrencyContext = createContext();

const COINGECKO_URL = process.env.REACT_APP_COINGECKO_URL;

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

  // Get search results
  const searchCurrencies = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      query: text,
    });

    const response = await fetch(`${COINGECKO_URL}/search?${params}`, {
      headers: {},
    });

    const { coins } = await response.json();

    dispatch({
      type: "GET_CURRENCIES",
      payload: coins,
    });
  };

  // Get single currency
  const getCurrency = async (api_symbol) => {
    setLoading();

    const response = await fetch(`${COINGECKO_URL}/coins/${api_symbol}`, {
      headers: {},
    });

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();

      dispatch({
        type: "GET_CURRENCY",
        payload: data,
      });
    }
  };

  // Get currency tickers
  const getCurrencyTickers = async (api_symbol) => {
    setLoading();

    const response = await fetch(
      `${COINGECKO_URL}/coins/${api_symbol}/tickers`,
      {
        headers: {},
      }
    );

    const { tickers } = await response.json();

    dispatch({
      type: "GET_TICKERS",
      payload: tickers,
    });
  };

  // Clear search results
  const clearCurrencies = () => dispatch({ type: "CLEAR_CURRENCIES" });

  // Set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <CurrencyContext.Provider
      value={{
        currencies: state.currencies,
        loading: state.loading,
        currency: state.currency,
        tickers: state.tickers,
        searchCurrencies,
        clearCurrencies,
        getCurrency,
        getCurrencyTickers,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContext;
