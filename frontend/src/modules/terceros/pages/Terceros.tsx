import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TercerosTable from '../components/TercerosTable';
import Paginacion from '../../../core/components/Paginacion';
import TerceroDeleteModal from '../components/TerceroDelete';
import { obtenerTerceros, eliminarTercero } from '../services/terceros.service';
import type { Tercero } from '../models/Tercero';
import type { ApiResponse } from '../../../shared/types/ApiResponse';

export default function TercerosList() {
  const [terceros, setTerceros] = useState<Tercero[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [terceroAEliminar, setTerceroAEliminar] = useState<{ id: number; nombre: string } | null>(null);
  const navigate = useNavigate();

  const cargarTerceros = async (pagina: number = 1) => {
    try {
      const res: ApiResponse<Tercero[]> = await obtenerTerceros(pagina);
      setTerceros(res.data);
      setPage(res.page ?? 1);
      setTotalPages(res.totalPages ?? 1);
    } catch (error) {
      console.error('Error cargando terceros:', error);
    }
  };

  useEffect(() => {
    cargarTerceros(1);
  }, []);

  const cambiarPagina = (nueva: number) => {
    cargarTerceros(nueva);
  };

  const abrirModalEliminar = (id: number, nombre: string) => {
    setTerceroAEliminar({ id, nombre });
    setShowDeleteModal(true);
  };

  const cerrarModal = () => {
    setShowDeleteModal(false);
    setTerceroAEliminar(null);
  };

  const confirmarEliminar = async () => {
    if (!terceroAEliminar) return;
    await eliminarTercero(terceroAEliminar.id);
    await cargarTerceros(page);
    cerrarModal();
  };

  return (
    <div>
      <h1 className="mt-4">Administración de Terceros</h1>

      <button
        className="btn btn-dark mb-3"
        onClick={() => navigate('/terceros/crear')}
      >
        <i className="bi bi-plus-circle"></i> Nuevo Tercero
      </button>

      <TercerosTable
        terceros={terceros}
        onEditar={(id: number) => navigate(`/terceros/editar/${id}`)}
        onEliminar={abrirModalEliminar}
      />

      <Paginacion
        page={page}
        totalPages={totalPages}
        onPageChange={cambiarPagina}
      />

      <TerceroDeleteModal
        show={showDeleteModal}
        onClose={cerrarModal}
        onConfirm={confirmarEliminar}
        terceroNombre={terceroAEliminar?.nombre}
      />
    </div>
  );
}