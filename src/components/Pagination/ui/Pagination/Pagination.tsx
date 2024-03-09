import {useEffect, useState} from "react";

import cls from "./Pagination.module.css";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onChange: (numberPage: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const {totalItems, itemsPerPage, onChange} = props;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const incrementPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const decrementPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const onChangePages = (e: { target: { value: string; }; }) => {
    const nextPage = parseInt(e.target.value);
    if (nextPage >= 1 && nextPage <= totalPages) {
      setCurrentPage(nextPage);
    }
  }


useEffect(() => {
  if (currentPage) {
    onChange && onChange(currentPage)
  }
}, [currentPage]);

return (
  <div className={cls.Pagination}>
    <button onClick={goToFirstPage}>&#60; &#60;</button>
    <button onClick={decrementPage}> &#60; </button>
    <input
      type="number"
      className={cls.input}
      value={String(currentPage)}
      onChange={onChangePages}
      min={1}
      max={totalPages}
    /> из {totalPages}
    <button onClick={incrementPage}> &#62;</button>
    <button onClick={goToLastPage}>&#62;   &#62;  </button>
  </div>
)
}