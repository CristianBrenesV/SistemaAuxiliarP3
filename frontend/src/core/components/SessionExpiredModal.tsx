
interface Props {
  show: boolean;
  onConfirm: () => void;
}

export default function SessionExpiredModal({ show, onConfirm }: Props) {
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Sesión caducada</h5>
            </div>

            <div className="modal-body">
              <p>
                Tu sesión ha expirado por inactividad. Debes iniciar sesión nuevamente.
              </p>
            </div>

            <div className="modal-footer">
              <button className="btn btn-dark" onClick={onConfirm}>
                Iniciar sesión
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}