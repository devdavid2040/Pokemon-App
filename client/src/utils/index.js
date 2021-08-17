export const filter = (state, value) => {
  const allPokemons = state.allPokemons;
  const filteredPokemons = state.pokemons;
  const types = state.pokemons
    .map(({ types }) => types)
    .flat()
    .reduce((acc, cur) => {
      if (!acc.includes(cur.name)) {
        acc.push(cur.name);
      }
      return acc;
    }, [])
    .map((elem) => elem);

  if (state.pokemons.length < state.allPokemons.length) {
    if (value === "allTypes") {
      return !filteredPokemons.length
        ? (filteredPokemons[0] = null)
        : filteredPokemons;
    }
    if (types.includes(value)) {
      const results = filteredPokemons.filter(({ types }) => {
        return types.find(({ name }) => name === value);
      });
      return !results.length ? (results[0] = null) : results;
    }
  } else {
    return allPokemons;
  }
};

export const order = (state, value) => {
  switch (value) {
    case "asc":
      return state.pokemons.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (b.name > a.name) return -1;
        return 0;
      });

    case "desc":
      return state.pokemons.sort((a, b) => {
        if (a.name > b.name) return -1;
        if (b.name > a.name) return 1;
        return 0;
      });

    case "min":
      return state.pokemons.sort((a, b) => a.attack - b.attack);

    case "max":
      return state.pokemons.sort((a, b) => b.attack - a.attack);

    case "default":
      return state.allPokemons;

    default:
      return state.allPokemons;
  }
};

export const reduceTypes = (arr) => {
  return arr
    .map((elem) => elem && elem.types)
    .flat()
    .reduce((acc, cur) => {
      if (!acc.includes(cur.name)) {
        acc.push(cur.name);
      }
      return acc;
    }, []);
};
