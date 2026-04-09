import React from "react";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Paginacion: React.FC<Props> = ({ page, totalPages, onPageChange }) => {
  const paginas = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Paginación de usuarios" className="mt-4">
      <ul className="pagination pagination-dark justify-content-center">

        {page > 1 && (
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Anterior"
              onClick={() => onPageChange(page - 1)}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
          </li>
        )}

        {paginas.map((p) => (
        <li key={p} className="page-item">
            <button
            className={`page-link ${p === page ? "bg-dark text-white" : "bg-secondary text-dark"}`}
            onClick={() => onPageChange(p)}
            >
            {p}
            </button>
        </li>
        ))}

        {page < totalPages && (
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Siguiente"
              onClick={() => onPageChange(page + 1)}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </li>
        )}

      </ul>
    </nav>
  );
};

export default Paginacion;