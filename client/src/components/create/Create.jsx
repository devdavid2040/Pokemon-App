import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTypes, postPokemon } from "../../actions/index";
import NavBar from "../navBar/NavBar";

const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);

  // const [errors, setErrors] = useState("");

  const [input, setInput] = useState({
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

  console.log(input);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.type.length) {
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
  };

  const handleSelect = (e) => {
    setInput({
      ...input,
      type: [...input.type, e.target.value],
    });
  };

  const handleDelete = (value) => {
    setInput({
      ...input,
      type: input.type.filter((elem) => elem !== value),
    });
  };

  return (
    <div>
      <NavBar />
      <h1>Create your Pokémon!</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            onChange={handleChange}
            required
            autoComplete="off"
            type="text"
            value={input.name}
            name="name"
          />
        </div>

        <div>
          <label>HP</label>
          <input
            onChange={handleChange}
            required
            autoComplete="off"
            type="number"
            value={input.hp}
            name="hp"
          />
        </div>

        <div>
          <label>Attack</label>
          <input
            onChange={handleChange}
            required
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
            required
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
            required
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
            required
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
            required
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
          <label>Type</label>
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
        {input.type.map((elem, idx) => (
          <div key={idx}>
            <label>{elem}</label>
            <button onClick={() => handleDelete(elem)} className="delete-btn">
              x
            </button>
          </div>
        ))}
        <input type="submit" value="Create!" />
      </form>
    </div>
  );
};

export default Create;
