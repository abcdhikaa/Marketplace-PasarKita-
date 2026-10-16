function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-[#F8F6F2] ">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-0.5 text-sm md:text-base border hover:shadow-md rounded-md disabled:opacity-40 disabled:hover:shadow-none"
      >
        ← Previous
      </button>
      <span className="text-sm md:text-base text-gray-500">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-0.5 text-sm md:text-base border hover:shadow-md rounded-md disabled:opacity-40 disabled:hover:shadow-none"
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;
