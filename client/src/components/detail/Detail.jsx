import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetail } from "../../redux/actions/index";
import NavBar from "../navBar/NavBar";
import Spinner from "../spinner/Spinner";
import "./Detail.css";

const Detail = ({ match }) => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.detail);
  const { id } = match.params;

  useEffect(() => {
    dispatch(getDetail(id));
  }, [id, dispatch]);

  return (
    <React.Fragment>
      <NavBar />
      <div className="detail-container">
        {Object.keys(pokemon).length && String(pokemon.id) === String(id) ? (
          <div className="detail-card">
            <div className="detail-title">
              <h2>{pokemon.name}</h2>
            </div>

            <div className="detail-content">
              <div className="detail-image">
                <img src={pokemon.image} alt="" />
              </div>

              <div className="detail-description">
                <div>
                  <p>ID: {pokemon.id}</p>
                </div>
                <div className="detail-description-columns">
                  <div className="detail-description-column">
                    <p>Hp: {pokemon.hp}</p>
                    <p>Attack: {pokemon.attack}</p>
                    <p>Defense: {pokemon.defense}</p>
                  </div>
                  <div className="detail-description-column">
                    <p>Speed: {pokemon.speed}</p>
                    <p>Height: {pokemon.height}</p>
                    <p>Weight: {pokemon.weight}</p>
                  </div>
                </div>
                <div>
                  <p>
                    Types: {pokemon.types.map((elem) => elem.name).join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </React.Fragment>
  );
};

export default React.memo(Detail);
