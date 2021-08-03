import React from "react";
import { Link } from "react-router-dom";
import "../card/Card.css";

const Card = ({ id, name, image, type }) => {
  return (
    <div className="card-div">
      <Link to={`pokemons/${id}`} className="card-link">
        <img src={image} alt="" />
        <h5 className="pokemon-name">{name}</h5>
        <div className="types-div">
          {type.map((elem, idx) => (
            <span className="pokemonType-span" key={idx}>
              {elem}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default Card;
