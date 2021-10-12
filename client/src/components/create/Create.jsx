import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTypes, postPokemon } from "../../redux/actions/index";
import NavBar from "../navBar/NavBar";
import validate from "../../utils/validate";
import swal from "sweetalert";
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

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      swal("Complete all inputs correctly");
    } else if (!input.types.length) {
      swal("Select at least one type");
    } else {
      dispatch(postPokemon(input));
      swal({
        title: "Pokemon successfully created!",
        icon: "success",
      }).then(() => {
        history.push("/home");
        setInput({
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
      });
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
      types: input.types.includes(e.target.value)
        ? [...input.types]
        : [...input.types, e.target.value],
    });
  };

  const handleDelete = (e, value) => {
    e.preventDefault();
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
              autoComplete="off"
              type="text"
              value={input.name}
              name="name"
              required
            />
            {errors.name && <p className="danger">{errors.name}</p>}
          </div>

          <div>
            <label>HP</label>
            <input
              className={errors.hp && "danger"}
              onChange={handleChange}
              autoComplete="off"
              type="number"
              min="0"
              value={input.hp}
              name="hp"
              required
            />
            {errors.hp && <p className="danger">{errors.hp}</p>}
          </div>

          <div>
            <label>Attack</label>
            <input
              className={errors.attack && "danger"}
              onChange={handleChange}
              autoComplete="off"
              type="number"
              min="0"
              value={input.attack}
              name="attack"
              required
            />
            {errors.attack && <p className="danger">{errors.attack}</p>}
          </div>

          <div>
            <label>Defense</label>
            <input
              className={errors.defense && "danger"}
              onChange={handleChange}
              autoComplete="off"
              type="number"
              min="0"
              value={input.defense}
              name="defense"
              required
            />
            {errors.defense && <p className="danger">{errors.defense}</p>}
          </div>

          <div>
            <label>Speed</label>
            <input
              className={errors.speed && "danger"}
              onChange={handleChange}
              autoComplete="off"
              type="number"
              min="0"
              value={input.speed}
              name="speed"
              required
            />
            {errors.speed && <p className="danger">{errors.speed}</p>}
          </div>

          <div>
            <label>Height</label>
            <input
              className={errors.height && "danger"}
              onChange={handleChange}
              autoComplete="off"
              type="number"
              min="0"
              value={input.height}
              name="height"
              required
            />
            {errors.height && <p className="danger">{errors.height}</p>}
          </div>

          <div>
            <label>Weight</label>
            <input
              className={errors.weight && "danger"}
              onChange={handleChange}
              autoComplete="off"
              type="number"
              min="0"
              value={input.weight}
              name="weight"
              required
            />
            {errors.weight && <p className="danger">{errors.weight}</p>}
          </div>

          <div>
            <label>Image</label>
            <input
              className={errors.image && "danger"}
              onChange={handleChange}
              autoComplete="off"
              type="url"
              pattern="https://.*"
              placeholder="https://example.com (Optional)"
              value={input.image}
              name="image"
            />
            {errors.image && <p className="danger">{errors.image}</p>}
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
            {errors.types && <p className="danger">{errors.types}</p>}
          </div>

          <div className="types-selected">
            {input.types.map((elem, idx) => (
              <div key={idx}>
                <label>
                  {elem}
                  <button onClick={(e) => handleDelete(e, elem)}>x</button>
                </label>
              </div>
            ))}
          </div>

          <input id="submit-btn" type="submit" value="Create!" />
        </form>
      </div>
    </>
  );
};

export default Create;
