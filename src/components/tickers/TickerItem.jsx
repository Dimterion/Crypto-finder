import { FaLink } from "react-icons/fa";
import PropTypes from "prop-types";

function TickerItem({ ticker }) {
  const { target, market, last, trade_url, timestamp } = ticker;

  return (
    <div className="mb-2 rounded-md card bg-gray-800 hover:bg-gray-900">
      <div className="card-body">
        <h3 className="mb-2 text-xl font-semibold">
          <a href={trade_url} target="_blank" rel="noreferrer">
            <FaLink className="inline mr-1" />
            {market.name} - {target.slice(0, 5)}
          </a>
        </h3>
        <p className="mb-3"></p>
        <div>
          <div className="mr-2 badge badge-info badge-lg">
            {target.slice(0, 5)}
          </div>
          <div className="mr-2 mt-2 badge badge-warning badge-lg">
            {last.toFixed(2) !== "0.00" ? last.toFixed(2) : last.toFixed(4)}
          </div>
          <div className="mr-2 mt-2 badge badge-error badge-lg">
            {timestamp.slice(11, 16)}
          </div>
        </div>
      </div>
    </div>
  );
}

TickerItem.propTypes = {
  ticker: PropTypes.object.isRequired,
};

export default TickerItem;
