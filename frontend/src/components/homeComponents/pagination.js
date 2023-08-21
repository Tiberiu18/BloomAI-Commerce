import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const {page,pages,keyword=""} = props;
  return (
    pages > 1 && (
      <nav>
      <ul className="pagination justify-content-center">
        {
          [...Array(pages).keys()].map((x) => (
            <li className={x+1 === page ? `page-item active` : `page-item`}>
          <Link className="page-link" to={keyword ? `/search/${keyword}/page/${x+1}` : `/products/page/${x+1}`}>
            {x+1}
          </Link>
        </li>
          ))
        }
        
      
      </ul>
    </nav>
    )
    
  );
};

export default Pagination;
