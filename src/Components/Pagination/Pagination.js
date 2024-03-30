/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Pagination.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Pagination({ items, itemCount, pathname, setShownItems,}) {
  const { page } = useParams();
  const [pageCount, setPageCount] = useState(null);

  useEffect(() => {
    let endIndex = itemCount * page;
    let startIndex = endIndex - itemCount;
    let paginatedItems = items.slice(startIndex, endIndex);
    setShownItems(paginatedItems);
    let pageNumber = Math.ceil(items.length / itemCount);
    setPageCount(pageNumber);
  }, [page, items]);

  return (
    <div className="courses-pagination">
      <ul className="courses__pagination-list">
        {Array(pageCount).fill(0).map((item, index) => (<li className="courses__pagination-item">
              {index + 1 === Number(page) ? (
                <Link
                  to={`${pathname}/${index + 1}`}
                  className="courses__pagination-link courses__pagination-link--active"
                >
                  {index + 1}
                </Link>
              ) : (
                <Link  to={`${pathname}/${index + 1}`}  className="courses__pagination-link "  >  {index + 1} </Link>
              )}
            </li>
          ))}
       
      </ul>
    </div>
  );
}
