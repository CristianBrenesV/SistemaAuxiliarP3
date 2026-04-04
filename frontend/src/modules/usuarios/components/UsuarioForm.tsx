import { useState } from 'react';
import type { CrearUsuarioDTO, UsuarioFormProps } from '../models/UsuarioDTO';

export default function UsuarioForm({ initialData, onSubmit }: UsuarioFormProps) {

  const [form, setForm] = useState<CrearUsuarioDTO>({
    usuario: initialData?.usuario ?? '',
    nombreUsuario: initialData?.nombreUsuario ?? '',
    apellidoUsuario: initialData?.apellidoUsuario ?? '',
    correoElectronico: initialData?.correoElectronico ?? '',
    estado: initialData?.estado ?? 'Activo',
    clave: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="usuario"
        className="form-control mb-2"
        placeholder="Usuario"
        onChange={handleChange}
        value={form.usuario}
      />

      <input
        name="nombreUsuario"
        className="form-control mb-2"
        placeholder="Nombre"
        onChange={handleChange}
        value={form.nombreUsuario}
      />

      <input
        name="apellidoUsuario"
        className="form-control mb-2"
        placeholder="Apellido"
        onChange={handleChange}
        value={form.apellidoUsuario}
      />

      <input
        name="correoElectronico"
        className="form-control mb-2"
        placeholder="Correo"
        onChange={handleChange}
        value={form.correoElectronico}
      />

      <select
        name="estado"
        className="form-select mb-2"
        onChange={handleChange}
        value={form.estado}
      >
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
        <option value="Bloqueado">Bloqueado</option>
      </select>

      <input
        type="password"
        name="clave"
        className="form-control mb-2"
        placeholder="Clave"
        onChange={handleChange}
        value={form.clave}
      />

      <button className="btn btn-dark">Guardar</button>
    </form>
  );
}