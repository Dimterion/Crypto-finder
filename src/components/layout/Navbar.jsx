import { FaCoins } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Navbar({ title }) {
  return (
    <nav className="navbar mb-12 shadow-lg bg-neutral text-neutral-content">
      <div className="container mx-auto">
        <div className="flex-none mx-1">
          <FaCoins className="inline pr-1 text-3xl" />
          <Link to="/" className="text-lg font-bold align-middle">
            {title}
          </Link>
        </div>
        <div className="flex-1">
          <div className="flex justify-end">
            <Link to="/" className="btn btn-ghost btn-sm rounded-btn p-1">
              Home
            </Link>
            <Link to="/about" className="btn btn-ghost btn-sm rounded-btn p-1">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.defaultProps = {
  title: "Crypto Finder",
};

Navbar.propTypes = {
  title: PropTypes.string,
};

export default Navbar;
