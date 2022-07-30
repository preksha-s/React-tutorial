import React from "react";
import { Link, Outlet, useSearchParams } from "react-router-dom";
const User = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const showActiveUsers = searchParams.get("filter") == "active";
  return (
    <div
      className="text-primary
    "
    >
      <h1>User page</h1>
      <h1>User pag21</h1>
      <h1>User page22e</h1>
      <button onClick={() => setSearchParams({ filter: "active" })}>
        Active Users
      </button>
      <button onClick={() => setSearchParams()}>Reset Filter</button>
      {showActiveUsers ? (
        <h2>showing active users</h2>
      ) : (
        <h2>Showing all users</h2>
      )}
      <Outlet />
    </div>
  );
};
export default User;
