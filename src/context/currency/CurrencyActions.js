import axios from "axios";

const COINGECKO_URL = process.env.REACT_APP_COINGECKO_URL;

const coins = axios.create({
  baseURL: COINGECKO_URL,
  headers: {},
});

// Get search results
export const searchCurrencies = async (text) => {
  const params = new URLSearchParams({
    query: text,
  });

  const response = await coins.get(`/search?${params}`);
  return response.data.coins;
};

// Get currency and tickers
export const getCurrencyAndTickers = async (api_symbol) => {
  const [currency, tickers] = await Promise.all([
    coins.get(`/coins/${api_symbol}`),
    coins.get(`/coins//${api_symbol}/tickers`),
  ]);

  if (tickers.data.tickers.length > 5) {
    return {
      currency: currency.data,
      tickers: tickers.data.tickers.slice(0, 5),
    };
  } else {
    return { currency: currency.data, tickers: tickers.data.tickers };
  }
};
