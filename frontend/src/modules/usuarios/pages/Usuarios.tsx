import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsuariosTable from '../components/UsuariosTable';
import DeleteModal from '../components/UsuarioDelete';
import {
  obtenerUsuarios,
  eliminarUsuario,
  cambiarEstadoUsuario,
} from '../services/usuarios.service';
import type { Usuario } from '../models/Usuario';

export default function UsuariosList() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState<{ id: number; nombre: string } | null>(null);

  const navigate = useNavigate();

  const cargarUsuarios = async (): Promise<void> => {
    const res = await obtenerUsuarios();
    setUsuarios(res.data);
  };

  useEffect(() => {
    const fetch = async () => {
      await cargarUsuarios();
    };
    fetch();
  }, []);

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
    await cargarUsuarios();
    cerrarModal();
  };

  const handleCambiarEstado = async (id: number, nuevoEstado: string) => {
    try {
      await cambiarEstadoUsuario(id, nuevoEstado);
      await cargarUsuarios();
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

      <DeleteModal
        show={showDeleteModal}
        onClose={cerrarModal}
        onConfirm={confirmarEliminar}
        usuario={usuarioAEliminar?.nombre}
      />
    </div>
  );
}