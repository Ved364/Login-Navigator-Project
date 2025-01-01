type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
};

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary m-1"
        onClick={handlePrevPage}
        disabled={currentPage === 0}
      >
        Previous Page
      </button>

      <button
        type="button"
        className="btn btn-primary m-1"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
