import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "../cards/Cards";
import NavBar from "../navBar/NavBar";
import Pagination from "../pagination/Pagination";
import SearchBar from "../searchBar/SearchBar";
import { getPokemons } from "../../redux/actions/index";
import "./Home.css";
import Filter from "../filter/Filter";
import Spinner from "../spinner/Spinner";

const Home = () => {
  const dispatch = useDispatch();
  const { pokemons } = useSelector((state) => state);
  const { isLoading } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getPokemons());
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
  const [order, setOrder] = useState("");

  return (
    <div className="home-container">
      <NavBar />
      <SearchBar />
      {order && <h5>Sorted by {order}</h5>
      }
      <Filter setOrder={setOrder} setCurrentPage={setCurrentPage} />
      <Pagination
        pokemonsPerPage={pokemonsPerPage}
        allPokemons={pokemons.length}
        paginate={setCurrentPage}
      />
      {isLoading && <Spinner />}
      {!isLoading && currentPokemons && <Cards pokemons={currentPokemons} />}
      <div className="footer-home" />
    </div>
  );
};

export default React.memo(Home);
