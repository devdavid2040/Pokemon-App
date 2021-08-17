import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {

  return (
    <div className="landing-container">
      <img className="pokemonImg" src="https://images6.alphacoders.com/475/thumb-1920-475761.jpg" alt="" />
      <div className="landing-text">
        <h1>Welcome to Pokemon App!</h1>
        <hr />
        <h3>Here you can find all kinds of Pokémons</h3>
        <Link to="/home">
          <button className="landing-btn">Let's go!</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
