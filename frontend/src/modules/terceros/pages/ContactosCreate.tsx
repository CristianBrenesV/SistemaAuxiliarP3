import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { crearContacto } from '../services/contactos.service';
import { obtenerTerceroPorId } from '../services/terceros.service';
import type { CreateContactoDTO } from '../models/Contacto';
import type { Tercero } from '../models/Tercero';

export default function ContactosCreate() {
  const { idTercero } = useParams<{ idTercero: string }>();
  const navigate = useNavigate();
  const [tercero, setTercero] = useState<Tercero | null>(null);
  const [form, setForm] = useState<CreateContactoDTO>({
    nombreContacto: '',
    cargo: '',
    email: '',
    telefono: '',
    tipoContacto: 'Otro',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (idTercero) {
      await crearContacto(parseInt(idTercero), form);
      navigate(`/terceros/${idTercero}/contactos`);
    }
  };

  return (
    <div>
      <h1 className="mt-4">
        Agregar Contacto para: <span className="text-primary">{tercero?.Nombre}</span>
      </h1>

      <div className="d-flex mb-3 gap-2">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate(`/terceros/${idTercero}/contactos`)}
        >
          <i className="bi bi-arrow-left"></i> Regresar a Contactos
        </button>
      </div>

      <div className="card shadow-sm border-0 p-4" style={{ maxWidth: 600, backgroundColor: '#d9d9d9' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label"><strong>Nombre del Contacto</strong></label>
            <input name="nombreContacto" className="form-control" value={form.nombreContacto} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label"><strong>Cargo / Rol</strong> <small>(opcional)</small></label>
            <input name="cargo" className="form-control" value={form.cargo} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label"><strong>Email</strong> <small>(opcional)</small></label>
            <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label"><strong>Teléfono</strong> <small>(opcional)</small></label>
            <input name="telefono" className="form-control" value={form.telefono} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label"><strong>Tipo de Contacto</strong></label>
            <select name="tipoContacto" className="form-select" value={form.tipoContacto} onChange={handleChange} required>
              <option value="Principal">Principal</option>
              <option value="Facturación">Facturación</option>
              <option value="Cobros">Cobros</option>
              <option value="Soporte">Soporte</option>
              <option value="Otro">Otro</option>
            </select>
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