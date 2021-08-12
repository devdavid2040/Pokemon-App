import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navBar">
      <Link to="/home">
        <img
          id="img-pokeball"
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png"
          alt=""
        />
      </Link>
      <Link to="/home">
        <img
          id="img-logo"
          src="http://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG10.png"
          alt=""
        />
      </Link>
      <Link to="/create">
        <button>Create your Pokémon!</button>
      </Link>
    </div>
  );
};

export default NavBar;
