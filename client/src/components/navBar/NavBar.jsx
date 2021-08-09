import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navBar">
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/create">
        <button>Create your Pokémon!</button>
      </Link>
    </div>
  );
};

export default NavBar;
