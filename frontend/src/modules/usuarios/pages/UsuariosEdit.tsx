import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerUsuarioPorId, actualizarUsuario } from '../services/usuarios.service';
import type { ActualizarUsuarioDTO } from '../models/UsuarioDTO';

export default function UsuarioEditar() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<ActualizarUsuarioDTO>({
    usuario: '',
    nombreUsuario: '',
    apellidoUsuario: '',
    correoElectronico: '',
    estado: 'Activo'
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const user = await obtenerUsuarioPorId(Number(id));
      if (!user) {
        alert('Usuario no encontrado');
        navigate('/usuarios');
        return;
      }

      setForm({
        usuario: user.usuario,
        nombreUsuario: user.nombreUsuario,
        apellidoUsuario: user.apellidoUsuario,
        correoElectronico: user.correoElectronico,
        estado: user.estado
      });
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await actualizarUsuario(Number(id), form);
      navigate('/usuarios');
    } catch (error) {
      console.error('Error actualizando usuario:', error);
    }
  };

  return (
    <div>
      <h1 className="mt-4">Editar Usuario</h1>

      {/* Botones de acción */}
      <div className="d-flex mb-3 gap-2">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/usuarios')}
        >
          <i className="bi bi-arrow-left me-1"></i> Volver
        </button>

        <button
          className="btn btn-dark"
          form="formEditarUsuario"
          type="submit"
        >
          <i className="bi bi-save me-1"></i> Guardar
        </button>
      </div>

      {/* Card con formulario */}
      <div className="card shadow-sm border-0 p-4" style={{ maxWidth: 500, backgroundColor: '#d9d9d9' }}>
        <form id="formEditarUsuario" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="usuario" className="form-label"><strong>Usuario</strong></label>
            <input
              id="usuario"
              name="usuario"
              value={form.usuario}
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="nombreUsuario" className="form-label"><strong>Nombre</strong></label>
            <input
              id="nombreUsuario"
              name="nombreUsuario"
              value={form.nombreUsuario}
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="apellidoUsuario" className="form-label"><strong>Apellido</strong></label>
            <input
              id="apellidoUsuario"
              name="apellidoUsuario"
              value={form.apellidoUsuario}
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="correoElectronico" className="form-label"><strong>Correo Electrónico</strong></label>
            <input
              id="correoElectronico"
              name="correoElectronico"
              value={form.correoElectronico}
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="estado" className="form-label"><strong>Estado</strong></label>
            <select
              id="estado"
              name="estado"
              value={form.estado}
              className="form-select"
              onChange={handleChange}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Bloqueado">Bloqueado</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}