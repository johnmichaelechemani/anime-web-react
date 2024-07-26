import PropTypes from "prop-types";

export default function Pagination({
  currentPage,
  handlePageChange,
  totalPages,
}) {
  return (
    <>
      <div className="flex justify-end items-center px-8 my-2">
        <div className="join">
          <button
            className="join-item btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            «
          </button>
          <button className="join-item btn">{currentPage}</button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="join-item btn"
          >
            »
          </button>
        </div>
      </div>
    </>
  );
}
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};
