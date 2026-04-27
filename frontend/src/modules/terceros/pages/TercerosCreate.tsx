import { useNavigate } from 'react-router-dom';
import TerceroForm from '../components/TerceroForm';
import { crearTercero } from '../services/terceros.service';
import type { CreateTerceroDTO } from '../models/Tercero';

export default function TercerosCreate() {
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateTerceroDTO) => {
    await crearTercero(data);
    navigate('/terceros');
  };

  return (
    <div>
      <h1 className="mt-4">Agregar Tercero</h1>
      <div className="d-flex mb-3 gap-2">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/terceros')}
        >
          <i className="bi bi-arrow-left"></i> Regresar
        </button>
      </div>
      <TerceroForm onSubmit={handleSubmit} />
    </div>
  );
}