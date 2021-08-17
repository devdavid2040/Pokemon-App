import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "../cards/Cards";
import NavBar from "../navBar/NavBar";
import Pagination from "../pagination/Pagination";
import SearchBar from "../searchBar/SearchBar";
import * as actions from "../../actions";
import { reduceTypes } from "../../utils";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const allPokemons = useSelector((state) => state.allPokemons);

  useEffect(() => {
    dispatch(actions.getPokemons());
  }, [dispatch]);

  // Pagination config
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 9;
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filters
  const [order, setOrder] = useState("");
  console.log(`Order ${order}`);

  const handleOrder = (e) => {
    e.preventDefault();
    dispatch(actions.order(e.target.value));
    setOrder(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterType = (e) => {
    e.preventDefault();
    dispatch(actions.filterByType(e.target.value));
    // dispatch(actions.order(order));
    setCurrentPage(1);
  };

  const handleFilterCreated = (e) => {
    e.preventDefault();
    dispatch(actions.filterCreated(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="home-container">
      <NavBar />
      <SearchBar />

      <div className="filters-div">
        {/* Order */}
        <select defaultValue="default" onChange={handleOrder}>
          <option value="default" hidden>
            Select order
          </option>
          <option value="asc">Ascendent (A - Z)</option>
          <option value="desc">Descendent (Z - A)</option>
          <option value="min">Attack (Min - Max)</option>
          <option value="max">Attack (Max - Min)</option>
        </select>

        {/* Filter */}
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
          <option value="api">Api</option>
        </select>
      </div>

      <Pagination
        pokemonsPerPage={pokemonsPerPage}
        allPokemons={pokemons.length}
        paginate={paginate}
      />
      {!currentPokemons ? (
        <div>
          <h3>Oops! Pokemons not found.</h3>
          <button onClick={() => dispatch(actions.getPokemons())}>
            Refresh
          </button>
        </div>
      ) : (
        currentPokemons && <Cards pokemons={currentPokemons} />
      )}
      <div className="footer-home" />
    </div>
  );
};

export default Home;
