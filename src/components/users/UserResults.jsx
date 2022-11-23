// Add => useEffect, <= for testing users display
import { useEffect, useContext } from "react";
import UserItem from "./UserItem";
import GitHubContext from "../../context/github/GitHubContext";

function UserResults() {
  // Add => , fetchUsers <= for testing users display
  const { users, loading, fetchUsers } = useContext(GitHubContext);

  // Testing users display
  useEffect(() => {
    fetchUsers();
  }, []);

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <h3>Loading...</h3>;
  }
}

export default UserResults;
