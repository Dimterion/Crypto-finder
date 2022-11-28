import { useState, useContext } from "react";
import CurrencyContext from "../../context/currency/CurrencyContext";
import AlertContext from "../../context/alert/AlertContext";

function CurrencySearch() {
  const [text, setText] = useState("");

  const { currencies, searchCurrencies, clearCurrencies } =
    useContext(CurrencyContext);
  const { setAlert } = useContext(AlertContext);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      setAlert("Please enter currency name", "error");
    } else {
      searchCurrencies(text);
      setText("");
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black rounded-none"
                placeholder="Search"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0  rounded-none w-30 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {currencies.length > 0 && (
        <div>
          <button onClick={clearCurrencies} className="btn btn-ghost btn-lg">
            Clear results
          </button>
        </div>
      )}
    </div>
  );
}

export default CurrencySearch;
