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

    default:
      return state.allPokemons;
  }
};

export const reduceTypes = (arr) => {
  return arr
    .map(({ types }) => types && types)
    .flat()
    .reduce((acc, cur) => {
      if (!acc.includes(cur.name)) {
        acc.push(cur.name);
      }
      return acc;
    }, []);
};
