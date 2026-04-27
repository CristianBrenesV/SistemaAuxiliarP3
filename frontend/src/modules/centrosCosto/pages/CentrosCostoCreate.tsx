import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { crearCentroCosto } from '../services/centrosCosto.service';
import type { CreateCentroCostoDTO } from '../models/CentroCosto';

export default function CentrosCostoCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateCentroCostoDTO>({
    codigo: '',
    nombre: '',
    descripcion: '',
    estado: 1
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearCentroCosto(form);
    navigate('/centros-costo');
  };

  return (
    <div>
      <h1 className="mt-4">Agregar Centro de Costo</h1>

      <div className="d-flex mb-3 gap-2">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/centros-costo')}
        >
          <i className="bi bi-arrow-left"></i> Regresar
        </button>
      </div>

      <div className="card shadow-sm border-0 p-4" style={{ maxWidth: 600, backgroundColor: '#d9d9d9' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label"><strong>Código</strong></label>
            <input name="codigo" className="form-control" value={form.codigo} onChange={handleChange} placeholder="Ej: CC-ADM" required />
            <small className="text-muted">Código único para identificar el centro de costo</small>
          </div>

          <div className="mb-3">
            <label className="form-label"><strong>Nombre</strong></label>
            <input name="nombre" className="form-control" value={form.nombre} onChange={handleChange} placeholder="Ej: Administración" required />
          </div>

          <div className="mb-3">
            <label className="form-label"><strong>Descripción</strong> <small>(opcional)</small></label>
            <textarea name="descripcion" className="form-control" rows={3} value={form.descripcion} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label"><strong>Estado</strong></label>
            <select name="estado" className="form-select" value={form.estado} onChange={handleChange} required>
              <option value={1}>Activo</option>
              <option value={0}>Inactivo</option>
            </select>
          </div>

          <button type="submit" className="btn btn-dark">
            <i className="bi bi-save"></i> Guardar
          </button>
        </form>
      </div>
    </div>
  );
}