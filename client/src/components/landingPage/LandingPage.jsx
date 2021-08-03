import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to Pokemon App!</h1>
      <Link to="/home">
        <button type="submit">Let's go!</button>
      </Link>
    </div>
  );
};

export default LandingPage;
