import {useState} from "react";

import cls from "./Pagination.module.css";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

export const Pagination = (props: PaginationProps) => {
  const {totalItems, itemsPerPage} = props;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const incrementPage = () => setCurrentPage(prevState => prevState+1);
  const decrementPage = () => setCurrentPage(prevState => prevState-1);

  return (
    <div className={cls.Pagination}>
      <button>&#60; &#60;</button>
      <button onClick={decrementPage}> &#60; </button>
      <input type="number" className={cls.input} defaultValue={currentPage}/> из {totalPages}
      <button onClick={incrementPage}> &#62;</button>
      <button>&#62;   &#62;  </button>
    </div>
  )
}