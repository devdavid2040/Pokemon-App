import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemons } from "../../redux/actions/index";
import NavBar from "../navBar/NavBar";
import SearchBar from "../searchBar/SearchBar";
import Filter from "../filter/Filter";
import Cards from "../cards/Cards";
import Pagination from "../pagination/Pagination";
import Spinner from "../spinner/Spinner";
import Footer from "../Footer/Footer";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { pokemons, isLoading } = useSelector((state) => state);

  // Order state
  const [order, setOrder] = React.useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = React.useState(1);
  const pokemonsPerPage = 9;
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  React.useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  return (
    <div className="home-container">
      <NavBar />
      <SearchBar />
      {order && <h5>Sorted by {order}</h5>}
      <Filter setOrder={setOrder} setCurrentPage={setCurrentPage} />
      {isLoading && <Spinner />}
      {!isLoading && currentPokemons && <Cards pokemons={currentPokemons} />}
      <div className="home-pagination">
        <Pagination
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={pokemons.length}
          paginate={setCurrentPage}
        />
      </div>
      <div className="footer-home">
        <Footer />
      </div>
    </div>
  );
};

export default React.memo(Home);
