import PropTypes from "prop-types";

function TickersList({ tickers }) {
  return (
    <div className="rounded-lg shadow-lg card bg-base-100">
      <div className="card-body">
        <h2 className="text-3xl my-4 font-bold card-title">Tickers</h2>
        {tickers.map((ticker) => (
          <h3 key={`${ticker.market.name}-${tickers.indexOf(ticker)}`}>
            {ticker.market.name}
          </h3>
        ))}
      </div>
    </div>
  );
}

TickersList.propTypes = {
  tickers: PropTypes.array.isRequired,
};

export default TickersList;
