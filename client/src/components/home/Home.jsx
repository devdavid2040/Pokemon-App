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
  const allPokemons = useSelector((state) => state.allPokemons);

  useEffect(() => {
    dispatch(actions.getPokemons());
  }, [dispatch]);

  // Pagination config
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(9);
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
  console.log(order);

  const handleOrder = (e) => {
    e.preventDefault();
    if (e.target.value === "asc" || e.target.value === "desc") {
      dispatch(actions.orderByName(e.target.value));
      setCurrentPage(1);
    }
    if (e.target.value === "min" || e.target.value === "max") {
      dispatch(actions.orderByAttack(e.target.value));
      setCurrentPage(1);
    }
    setOrder(`Order ${e.target.value}`);
  };

  const handleFilterType = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(actions.filterByType(e.target.value));
  };

  const handleFilterCreated = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(actions.filterCreated(e.target.value));
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(actions.getPokemons());
  };

  return (
    <div className="home-container">
      <NavBar />
      <h1>Select your Pokémon</h1>
      <SearchBar />

      <div className="filters-div">
        {/* Order */}
        <select defaultValue="default" onChange={handleOrder}>
          <option value="default" disabled>
            Select order
          </option>
          <option value="asc">Ascendent (A - Z)</option>
          <option value="desc">Descendent (Z - A)</option>
          <option value="min">Attack (Min - Max)</option>
          <option value="max">Attack (Max - Min)</option>
        </select>

        {/* Filter */}
        <select onChange={handleFilterType}>
          <option value="allTypes">All</option>
          {allPokemons &&
            allPokemons
              .map(({ types }) => types)
              .flat()
              .reduce((acc, cur) => {
                if (!acc.includes(cur.name)) {
                  acc.push(cur.name);
                }
                return acc;
              }, [])
              .map((elem, idx) => (
                <option key={idx} value={elem}>
                  {elem}
                </option>
              ))}
        </select>

        <select onChange={handleFilterCreated}>
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
      {currentPokemons.length && currentPokemons[0] === null ? (
        <h3>Oops! Pokemons not found</h3>
      ) : (
        currentPokemons && <Cards pokemons={currentPokemons} />
      )}
      <div className="footer-home" />
    </div>
  );
};

export default React.memo(Home);
