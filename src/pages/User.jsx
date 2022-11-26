import { FaCodepen, FaStore, FaUserFriends, FaUsers } from "react-icons/fa";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import GitHubContext from "../context/github/GitHubContext";

function User() {
  const { getUser, user, loading } = useContext(GitHubContext);

  const params = useParams();

  useEffect(() => {
    getUser(params.api_symbol);
  }, []);

  const { name, symbol, links, image, market_data } = user;

  // Checking if the property exists in the JSON object
  function getNestedObject(object, key) {
    return key.split(".").reduce(function (property, index) {
      return typeof property == "undefined" || property === null
        ? property
        : property[index];
    }, object);
  }

  const homePageLink = getNestedObject(links, "homepage");

  // Example of the above function check:
  //   {user &&
  //   user.market_data &&
  //   user.market_data.current_price &&
  //   user.market_data.current_price.usd &&
  //   user.market_data.current_price.usd}

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className="w-full mx-auto lg:w-10/12">
        <div className="mb-4">
          <Link to="/" className="btn btn-ghost">
            Back to Search
          </Link>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
          <div className="custom-card-image mb-6 md:mb-0">
            <div className="rounded-lg shadow-xl card image-full">
              <figure>
                <img
                  src={getNestedObject(image, "large")}
                  alt="Currency logo"
                />
              </figure>
            </div>
          </div>
          <div className="col-span-2">
            <div className="mb-6">
              <h2 className="text-3xl card-title">
                {name}
                <div className="ml-2 mr-1 badge badge-success">{symbol}</div>
              </h2>
              <p>{getNestedObject(market_data, "current_price.usd")} USD</p>
              <p>{getNestedObject(market_data, "current_price.eur")} EUR</p>
              <div className="mt-4 card-actions">
                <a
                  href={homePageLink && homePageLink[0]}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  Visit Currency Home Page
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
