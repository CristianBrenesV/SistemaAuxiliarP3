import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerContactos, eliminarContacto } from '../services/contactos.service';
import { obtenerTerceroPorId } from '../services/terceros.service';
import type { Contacto } from '../models/Contacto';
import type { Tercero } from '../models/Tercero';
import { Modal, Button } from 'react-bootstrap';

export default function ContactosList() {
  const { idTercero } = useParams<{ idTercero: string }>();
  const navigate = useNavigate();
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [tercero, setTercero] = useState<Tercero | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactoAEliminar, setContactoAEliminar] = useState<{ id: number; nombre: string } | null>(null);

  const cargarContactos = async () => {
    if (idTercero) {
      const data = await obtenerContactos(parseInt(idTercero));
      setContactos(data);
      const terceroData = await obtenerTerceroPorId(parseInt(idTercero));
      setTercero(terceroData);
    }
  };

  useEffect(() => {
    cargarContactos();
  }, [idTercero]);

  const getBadgeColor = (tipo: string) => {
    switch (tipo) {
      case 'Principal': return 'bg-success';
      case 'Facturación': return 'bg-info text-dark';
      case 'Cobros': return 'bg-warning text-dark';
      case 'Soporte': return 'bg-primary';
      default: return 'bg-secondary';
    }
  };

  const abrirModalEliminar = (id: number, nombre: string) => {
    setContactoAEliminar({ id, nombre });
    setShowDeleteModal(true);
  };

  const cerrarModal = () => {
    setShowDeleteModal(false);
    setContactoAEliminar(null);
  };

  const confirmarEliminar = async () => {
    if (idTercero && contactoAEliminar) {
      await eliminarContacto(parseInt(idTercero), contactoAEliminar.id);
      await cargarContactos();
      cerrarModal();
    }
  };

  return (
    <div>
      <h1 className="mt-4">
        Contactos de: <span className="text-primary">{tercero?.Nombre}</span>
      </h1>

      <div className="d-flex mb-3 gap-2">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/terceros')}
        >
          <i className="bi bi-arrow-left"></i> Volver a Terceros
        </button>
        <button
          className="btn btn-dark"
          onClick={() => navigate(`/terceros/${idTercero}/contactos/crear`)}
        >
          <i className="bi bi-plus-circle"></i> Nuevo Contacto
        </button>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cargo</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contactos.map(c => (
            <tr key={c.IdContacto}>
              <td>{c.IdContacto}</td>
              <td><strong>{c.NombreContacto}</strong></td>
              <td>{c.Cargo || '—'}</td>
              <td>{c.Email || '—'}</td>
              <td>{c.Telefono || '—'}</td>
              <td>
                <span className={`badge ${getBadgeColor(c.TipoContacto)}`}>
                  {c.TipoContacto}
                </span>
              </td>
              <td>
                <span className={`badge ${c.Estado === 1 ? 'bg-success' : 'bg-danger'}`}>
                  {c.Estado === 1 ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <button
                  className="btn btn-sm btn-outline-dark me-2"
                  onClick={() => navigate(`/terceros/${idTercero}/contactos/editar/${c.IdContacto}`)}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => abrirModalEliminar(c.IdContacto, c.NombreContacto)}
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showDeleteModal} onHide={cerrarModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Realmente desea eliminar el contacto <strong>{contactoAEliminar?.nombre}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={cerrarModal}>No</Button>
          <Button variant="dark" onClick={confirmarEliminar}>Sí, eliminar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}