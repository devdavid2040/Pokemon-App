import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions/index";
import "./SearchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getByName(name.trim()));
    setName("");
  };

  return (
    <div className="searchBar-container">
      <form onSubmit={handleSubmit}>
        <input
          required
          id="searchBar-input"
          type="text"
          value={name}
          placeholder="Insert name..."
          onChange={handleInputChange}
        />
        <input id="searchBar-btn" type="submit" value="Search!" />
      </form>
    </div>
  );
};

export default SearchBar;
