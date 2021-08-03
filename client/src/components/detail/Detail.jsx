import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetail } from "../../actions/index";

const Detail = ({ match }) => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(match.params.id));
  }, [dispatch]);

  return (
    <div>
      {pokemon.length ? (
        <div>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.image} alt="" />
          <p>Hp: {pokemon.hp}</p>
          <p>Attack: {pokemon.attack}</p>
          <p>Defense: {pokemon.defense}</p>
          <p></p>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Detail;
