import { createContext, useReducer } from "react";
import gitHubReducer from "./GitHubReducer";

const GitHubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(gitHubReducer, initialState);

  // Get initial users (testing purposes)
  const fetchUsers = async () => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {},
    });

    const data = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  };

  // Set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

export default GitHubContext;
