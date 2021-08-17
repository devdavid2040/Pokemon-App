import React from "react";
import Card from "../card/Card";
import Spinner from "../spinner/Spinner";
import "../cards/Cards.css";

const Cards = ({ pokemons }) => {
  return (
    <div className="cards-div">
      {!pokemons || !pokemons.length ? (
        <Spinner />
      ) : (
        pokemons &&
        pokemons.map((elem) => (
          <Card
            key={elem.id}
            id={elem.id}
            name={elem.name}
            image={elem.image}
            types={elem.types}
            createdInDb={elem.createdInDb ? elem.createdInDb : null}
          />
        ))
      )}
    </div>
  );
};

export default React.memo(Cards);
