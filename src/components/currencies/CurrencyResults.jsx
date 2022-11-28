// Add => useEffect, <= for testing currencies display
import { useContext } from "react";
import CurrencyItem from "./CurrencyItem";
import CurrencyContext from "../../context/currency/CurrencyContext";

function CurrencyResults() {
  // Add => , fetchCurrencies <= for testing currencies display
  const { currencies, loading } = useContext(CurrencyContext);

  // Testing currencies display
  // useEffect(() => {
  //   fetchCurrencies();
  // }, []);

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {currencies.map((currency) => (
          <CurrencyItem key={currency.id} currency={currency} />
        ))}
      </div>
    );
  } else {
    return <h2>Loading...</h2>;
  }
}

export default CurrencyResults;
