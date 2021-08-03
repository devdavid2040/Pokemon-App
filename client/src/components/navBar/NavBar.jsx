import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Link to="/home">
      <button>Home</button>
    </Link>
  );
};

export default NavBar;
