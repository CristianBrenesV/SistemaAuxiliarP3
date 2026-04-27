import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsuariosTable from '../components/UsuariosTable';
import Paginacion from '../../../core/components/Paginacion';
import DeleteModal from '../components/UsuarioDelete';
import {
  obtenerUsuarios,
  eliminarUsuario,
  cambiarEstadoUsuario,
} from '../services/usuarios.service';
import type { Usuario } from '../models/Usuario';
import type { ApiResponse } from '../../../shared/types/ApiResponse';

export default function UsuariosList() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState<{ id: number; nombre: string } | null>(null);

  const navigate = useNavigate();

  const cargarUsuarios = async (pagina: number = 1) => {
    try {
      const res: ApiResponse<Usuario[]> = await obtenerUsuarios(pagina);
      setUsuarios(res.data);
      setPage(res.page ?? 1);
      setTotalPages(res.totalPages ?? 1);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    }
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      await cargarUsuarios(1);
    };
    fetchUsuarios();
  }, []);

  const cambiarPagina = (nueva: number) => {
    cargarUsuarios(nueva);
  };

  const abrirModalEliminar = (id: number, nombre: string) => {
    setUsuarioAEliminar({ id, nombre });
    setShowDeleteModal(true);
  };

  const cerrarModal = () => {
    setShowDeleteModal(false);
    setUsuarioAEliminar(null);
  };

  const confirmarEliminar = async () => {
    if (!usuarioAEliminar) return;
    await eliminarUsuario(usuarioAEliminar.id);
    await cargarUsuarios(page);
    cerrarModal();
  };

  const handleCambiarEstado = async (id: number, nuevoEstado: string) => {
    try {
      await cambiarEstadoUsuario(id, nuevoEstado);
      await cargarUsuarios(page);
    } catch (error) {
      console.error('Error cambiando estado:', error);
    }
  };

  return (
    <div>
      <h1 className="mt-4">Administración de Usuarios</h1>

      <button
        className="btn btn-dark mb-3"
        onClick={() => navigate('/usuarios/crear')}
      >
        <i className="bi bi-plus-circle"></i> Nuevo
      </button>

      <UsuariosTable
        usuarios={usuarios}
        onEditar={(id: number) => navigate(`/usuarios/editar/${id}`)}
        onEliminar={(id: number, nombre: string) => abrirModalEliminar(id, nombre)}
        onCambiarEstado={handleCambiarEstado}
      />

      {/* Paginación */}
      <Paginacion
        page={page}
        totalPages={totalPages}
        onPageChange={cambiarPagina}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={cerrarModal}
        onConfirm={confirmarEliminar}
        usuario={usuarioAEliminar?.nombre}
      />
    </div>
  );
}