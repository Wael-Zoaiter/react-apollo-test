import React from 'react';
import './style.scss';

export const Pagination = props => {
  const pagesNumber = props.pagesNumber || null;
  return (
    <nav className="pagination-viewer" aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item">
          <span className="page-link" onClick={props.prevHandler}>Previous</span>
        </li>
        {
          pagesNumber && [...Array(pagesNumber)].map((x, index) => {
            return (
              <li key={index} className="page-item">
                <span className="page-link">{index + 1}</span>
              </li>
            )
          })
        }
        <li className="page-item" onClick={props.nextHandler}>
          <span className="page-link">Next</span>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination;