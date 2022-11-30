const COINGECKO_URL = process.env.REACT_APP_COINGECKO_URL;

// Get search results
export const searchCurrencies = async (text) => {
  const params = new URLSearchParams({
    query: text,
  });

  const response = await fetch(`${COINGECKO_URL}/search?${params}`, {
    headers: {},
  });

  const { coins } = await response.json();

  return coins;
};

// Get single currency
export const getCurrency = async (api_symbol) => {
  const response = await fetch(`${COINGECKO_URL}/coins/${api_symbol}`, {
    headers: {},
  });

  if (response.status === 404) {
    window.location = "/notfound";
  } else {
    const data = await response.json();

    return data;
  }
};

// Get currency tickers
export const getCurrencyTickers = async (api_symbol) => {
  const response = await fetch(`${COINGECKO_URL}/coins/${api_symbol}/tickers`, {
    headers: {},
  });

  const { tickers } = await response.json();

  if (tickers.length > 5) {
    return tickers.slice(0, 5);
  } else {
    return tickers;
  }
};
