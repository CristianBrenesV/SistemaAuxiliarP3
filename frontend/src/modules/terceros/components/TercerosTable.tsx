import { useState } from 'react';
import type { Tercero } from '../models/Tercero';

interface Props {
  terceros: Tercero[];
  onEditar: (id: number) => void;
  onEliminar: (id: number, nombre: string) => void;
}

export default function TercerosTable({ terceros, onEditar, onEliminar }: Props) {
  return (
    <table className="table table-bordered table-striped">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Identificación</th>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Estado</th>
          <th>Direcciones</th>
          <th>Contactos</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {terceros.map(t => (
          <tr key={t.IdTercero}>
            <td>{t.IdTercero}</td>
            <td>{t.Identificacion}</td>
            <td>{t.Nombre}</td>
            <td>
              <span className={`badge ${t.TipoTercero === 'Cliente' ? 'bg-success' : t.TipoTercero === 'Proveedor' ? 'bg-warning text-dark' : t.TipoTercero === 'Empleado' ? 'bg-info text-dark' : 'bg-secondary'}`}>
                {t.TipoTercero}
              </span>
            </td>
            <td>{t.Email || '—'}</td>
            <td>{t.Telefono || '—'}</td>
            <td>
              <span className={`badge ${t.Estado === 1 ? 'bg-success' : 'bg-danger'}`}>
                {t.Estado === 1 ? 'Activo' : 'Inactivo'}
              </span>
            </td>
            <td>
              <button
                className="btn btn-sm btn-outline-info"
                onClick={() => window.location.href = `/terceros/${t.IdTercero}/direcciones`}
                title="Direcciones"
              >
                <i className="bi bi-geo-alt"></i>
              </button>
            </td>
            <td>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => window.location.href = `/terceros/${t.IdTercero}/contactos`}
                title="Contactos"
              >
                <i className="bi bi-person-lines-fill"></i>
              </button>
            </td>
            <td style={{ whiteSpace: 'nowrap' }}>
              <button
                className="btn btn-sm btn-outline-dark me-2"
                onClick={() => onEditar(t.IdTercero)}
              >
                <i className="bi bi-pencil-square"></i> Editar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onEliminar(t.IdTercero, t.Nombre)}
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