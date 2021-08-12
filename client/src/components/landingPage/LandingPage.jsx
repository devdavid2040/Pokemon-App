import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons } from "../../actions/index";

const LandingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

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
