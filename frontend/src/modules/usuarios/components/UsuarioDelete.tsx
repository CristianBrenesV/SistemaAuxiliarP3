interface Props {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  usuario?: string;
}

export default function DeleteModal({ show, onClose, onConfirm, usuario }: Props) {
  if (!show) return null;

  return (
    <div className="modal fade show d-block">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Confirmar Eliminación</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            ¿Eliminar usuario <strong>{usuario}</strong>?
          </div>

          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onClose}>
              No
            </button>

            <button className="btn btn-dark" onClick={onConfirm}>
              Sí, eliminar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}