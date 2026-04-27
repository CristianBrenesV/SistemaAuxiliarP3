import { useState, useEffect } from 'react';
import type { CreateTerceroDTO } from '../models/Tercero';

interface Props {
  initialData?: CreateTerceroDTO;
  onSubmit: (data: CreateTerceroDTO) => Promise<void>;
}

export default function TerceroForm({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState<CreateTerceroDTO>({
    identificacion: '',
    nombre: '',
    tipo: 'Otro',
    email: '',
    telefono: '',
    estado: 1
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <div className="card shadow-sm border-0 p-4" style={{ maxWidth: 600, backgroundColor: '#d9d9d9' }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label"><strong>Identificación</strong></label>
          <input
            name="identificacion"
            className="form-control"
            value={form.identificacion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label"><strong>Nombre / Razón Social</strong></label>
          <input
            name="nombre"
            className="form-control"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label"><strong>Tipo</strong></label>
          <select
            name="tipo"
            className="form-select"
            value={form.tipo}
            onChange={handleChange}
            required
          >
            <option value="Cliente">Cliente</option>
            <option value="Proveedor">Proveedor</option>
            <option value="Empleado">Empleado</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label"><strong>Email</strong> <small>(opcional)</small></label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={form.email || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label"><strong>Teléfono</strong> <small>(opcional)</small></label>
          <input
            name="telefono"
            className="form-control"
            value={form.telefono || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label"><strong>Estado</strong></label>
          <select
            name="estado"
            className="form-select"
            value={form.estado}
            onChange={handleChange}
            required
          >
            <option value={1}>Activo</option>
            <option value={0}>Inactivo</option>
          </select>
        </div>

        <button type="submit" className="btn btn-dark">
          <i className="bi bi-save"></i> Guardar
        </button>
      </form>
    </div>
  );
}