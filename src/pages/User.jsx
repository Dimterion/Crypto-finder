import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import GitHubContext from "../context/github/GitHubContext";

function User() {
  const { getUser, user } = useContext(GitHubContext);

  const params = useParams();

  useEffect(() => {
    getUser(params.api_symbol);
  }, []);

  return <div>{user.name}</div>;
}

export default User;
