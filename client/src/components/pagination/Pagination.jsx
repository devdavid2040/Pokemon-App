import React from "react";
import "../pagination/Pagination.css";

const Pagination = ({ pokemonsPerPage, allPokemons, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-nav">
      <ul>
        {pageNumbers &&
          pageNumbers.map((num, idx) => (
            <li key={idx}>
              <button onClick={() => paginate(num)}>{num}</button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Pagination;
