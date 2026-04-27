import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TerceroForm from '../components/TerceroForm';
import { obtenerTerceroPorId, actualizarTercero } from '../services/terceros.service';
import type { CreateTerceroDTO, Tercero } from '../models/Tercero';

export default function TercerosEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<CreateTerceroDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTercero = async () => {
      if (id) {
        const tercero = await obtenerTerceroPorId(parseInt(id));
        if (tercero) {
          setInitialData({
            identificacion: tercero.Identificacion,
            nombre: tercero.Nombre,
            tipo: tercero.TipoTercero,
            email: tercero.Email || '',
            telefono: tercero.Telefono || '',
            estado: tercero.Estado
          });
        }
        setLoading(false);
      }
    };
    fetchTercero();
  }, [id]);

  const handleSubmit = async (data: CreateTerceroDTO) => {
    if (id) {
      await actualizarTercero(parseInt(id), data);
      navigate('/terceros');
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h1 className="mt-4">Editar Tercero</h1>
      <div className="d-flex mb-3 gap-2">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/terceros')}
        >
          <i className="bi bi-arrow-left"></i> Regresar
        </button>
      </div>
      {initialData && <TerceroForm initialData={initialData} onSubmit={handleSubmit} />}
    </div>
  );
}