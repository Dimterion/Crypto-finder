import { FaRegCalendarCheck, FaChartBar, FaThinkPeaks } from "react-icons/fa";
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

  const {
    name,
    symbol,
    description,
    links,
    image,
    genesis_date,
    market_cap_rank,
    liquidity_score,
    market_data,
  } = user;

  // Checking if the property exists in the JSON object
  function getNestedObject(object, key) {
    return key.split(".").reduce(function (property, index) {
      return typeof property == "undefined" || property === null
        ? property
        : property[index];
    }, object);
  }

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
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 md:gap-8">
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
              <div className="w-full rounded-lg shadow-md bg-base-100 stats mt-5 mb-5">
                <div className="stat p-4">
                  <div className="stat-title text-md">Price in USD</div>
                  <div className="text-lg stat-value">
                    {getNestedObject(market_data, "current_price.usd")}$
                  </div>
                </div>
                <div className="stat p-4">
                  <div className="stat-title text-md">Price in EUR</div>
                  <div className="text-lg stat-value">
                    {getNestedObject(market_data, "current_price.eur")}€
                  </div>
                </div>
              </div>
              <div>
                {description &&
                  getNestedObject(description, "en")
                    .match(/[^.!?]+[.!?]+/g)
                    .slice(0, 5)}
              </div>
              <div className="mt-4 card-actions">
                <a
                  href={links && getNestedObject(links, "homepage")[0]}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  Visit Currency Home Page
                </a>
              </div>
            </div>
            <div className="w-full rounded-lg shadow-md bg-base-100 stats"></div>
          </div>
        </div>
        <div className="w-full xl:w-1/4 md:w-56 mb-6 mr-3 rounded-lg shadow-md bg-base-100 stats">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaRegCalendarCheck className="text-2xl" />
            </div>
            <div className="stat-title pr-3">Origin date</div>
            <div className="stat-value text-lg">{genesis_date}</div>
          </div>
        </div>
        <div className="w-full xl:w-1/4 md:w-56 mb-6 mr-3 rounded-lg shadow-md bg-base-100 stats">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaChartBar className="text-2xl" />
            </div>
            <div className="stat-title pr-3">Market Cap Rank</div>
            <div className="stat-value text-lg">{market_cap_rank}</div>
          </div>
        </div>
        <div className="w-full xl:w-1/4 md:w-56 mb-6 mr-3 rounded-lg shadow-md bg-base-100 stats">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaThinkPeaks className="text-2xl" />
            </div>
            <div className="stat-title pr-3">Liquidity Score</div>
            <div className="stat-value text-lg">{liquidity_score}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
