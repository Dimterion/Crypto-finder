import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function CurrencyItem({ currency: { name, api_symbol, large } }) {
  return (
    <div className="card shadow-md compact side bg-base-100">
      <div className="flex-row items-center space-x-4 card-body">
        <div>
          <div className="avatar">
            <div className="rounded-full shadow w-14 h-14">
              <img src={large} alt="Profile" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="card-title">{name}</h2>
          <Link
            className="text-base-content text-opacity-40"
            to={`/currency/${api_symbol}`}
          >
            Visit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

CurrencyItem.propTypes = {
  currency: PropTypes.object.isRequired,
};

export default CurrencyItem;
