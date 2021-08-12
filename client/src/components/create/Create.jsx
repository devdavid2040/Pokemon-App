import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTypes, postPokemon } from "../../actions/index";
import NavBar from "../navBar/NavBar";
import validate from "../../utils/validate";
import "./Create.css";

const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    types: [],
  });

  console.log(input);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors) {
      return alert("Complete all inputs")
    }
    if (!input.types.length) {
      alert("Type can't be empty");
    } else {
      dispatch(postPokemon(input));
      alert("Pokemon successfully created!");
      setInput({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
        type: [],
      });
      history.push("/home");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelect = (e) => {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  };

  const handleDelete = (value) => {
    setInput({
      ...input,
      types: input.types.filter((elem) => elem !== value),
    });
  };

  return (
    <>
      <NavBar />
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <h1>Create your Pokémon!</h1>
          <div>
            <label>Name</label>
            <input
              className={errors.name && "danger"}
              onChange={handleChange}
              // required
              autoComplete="off"
              type="text"
              value={input.name}
              name="name"
            />
            {errors.name && <p className="danger">{errors.name}</p>}
          </div>

          <div>
            <label>HP</label>
            <input
              className={errors.hp && "danger"}
              onChange={handleChange}
              // required
              autoComplete="off"
              type="text"
              value={input.hp}
              name="hp"
            />
            {errors.hp && <p className="danger">{errors.hp}</p>}
          </div>

          <div>
            <label>Attack</label>
            <input
              onChange={handleChange}
              // required
              autoComplete="off"
              type="number"
              value={input.attack}
              name="attack"
            />
          </div>

          <div>
            <label>Defense</label>
            <input
              onChange={handleChange}
              // required
              autoComplete="off"
              type="number"
              value={input.defense}
              name="defense"
            />
          </div>

          <div>
            <label>Speed</label>
            <input
              onChange={handleChange}
              // required
              autoComplete="off"
              type="number"
              value={input.speed}
              name="speed"
            />
          </div>

          <div>
            <label>Height</label>
            <input
              onChange={handleChange}
              // required
              autoComplete="off"
              type="number"
              value={input.height}
              name="height"
            />
          </div>

          <div>
            <label>Weight</label>
            <input
              onChange={handleChange}
              // required
              autoComplete="off"
              type="number"
              value={input.weight}
              name="weight"
            />
          </div>

          <div>
            <label>Image</label>
            <input
              onChange={handleChange}
              autoComplete="off"
              type="text"
              value={input.image}
              name="image"
            />
          </div>

          <div>
            <label>Types</label>
            <select defaultValue={"default"} onChange={handleSelect}>
              <option value="default" disabled>
                Select types for your Pokemon
              </option>
              {types.length &&
                types.map((elem) => (
                  <option key={elem.id} value={elem.name}>
                    {elem.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            {input.types.map((elem, idx) => (
              <div key={idx}>
                <label>{elem}</label>
                <button
                  onClick={() => handleDelete(elem)}
                  className="delete-btn"
                >
                  x
                </button>
              </div>
            ))}
          </div>

          <input type="submit" value="Create!" />
        </form>
      </div>
    </>
  );
};

export default Create;
