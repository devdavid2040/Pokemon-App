import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="loading">
      <div className="spinner" />
      <p className="spinner-title">Loading...</p>
    </div>
  );
};

export default Spinner;
