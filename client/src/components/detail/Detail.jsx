import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetail } from "../../actions/index";
import NavBar from "../navBar/NavBar";
import Spinner from "../spinner/Spinner";

const Detail = ({ match }) => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.detail);
  const { id } = match.params;

  useEffect(() => {
    dispatch(getDetail(id));
  }, [id, dispatch]);

  return (
    <>
      <NavBar />
      <div>
        {Object.keys(pokemon).length && String(pokemon.id) === String(id) ? (
          <div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.image} alt="" />
            <p>Hp: {pokemon.hp}</p>
            <p>Attack: {pokemon.attack}</p>
            <p>Defense: {pokemon.defense}</p>
            <p>Speed: {pokemon.speed}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Types: {pokemon.types.map((elem) => elem.name).join(", ")}</p>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default Detail;
