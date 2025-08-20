import React from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

const generatePages = () => {
  const pages: (number | string)[] = [];
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 5) {
    // Show all pages if 5 or fewer
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1); // always first page

    let left = currentPage - 1;
    let right = currentPage + 1;

    if (currentPage <= 3) {
      // show first few pages
      for (let i = 2; i <= 4; i++) pages.push(i);
      pages.push("...");
    } else if (currentPage >= totalPages - 2) {
      // show last few pages
      pages.push("...");
      for (let i = totalPages - 3; i < totalPages; i++) pages.push(i);
    } else {
      // show middle pages
      pages.push("...");
      for (let i = left; i <= right; i++) pages.push(i);
      pages.push("...");
    }

    pages.push(totalPages); // always last page
  }

  return pages;
};

  return (
    <div className="flex items-center justify-center mt-4 space-x-4">
      {/* Prev button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        &lt;
      </button>

      {/* Page numbers with ... */}
      <div className="flex items-center space-x-2">
        {generatePages().map((page, idx) =>
          typeof page === "number" ? (
            <button
              key={idx}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page
                  ? "bg-teal-600 text-white"
                  : "bg-white text-slate-700"
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={idx} className="px-3 py-1 text-slate-500">
              ...
            </span>
          )
        )}
      </div>

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        &gt;
      </button>

      {/* Page size selector */}
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="ml-4 border px-2 py-1 rounded"
      >
        {[5, 10, 20, 50].map((size) => (
          <option key={size} value={size}>
            {size} per page
          </option>
        ))}
      </select>
    </div>
  );
};
