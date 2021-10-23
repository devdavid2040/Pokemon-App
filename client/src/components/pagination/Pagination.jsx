import React from "react";
import "../pagination/Pagination.css";

const Pagination = ({ pokemonsPerPage, allPokemons, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-nav">
      {pageNumbers.length && allPokemons > pokemonsPerPage
        ? pageNumbers.map((num, idx) => (
            <span key={idx} onClick={() => paginate(num)}>
              {num}
            </span>
          ))
        : null}
    </nav>
  );
};

export default Pagination;
