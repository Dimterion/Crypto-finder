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
