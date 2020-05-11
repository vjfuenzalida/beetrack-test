import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './table-pagination.scss';

// The TablePagination component displays arrows to move forward and backwards in a 
// paginated table. If a page is missing (prev or next), that arrow is not shown.
// The arrows trigger the onPageChange with its corresponding new page as parameter.
const TablePagination = (props) => {
  const { prev, next, onPageChange } = props;
  const handlePrev = () => onPageChange(prev);
  const handleNext = () => onPageChange(next);
  return (
    <div className="pagination-container">
      {
        prev ?
        <div className="pagination-button prev-button" onClick={handlePrev}>
          <FontAwesomeIcon icon='arrow-circle-left' size="lg" color="#fab43d"></FontAwesomeIcon>
          <span className="text-c-light-gray text-w-bold">Página anterior</span>
        </div> : null
      }
      {
        next ?
        <div className="pagination-button next-button" onClick={handleNext}>
          <span className="text-c-light-gray text-w-bold">Siguiente página</span>
          <FontAwesomeIcon icon='arrow-circle-right' size="lg" color="#fab43d"></FontAwesomeIcon>
        </div> : null
      }
    </div>
  );
};

export default TablePagination;