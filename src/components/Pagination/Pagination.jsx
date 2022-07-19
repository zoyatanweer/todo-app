import React from "react";
import "./Pagination.css";

const Pagination = ({ paginate }) => {
  const pageNumbers = [];

  for (let i = 10; i <= 50; i = i + 10) {
    pageNumbers.push(i / 10);
  }
  return (
    <>
      <div>
        <ul className="page-numbers-section">
          {pageNumbers.map((number) => {
            return (
              <li key={number} className="page-number ">
                <a href="#" onClick={() => paginate(number)}>
                  {number}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export { Pagination };
