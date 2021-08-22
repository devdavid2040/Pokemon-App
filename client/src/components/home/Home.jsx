import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "../cards/Cards";
import NavBar from "../navBar/NavBar";
import Pagination from "../pagination/Pagination";
import SearchBar from "../searchBar/SearchBar";
import { getPokemons } from "../../actions";
import "./Home.css";
import Filter from "../filter/Filter";
import Spinner from "../spinner/Spinner";

const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getPokemons()).then(() => setIsLoading(false));
  }, [dispatch]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 9;
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  // Update order
  const [order, setOrder] = useState("default");
  console.log(`Order ${order}`);

  return (
    <div className="home-container">
      <NavBar />
      <SearchBar />
      <Filter setOrder={setOrder} setCurrentPage={setCurrentPage} />
      <Pagination
        pokemonsPerPage={pokemonsPerPage}
        allPokemons={pokemons.length}
        paginate={setCurrentPage}
      />
      {/* {!pokemons ? (
        <div>
          <h3>Oops! Pokemons not found.</h3>
          <button onClick={() => dispatch(getPokemons())}>Refresh</button>
        </div>
      ) : (
        currentPokemons && <Cards pokemons={currentPokemons} />
      )} */}
      {isLoading && <Spinner />}
      {!isLoading && currentPokemons && <Cards pokemons={currentPokemons} />}
      <div className="footer-home" />
    </div>
  );
};

export default React.memo(Home);
