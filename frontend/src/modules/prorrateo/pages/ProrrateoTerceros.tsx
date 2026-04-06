import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import api from "../../../core/api/axios"; // ✅ FIX

interface Tercero {
  IdTercero: number;
  Identificacion: string;
  Nombre: string;
}

interface Detalle {
  IdAsientoDetalle: number;
  Monto: number;
}

interface DistribucionTercero {
  IdTercero: number;
  Monto: number;
  Porcentaje: number;
  Nota: string;
  Identificacion: string;
  Nombre: string;
}

interface Linea {
  id: number;
  nombre: string;
  monto: number;
  nota: string;
}

export default function ProrrateoTerceros() {

  const { idDetalle } = useParams<{ idDetalle: string }>();

  const [montoObjetivo, setMontoObjetivo] = useState(0);
  const [terceros, setTerceros] = useState<Tercero[]>([]);
  const [lineas, setLineas] = useState<Linea[]>([]);

  const [tercero, setTercero] = useState("");
  const [monto, setMonto] = useState("");
  const [nota, setNota] = useState("");

  useEffect(() => {
    api.get("/terceros")
      .then(res => setTerceros(res.data.data));
  }, []);

  useEffect(() => {
    if (!idDetalle) return;

    api.get(`/prorrateo/detalle/${idDetalle}`)
      .then(res => {
        const d = res.data.find((x: Detalle) => x.IdAsientoDetalle === Number(idDetalle));
        setMontoObjetivo(d?.Monto || 0);
      });

    api.get(`/prorrateo/terceros/${idDetalle}`)
      .then(res => {
        const mapped = res.data.map((x: DistribucionTercero) => ({
          id: x.IdTercero,
          nombre: `${x.Identificacion} - ${x.Nombre}`,
          monto: x.Monto,
          nota: x.Nota || ""
        }));
        setLineas(mapped);
      });

  }, [idDetalle]);

  const agregar = () => {

    if (!tercero) return alert("Seleccione tercero");

    if (lineas.some(l => l.id === Number(tercero)))
      return alert("Ya agregado");

    const montoNum = parseFloat(monto);
    if (isNaN(montoNum) || montoNum <= 0)
      return alert("Monto inválido");

    const suma = lineas.reduce((a, b) => a + b.monto, 0);
    if (suma + montoNum > montoObjetivo + 0.01)
      return alert("Supera el monto");

    const t = terceros.find(x => x.IdTercero === Number(tercero));

    setLineas([
      ...lineas,
      {
        id: Number(tercero),
        nombre: `${t?.Identificacion} - ${t?.Nombre}`,
        monto: montoNum,
        nota
      }
    ]);

    setTercero(""); setMonto(""); setNota("");
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
        es_tercero: true,
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
      <h3>Prorrateo por Terceros</h3>

      <strong>Monto objetivo: {montoObjetivo}</strong>

      <div className="card p-3 my-3">
        <select className="form-select mb-2" value={tercero} onChange={e => setTercero(e.target.value)}>
          <option value="">Seleccione</option>
          {terceros.map(t => (
            <option key={t.IdTercero} value={t.IdTercero}>
              {t.Identificacion} - {t.Nombre}
            </option>
          ))}
        </select>

        <input className="form-control mb-2"
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