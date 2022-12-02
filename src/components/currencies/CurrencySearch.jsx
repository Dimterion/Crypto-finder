import { useState, useContext } from "react";
import CurrencyContext from "../../context/currency/CurrencyContext";
import AlertContext from "../../context/alert/AlertContext";
import { searchCurrencies } from "../../context/currency/CurrencyActions";

function CurrencySearch() {
  const [text, setText] = useState("");

  const { currencies, dispatch } = useContext(CurrencyContext);
  const { setAlert } = useContext(AlertContext);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text === "") {
      setAlert("Please enter currency name", "error");
    } else {
      dispatch({ type: "SET_LOADING" });
      const currencies = await searchCurrencies(text);
      dispatch({ type: "GET_CURRENCIES", payload: currencies });
      setText("");
    }
  };

  return (
    <>
      <h2 className="text-lg font-bold mb-4">
        Get information about crypto currencies
      </h2>
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
            <button
              onClick={() => dispatch({ type: "CLEAR_CURRENCIES" })}
              className="btn btn-ghost btn-lg"
            >
              Clear results
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CurrencySearch;
