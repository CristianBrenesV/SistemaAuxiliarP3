import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import api from "../../../core/api/axios"; // ✅ FIX

interface Centro {
  IdCentroCosto: number;
  Codigo: string;
  Nombre: string;
}

interface Detalle {
  IdAsientoDetalle: number;
  Monto: number;
}

interface DistribucionCC {
  IdCentroCosto: number;
  Monto: number;
  Porcentaje: number;
  Nota: string;
  Codigo: string;
  Nombre: string;
}

interface Linea {
  id: number;
  nombre: string;
  monto: number;
  nota: string;
}

export default function ProrrateoCostos() {

  const { idDetalle } = useParams<{ idDetalle: string }>();

  const [montoObjetivo, setMontoObjetivo] = useState(0);
  const [centros, setCentros] = useState<Centro[]>([]);
  const [lineas, setLineas] = useState<Linea[]>([]);

  const [centro, setCentro] = useState("");
  const [monto, setMonto] = useState("");
  const [nota, setNota] = useState("");

  useEffect(() => {
    api.get("/centros-costos")
      .then(res => setCentros(res.data.data));
  }, []);

  useEffect(() => {
    if (!idDetalle) return;

    api.get(`/prorrateo/detalle/${idDetalle}`)
      .then(res => {
        const d = res.data.find((x: Detalle) => x.IdAsientoDetalle === Number(idDetalle));
        setMontoObjetivo(d?.Monto || 0);
      });

    api.get(`/prorrateo/cc/${idDetalle}`)
      .then(res => {
        const mapped = res.data.map((x: DistribucionCC) => ({
          id: x.IdCentroCosto,
          nombre: `${x.Codigo} - ${x.Nombre}`,
          monto: x.Monto,
          nota: x.Nota || ""
        }));
        setLineas(mapped);
      });

  }, [idDetalle]);

  const agregar = () => {

    if (!centro) return alert("Seleccione centro");

    if (lineas.some(l => l.id === Number(centro)))
      return alert("Ya agregado");

    const montoNum = parseFloat(monto);
    if (isNaN(montoNum) || montoNum <= 0)
      return alert("Monto inválido");

    const suma = lineas.reduce((a, b) => a + b.monto, 0);
    if (suma + montoNum > montoObjetivo + 0.01)
      return alert("Supera el monto");

    const c = centros.find(x => x.IdCentroCosto === Number(centro));

    setLineas([
      ...lineas,
      {
        id: Number(centro),
        nombre: `${c?.Codigo} - ${c?.Nombre}`,
        monto: montoNum,
        nota
      }
    ]);

    setCentro(""); setMonto(""); setNota("");
  };

  const eliminar = (i: number) => {
    const copia = [...lineas];
    copia.splice(i, 1);
    setLineas(copia);
  };

  const guardar = async () => {
    try {
      await api.post("/prorrateo", {
        id_detalle: Number(idDetalle),
        es_tercero: false,
        distribucion: lineas.map(l => ({
          id_destino: l.id,
          monto: l.monto,
          porcentaje: (l.monto / montoObjetivo) * 100,
          nota: l.nota
        }))
      });

      alert("Guardado correctamente");

    } catch (error) {
      const err = error as AxiosError<{ mensaje: string }>;
      alert(err.response?.data?.mensaje || "Error");
    }
  };

  const total = lineas.reduce((a, b) => a + b.monto, 0);
  const diff = montoObjetivo - total;

  return (
    <div className="container mt-4">
      <h3>Prorrateo Centros de Costo</h3>

      <strong>Monto objetivo: {montoObjetivo}</strong>

      <div className="card p-3 my-3">
        <select className="form-select mb-2" value={centro} onChange={e => setCentro(e.target.value)}>
          <option value="">Seleccione</option>
          {centros.map(c => (
            <option key={c.IdCentroCosto} value={c.IdCentroCosto}>
              {c.Codigo} - {c.Nombre}
            </option>
          ))}
        </select>

        <input className="form-control mb-2" type="number"
          value={monto} onChange={e => setMonto(e.target.value)} />

        <textarea className="form-control mb-2"
          value={nota} onChange={e => setNota(e.target.value)} />

        <button className="btn btn-dark" onClick={agregar}>Agregar</button>
      </div>

      <table className="table">
        <tbody>
          {lineas.map((l, i) => (
            <tr key={i}>
              <td>{l.nombre}</td>
              <td>{l.monto}</td>
              <td>{((l.monto / montoObjetivo) * 100).toFixed(2)}%</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => eliminar(i)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      Total: {total} <br />
      Pendiente: {diff}

      <button className="btn btn-success mt-3"
        disabled={Math.abs(diff) > 0.01}
        onClick={guardar}>
        Guardar
      </button>
    </div>
  );
}