import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Product = () => {
  return (
    <>
      <div className="col-3 py-2 mx-2">
        <input
          className="form-control"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
      </div>
      <nav>
        {/* Rekative paths without '/'  which we learn late about this*/}
        <Link to="featured" className="px-2">
          Featured
        </Link>
        <Link to="new">New</Link>
      </nav>
      <Outlet />
    </>
  );
};
