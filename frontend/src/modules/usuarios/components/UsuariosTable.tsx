import { useState } from 'react';
import type { Usuario } from '../models/Usuario';

interface Props {
  usuarios: Usuario[];
  onEditar: (id: number) => void;
  onEliminar: (id: number, nombre: string) => void;
  onCambiarEstado: (id: number, nuevoEstado: string) => void;
}

const ESTADOS = ['Activo', 'Inactivo', 'Bloqueado'];

export default function UsuariosTable({ usuarios, onEditar, onEliminar, onCambiarEstado }: Props) {
  const [estados, setEstados] = useState<Record<number, string>>(
    usuarios.reduce((acc, u) => ({ ...acc, [u.idUsuario]: u.estado }), {})
  );

  const handleEstadoChange = (id: number, nuevoEstado: string) => {
    setEstados(prev => ({ ...prev, [id]: nuevoEstado }));
    onCambiarEstado(id, nuevoEstado); 
  };

  return (
    <table className="table table-bordered table-striped">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Usuario</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Correo</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map(u => (
          <tr key={u.idUsuario}>
            <td>{u.idUsuario}</td>
            <td>{u.usuario}</td>
            <td>{u.nombreUsuario}</td>
            <td>{u.apellidoUsuario}</td>
            <td>{u.correoElectronico}</td>
            <td style={{ whiteSpace: 'nowrap', minWidth: 120 }}>
              <select
                className="form-select form-select-sm hover-select"
                value={estados[u.idUsuario]}
                onChange={e => handleEstadoChange(u.idUsuario, e.target.value)}
              >
                {ESTADOS.map(e => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </td>
            <td style={{ whiteSpace: 'nowrap' }}>
              <button
                className="btn btn-sm btn-outline-dark me-2"
                onClick={() => onEditar(u.idUsuario)}
              >
                <i className="bi bi-pencil-square"></i> Editar
              </button>

              <button
                className="btn btn-sm btn-danger"
                onClick={() => onEliminar(u.idUsuario, u.usuario)} // id y nombre
              >
                <i className="bi bi-trash3"></i> Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}