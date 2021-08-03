import React from "react";
import Card from "../card/Card";
import "../cards/Cards.css";

const Cards = ({ pokemons }) => {
  return (
    <div className="cards-div">
      {pokemons &&
        pokemons.map((elem) => (
          <Card
            key={elem.id}
            id={elem.id}
            name={elem.name}
            image={elem.image}
            type={elem.type}
          />
        ))}
    </div>
  );
};

export default Cards;
