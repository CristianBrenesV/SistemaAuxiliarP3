import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearUsuario } from '../services/usuarios.service';
import type { CrearUsuarioDTO } from '../models/UsuarioDTO';

export default function UsuarioCrear() {
  const navigate = useNavigate();

  const [form, setForm] = useState<CrearUsuarioDTO>({
    usuario: '',
    nombreUsuario: '',
    apellidoUsuario: '',
    correoElectronico: '',
    clave: '',
    estado: 'Activo'
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearUsuario(form);
    navigate('/usuarios');
  };

  const togglePassword = (id: string) => {
    const input = document.getElementById(id) as HTMLInputElement;
    const icon = document.getElementById('icon_' + id) as HTMLElement;
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.replace('bi-eye-slash', 'bi-eye');
    } else {
      input.type = 'password';
      icon.classList.replace('bi-eye', 'bi-eye-slash');
    }
  };

  const autogenerarClave = () => {
    const clave = Math.random().toString(36).slice(-8);
    setForm(prev => ({ ...prev, clave }));
    const input = document.getElementById('clave') as HTMLInputElement;
    const confirmar = document.getElementById('confirmarClave') as HTMLInputElement;
    if (input) input.value = clave;
    if (confirmar) confirmar.value = clave;
  };

  return (
    <div>
      <h1 className="mt-4">Agregar Usuario</h1>

      <div className="d-flex mb-3 gap-2">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/usuarios')}
        >
          <i className="bi bi-arrow-left me-1"></i> Volver
        </button>

        <button
          className="btn btn-dark"
          onClick={handleSubmit}
        >
          <i className="bi bi-save me-1"></i> Guardar
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={autogenerarClave}
        >
          <i className="bi bi-key me-1"></i> Autogenerar clave
        </button>
      </div>

      <div className="card shadow-sm border-0 p-4" style={{ maxWidth: 500, backgroundColor: '#d9d9d9' }}>
        <form onSubmit={handleSubmit}>
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

          <div className="mb-3 position-relative">
            <label htmlFor="clave" className="form-label"><strong>Clave</strong></label>
            <div className="input-group">
              <input
                id="clave"
                name="clave"
                type="password"
                value={form.clave}
                className="form-control"
                onChange={handleChange}
              />
              <span className="input-group-text" onClick={() => togglePassword('clave')}>
                <i className="bi bi-eye-slash" id="icon_clave"></i>
              </span>
            </div>
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
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}