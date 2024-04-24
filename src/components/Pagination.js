import { Pagination as BootstrapPagination } from "react-bootstrap";

export default function Pagination({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
}) {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;

  return (
    <div className="d-flex justify-content-center mt-4">
      <BootstrapPagination>
        <BootstrapPagination.Prev
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </BootstrapPagination.Prev>
        <BootstrapPagination.Next
          onClick={() =>
            currentPage < pageCount && onPageChange(currentPage + 1)
          }
          disabled={currentPage === pageCount}
        >
          Next
        </BootstrapPagination.Next>
      </BootstrapPagination>
    </div>
  );
}
