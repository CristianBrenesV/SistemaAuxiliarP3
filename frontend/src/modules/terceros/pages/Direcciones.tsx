import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Paginacion from '../../../core/components/Paginacion';
import { obtenerDirecciones, eliminarDireccion } from '../services/direcciones.service';
import { obtenerTerceroPorId } from '../services/terceros.service';
import type { Direccion } from '../models/Direccion';
import type { Tercero } from '../models/Tercero';
import { Modal, Button } from 'react-bootstrap';

export default function DireccionesList() {
  const { idTercero } = useParams<{ idTercero: string }>();
  const navigate = useNavigate();
  const [direcciones, setDirecciones] = useState<Direccion[]>([]);
  const [tercero, setTercero] = useState<Tercero | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [direccionAEliminar, setDireccionAEliminar] = useState<{ id: number; alias: string } | null>(null);

  const cargarDirecciones = async () => {
    if (idTercero) {
      const data = await obtenerDirecciones(parseInt(idTercero));
      setDirecciones(data);
      const terceroData = await obtenerTerceroPorId(parseInt(idTercero));
      setTercero(terceroData);
    }
  };

  useEffect(() => {
    cargarDirecciones();
  }, [idTercero]);

  const abrirModalEliminar = (id: number, alias: string) => {
    setDireccionAEliminar({ id, alias });
    setShowDeleteModal(true);
  };

  const cerrarModal = () => {
    setShowDeleteModal(false);
    setDireccionAEliminar(null);
  };

  const confirmarEliminar = async () => {
    if (idTercero && direccionAEliminar) {
      await eliminarDireccion(parseInt(idTercero), direccionAEliminar.id);
      await cargarDirecciones();
      cerrarModal();
    }
  };

  return (
    <div>
      <h1 className="mt-4">
        Direcciones de: <span className="text-primary">{tercero?.Nombre}</span>
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
          onClick={() => navigate(`/terceros/${idTercero}/direcciones/crear`)}
        >
          <i className="bi bi-plus-circle"></i> Nueva Dirección
        </button>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Alias</th>
            <th>Provincia</th>
            <th>Cantón</th>
            <th>Distrito</th>
            <th>Dirección Exacta</th>
            <th>Principal</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {direcciones.map(d => (
            <tr key={d.IdDireccion}>
              <td>{d.IdDireccion}</td>
              <td><strong>{d.Alias}</strong></td>
              <td>{d.Provincia}</td>
              <td>{d.Canton}</td>
              <td>{d.Distrito}</td>
              <td>{d.DireccionExacta}</td>
              <td className="text-center">
                <span className={`badge ${d.EsPrincipal === 1 ? 'bg-success' : 'bg-secondary'}`}>
                  {d.EsPrincipal === 1 ? 'Sí' : 'No'}
                </span>
              </td>
              <td>
                <span className={`badge ${d.Estado === 1 ? 'bg-success' : 'bg-danger'}`}>
                  {d.Estado === 1 ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <button
                  className="btn btn-sm btn-outline-dark me-2"
                  onClick={() => navigate(`/terceros/${idTercero}/direcciones/editar/${d.IdDireccion}`)}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => abrirModalEliminar(d.IdDireccion, d.Alias)}
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
          ¿Realmente desea eliminar la dirección <strong>{direccionAEliminar?.alias}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={cerrarModal}>No</Button>
          <Button variant="dark" onClick={confirmarEliminar}>Sí, eliminar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}