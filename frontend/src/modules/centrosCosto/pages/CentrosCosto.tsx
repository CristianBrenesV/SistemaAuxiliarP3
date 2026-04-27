import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Paginacion from '../../../core/components/Paginacion';
import { obtenerCentrosCosto, eliminarCentroCosto } from '../services/centrosCosto.service';
import type { CentroCosto } from '../models/CentroCosto';
import type { ApiResponse } from '../../../shared/types/ApiResponse';
import { Modal, Button } from 'react-bootstrap';

export default function CentrosCostoList() {
  const [centros, setCentros] = useState<CentroCosto[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [centroAEliminar, setCentroAEliminar] = useState<{ id: number; nombre: string; codigo: string } | null>(null);
  const navigate = useNavigate();

  const cargarCentros = async (pagina: number = 1) => {
    try {
      const res: ApiResponse<CentroCosto[]> = await obtenerCentrosCosto(pagina);
      setCentros(res.data);
      setPage(res.page ?? 1);
      setTotalPages(res.totalPages ?? 1);
    } catch (error) {
      console.error('Error cargando centros de costo:', error);
    }
  };

  useEffect(() => {
    cargarCentros(1);
  }, []);

  const cambiarPagina = (nueva: number) => {
    cargarCentros(nueva);
  };

  const abrirModalEliminar = (id: number, nombre: string, codigo: string) => {
    setCentroAEliminar({ id, nombre, codigo });
    setShowDeleteModal(true);
  };

  const cerrarModal = () => {
    setShowDeleteModal(false);
    setCentroAEliminar(null);
  };

  const confirmarEliminar = async () => {
    if (!centroAEliminar) return;
    await eliminarCentroCosto(centroAEliminar.id);
    await cargarCentros(page);
    cerrarModal();
  };

  return (
    <div>
      <h1 className="mt-4">Administración de Centros de Costo</h1>

      <button
        className="btn btn-dark mb-3"
        onClick={() => navigate('/centros-costo/crear')}
      >
        <i className="bi bi-plus-circle"></i> Nuevo Centro de Costo
      </button>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {centros.map(c => (
            <tr key={c.IdCentroCosto}>
              <td>{c.IdCentroCosto}</td>
              <td><strong>{c.Codigo}</strong></td>
              <td>{c.Nombre}</td>
              <td>{c.Descripcion || '—'}</td>
              <td>
                <span className={`badge ${c.Estado === 1 ? 'bg-success' : 'bg-danger'}`}>
                  {c.Estado === 1 ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <button
                  className="btn btn-sm btn-outline-dark me-2"
                  onClick={() => navigate(`/centros-costo/editar/${c.IdCentroCosto}`)}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => abrirModalEliminar(c.IdCentroCosto, c.Nombre, c.Codigo)}
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Paginacion page={page} totalPages={totalPages} onPageChange={cambiarPagina} />

      <Modal show={showDeleteModal} onHide={cerrarModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Realmente desea eliminar el centro de costo <strong>{centroAEliminar?.nombre}</strong> (Código: <strong>{centroAEliminar?.codigo}</strong>)?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={cerrarModal}>No</Button>
          <Button variant="dark" onClick={confirmarEliminar}>Sí, eliminar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}