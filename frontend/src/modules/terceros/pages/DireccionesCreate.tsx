import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { crearDireccion } from '../services/direcciones.service';
import { obtenerTerceroPorId } from '../services/terceros.service';
import type { CreateDireccionDTO } from '../models/Direccion';
import type { Tercero } from '../models/Tercero';

export default function DireccionesCreate() {
  const { idTercero } = useParams<{ idTercero: string }>();
  const navigate = useNavigate();
  const [tercero, setTercero] = useState<Tercero | null>(null);
  const [form, setForm] = useState<CreateDireccionDTO>({
    alias: '',
    provincia: '',
    canton: '',
    distrito: '',
    direccionExacta: '',
    esPrincipal: false,
    estado: 1
  });

  useEffect(() => {
    const fetchTercero = async () => {
      if (idTercero) {
        const data = await obtenerTerceroPorId(parseInt(idTercero));
        setTercero(data);
      }
    };
    fetchTercero();
  }, [idTercero]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (idTercero) {
      await crearDireccion(parseInt(idTercero), form);
      navigate(`/terceros/${idTercero}/direcciones`);
    }
  };

  return (
    <div>
      <h1 className="mt-4">
        Agregar Dirección para: <span className="text-primary">{tercero?.Nombre}</span>
      </h1>

      <div className="d-flex mb-3 gap-2">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate(`/terceros/${idTercero}/direcciones`)}
        >
          <i className="bi bi-arrow-left"></i> Regresar a Direcciones
        </button>
      </div>

      <div className="card shadow-sm border-0 p-4" style={{ maxWidth: 600, backgroundColor: '#d9d9d9' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label"><strong>Alias / Nombre</strong></label>
            <input
              name="alias"
              className="form-control"
              value={form.alias}
              onChange={handleChange}
              placeholder="Ej: Casa, Oficina, Bodega"
              required
            />
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label"><strong>Provincia</strong></label>
              <input name="provincia" className="form-control" value={form.provincia} onChange={handleChange} required />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label"><strong>Cantón</strong></label>
              <input name="canton" className="form-control" value={form.canton} onChange={handleChange} required />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label"><strong>Distrito</strong></label>
              <input name="distrito" className="form-control" value={form.distrito} onChange={handleChange} required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label"><strong>Dirección Exacta</strong></label>
            <textarea name="direccionExacta" className="form-control" rows={2} value={form.direccionExacta} onChange={handleChange} required />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              name="esPrincipal"
              className="form-check-input"
              checked={form.esPrincipal}
              onChange={handleChange}
            />
            <label className="form-check-label">
              <strong>Dirección Principal</strong>
            </label>
            <small className="text-muted d-block">(Solo una puede ser principal)</small>
          </div>

          <div className="mb-3">
            <label className="form-label"><strong>Estado</strong></label>
            <select name="estado" className="form-select" value={form.estado} onChange={handleChange} required>
              <option value={1}>Activa</option>
              <option value={0}>Inactiva</option>
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