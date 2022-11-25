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

  //const { name } = user;

  // Checking if the property exists in the JSON object

  function getNestedObject(obj, key) {
    return key.split(".").reduce(function (o, x) {
      return typeof o == "undefined" || o === null ? o : o[x];
    }, obj);
  }

  // Example of the above function check:
  //   {user &&
  //   user.market_data &&
  //   user.market_data.current_price &&
  //   user.market_data.current_price.usd &&
  //   user.market_data.current_price.usd}

  if (loading) {
    return <h3>Loading...</h3>;
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
              <div>
                {getNestedObject(user, "market_data.current_price.eur")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
