import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <>
      <NavBar />
      <div className="error-page">
        <h1 className="error-title">Oops!... Page not found.</h1>
        <Link to="/home">
          <button className="error-btn">Go to home!</button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
