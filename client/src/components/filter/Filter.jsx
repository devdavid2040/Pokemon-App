import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { order, filterByType, filterCreated } from "../../actions/index";
import { reduceTypes } from "../../utils";
import "./Filter.css";

const Filter = ({ setOrder, setCurrentPage }) => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);

  const handleOrder = (e) => {
    dispatch(order(e.target.value));
    setOrder(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterType = (e) => {
    dispatch(filterByType(e.target.value));
    setCurrentPage(1);
  };

  const handleFilterCreated = (e) => {
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="filters-div">
      <select defaultValue="default" onChange={handleOrder}>
        <option value="default" hidden>
          Select order
        </option>
        <option value="asc">Ascendent (A - Z)</option>
        <option value="desc">Descendent (Z - A)</option>
        <option value="min">Attack (Min - Max)</option>
        <option value="max">Attack (Max - Min)</option>
      </select>

      <select defaultValue="default" onChange={handleFilterType}>
        <option value="default" hidden>
          Select type
        </option>
        <option value="allTypes">All</option>
        {allPokemons &&
          reduceTypes(allPokemons).map((elem, idx) => (
            <option key={idx} value={elem}>
              {elem}
            </option>
          ))}
      </select>

      <select defaultValue="default" onChange={handleFilterCreated}>
        <option value="default" hidden>
          Select origin
        </option>
        <option value="all">All</option>
        <option value="created">Created by me</option>
        <option value="api">API</option>
      </select>
    </div>
  );
};

export default Filter;
