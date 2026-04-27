import { Modal, Button } from 'react-bootstrap';

interface Props {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  terceroNombre?: string;
}

export default function TerceroDeleteModal({ show, onClose, onConfirm, terceroNombre }: Props) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Realmente desea eliminar el tercero <strong>{terceroNombre}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          No
        </Button>
        <Button variant="dark" onClick={onConfirm}>
          Sí, eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}