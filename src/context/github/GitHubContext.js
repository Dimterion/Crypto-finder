import { createContext, useReducer } from "react";
import gitHubReducer from "./GitHubReducer";

const GitHubContext = createContext();

const COINGECKO_URL = process.env.REACT_APP_COINGECKO_URL;

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(gitHubReducer, initialState);

  // Get initial users (testing purposes)
  // const fetchUsers = async () => {
  //   setLoading();

  //   const response = await fetch(`${GITHUB_URL}/films`, {
  //     headers: {},
  //   });

  //   const data = await response.json();

  //   dispatch({
  //     type: "GET_USERS",
  //     payload: data,
  //   });
  // };

  // Get search results
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      query: text,
    });

    const response = await fetch(`${COINGECKO_URL}/search?${params}`, {
      headers: {},
    });

    const { coins } = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: coins,
    });
  };

  // Get single user
  const getUser = async (api_symbol) => {
    setLoading();

    const response = await fetch(`${COINGECKO_URL}/coins/${api_symbol}`, {
      headers: {},
    });

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();

      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  // Clear search results
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  // Set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

export default GitHubContext;
