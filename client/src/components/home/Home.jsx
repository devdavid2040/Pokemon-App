import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions";
import Cards from "../cards/Cards";
import NavBar from "../navBar/NavBar";
import Pagination from "../pagination/Pagination";
import SearchBar from "../searchBar/SearchBar";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
  console.log(pokemons)

  useEffect(() => {
    dispatch(actions.getPokemons());
    dispatch(actions.getTypes());
  }, [dispatch]);

  // Pagination config
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [pokemonsPerPage, setPokemonsPerPage] = useState(9);
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
  // eslint-disable-next-line
  const [order, setOrder] = useState("");

  const handleSort = (e) => {
    dispatch(actions.orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  };

  const handleFilterType = (e) => {
    setCurrentPage(1);
    dispatch(actions.filterByType(e.target.value));
  };

  const handleFilterCreated = (e) => {
    setCurrentPage(1);
    dispatch(actions.filterCreated(e.target.value));
  };

  const handleClick = (e) => {
    dispatch(actions.getPokemons());
  };

  return (
    <div className="home-container">
      <NavBar />
      <SearchBar />

      {/* Filter */}
      <div>
        <select defaultValue="default" onChange={handleSort}>
          <option value="default" disabled>
            Select order
          </option>
          <option value="asc">Ascendent (A-Z)</option>
          <option value="desc">Descendent (Z-A)</option>
        </select>

        <select onChange={handleFilterType}>
          <option value="all">All</option>
          {types &&
            types.map((elem) => (
              <option key={elem.id} value={elem.name}>
                {elem.name}
              </option>
            ))}
        </select>

        <select onChange={handleFilterCreated}>
          <option value="all">All</option>
          <option value="created">Created by me</option>
          <option value="api">Api</option>
        </select>
      </div>
      {/* Filter */}

      <h1>Select your Pokémon</h1>
      <Pagination
        pokemonsPerPage={pokemonsPerPage}
        allPokemons={pokemons.length}
        paginate={paginate}
      />
      {currentPokemons ? (
        <Cards pokemons={currentPokemons} />
      ) : (
        <div>
          <h3>Oops! Something went wrong</h3>
          <button onClick={(e) => handleClick(e)}>Refresh</button>
        </div>
      )}
    </div>
  );
};

export default Home;
