import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    
    // Siempre mostrar página 1
    pages.push(
      <button
        key={1}
        className={`pagination__number ${currentPage === 1 ? 'pagination__number--active' : ''}`}
        onClick={() => onPageChange(1)}
      >
        1
      </button>
    );

    // Mostrar página 2 si existe
    if (totalPages >= 2) {
      pages.push(
        <button
          key={2}
          className={`pagination__number ${currentPage === 2 ? 'pagination__number--active' : ''}`}
          onClick={() => onPageChange(2)}
        >
          2
        </button>
      );
    }

    // Mostrar página 3 si existe
    if (totalPages >= 3) {
      pages.push(
        <button
          key={3}
          className={`pagination__number ${currentPage === 3 ? 'pagination__number--active' : ''}`}
          onClick={() => onPageChange(3)}
        >
          3
        </button>
      );
    }

    // Mostrar ... si hay más páginas
    if (totalPages > 4) {
      pages.push(
        <span key="ellipsis" className="pagination__ellipsis">
          ...
        </span>
      );
    }

    // Mostrar última página
    if (totalPages > 3) {
      pages.push(
        <button
          key={totalPages}
          className={`pagination__number ${currentPage === totalPages ? 'pagination__number--active' : ''}`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="pagination">
      {/* Previous Buttons */}
      <div className="pagination__controls">
        {/* Doble flecha izquierda - ir a primera página */}
        <button
          className="pagination__button pagination__button--double"
          onClick={() => onPageChange(1)}
          disabled={isFirstPage}
          aria-label="Primera página"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pagination__svg"
          >
            <path
              d="M9 13L5 9L9 5"
              stroke={isFirstPage ? '#B4B4B4' : '#151515'}
              strokeWidth="1.5"
            />
            <path
              d="M13 13L9 9L13 5"
              stroke={isFirstPage ? '#B4B4B4' : '#151515'}
              strokeWidth="1.5"
            />
          </svg>
        </button>

        {/* Flecha izquierda simple - página anterior */}
        <button
          className="pagination__button pagination__button--single"
          onClick={handlePrevious}
          disabled={isFirstPage}
          aria-label="Página anterior"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pagination__svg"
          >
            <path
              d="M11 13L7 9L11 5"
              stroke={isFirstPage ? '#B4B4B4' : '#151515'}
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>

      {/* Page Numbers */}
      <div className="pagination__numbers">
        {renderPageNumbers()}
      </div>

      {/* Next Buttons */}
      <div className="pagination__controls">
        {/* Flecha derecha simple - página siguiente */}
        <button
          className="pagination__button pagination__button--single"
          onClick={handleNext}
          disabled={isLastPage}
          aria-label="Página siguiente"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pagination__svg"
            style={{ transform: 'rotate(180deg)' }}
          >
            <path
              d="M11 13L7 9L11 5"
              stroke={isLastPage ? '#B4B4B4' : '#151515'}
              strokeWidth="1.5"
            />
          </svg>
        </button>

        {/* Doble flecha derecha - ir a última página */}
        <button
          className="pagination__button pagination__button--double"
          onClick={() => onPageChange(totalPages)}
          disabled={isLastPage}
          aria-label="Última página"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pagination__svg"
            style={{ transform: 'rotate(180deg)' }}
          >
            <path
              d="M9 13L5 9L9 5"
              stroke={isLastPage ? '#B4B4B4' : '#151515'}
              strokeWidth="1.5"
            />
            <path
              d="M13 13L9 9L13 5"
              stroke={isLastPage ? '#B4B4B4' : '#151515'}
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;