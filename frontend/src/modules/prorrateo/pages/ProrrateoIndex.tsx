import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../core/api/axios";
import Paginacion from "../../../core/components/Paginacion";

interface Periodo {
  IdPeriodo: number;
  Anio: number;
  Mes: number;
  Estado: string;
}

interface Asiento {
  IdAsiento: number;
  Consecutivo: string;
  Fecha: string;
  Referencia: string;
  IdEstadoAsiento: number;
}

interface Detalle {
  IdAsientoDetalle: number;
  CodigoCuenta: string;
  Nombre: string;
  TipoMovimiento: string;
  Monto: number;
  Descripcion: string;
  tieneCC: number;
  tieneTercero: number;
}

export default function ProrrateoIndex() {

  const navigate = useNavigate();

  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [idPeriodo, setIdPeriodo] = useState<number | null>(null);
  const [estado, setEstado] = useState<number | "">("");

  const [asientos, setAsientos] = useState<Asiento[]>([]);
  const [detalles, setDetalles] = useState<Record<number, Detalle[]>>({});
  const [expandido, setExpandido] = useState<number | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const cargarAsientos = async (
    periodo: number,
    estadoFiltro: number | "",
    pagina: number = 1
  ) => {
    try {
      let url = `/asientos?id_periodo=${periodo}&page=${pagina}`;

      if (estadoFiltro) {
        url += `&estado_id=${estadoFiltro}`;
      }

      const res = await api.get(url);

      setAsientos(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
      setPage(res.data.page || 1);
      setDetalles({});
      setExpandido(null);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      const res = await api.get("/periodos");
      setPeriodos(res.data);

      const abierto = res.data.find((p: Periodo) => p.Estado === "Abierto");

      if (abierto) {
        setIdPeriodo(abierto.IdPeriodo);
        cargarAsientos(abierto.IdPeriodo, "", 1);
      }
    };

    init();
  }, []);

  const aplicarFiltros = () => {
    if (!idPeriodo) return;
    cargarAsientos(idPeriodo, estado, 1);
  };

  const cambiarPagina = (nueva: number) => {
    if (!idPeriodo) return;
    cargarAsientos(idPeriodo, estado, nueva);
  };

  const toggleDetalle = async (idAsiento: number) => {

    if (expandido === idAsiento) {
      setExpandido(null);
      return;
    }

    setExpandido(idAsiento);

    if (!detalles[idAsiento]) {
      const res = await api.get(`/asientos/${idAsiento}/detalles`);

      setDetalles(prev => ({
        ...prev,
        [idAsiento]: res.data.data || res.data
      }));
    }
  };

  const formatearMoneda = (monto: number) =>
    new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
    }).format(monto);

  const getEstadoTexto = (estado: number) => {
    switch (estado) {
      case 1: return "Borrador";
      case 2: return "Pendiente";
      case 3: return "Aprobado";
      default: return `Estado ${estado}`;
    }
  };

  return (
    <div className="container mt-4">

      <h2>Prorrateo de Asientos</h2>

      {/* FILTROS */}
      <div className="card p-3 mb-3">
        <div className="row">

          <div className="col-md-4">
            <label>Periodo</label>
            <select
              className="form-select"
              value={idPeriodo ?? ""}
              onChange={(e) => setIdPeriodo(Number(e.target.value))}
            >
              {periodos.map(p => (
                <option key={p.IdPeriodo} value={p.IdPeriodo}>
                  {p.Anio} - Mes {p.Mes} ({p.Estado})
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label>Estado</label>
            <select
              className="form-select"
              value={estado}
              onChange={(e) =>
                setEstado(e.target.value ? Number(e.target.value) : "")
              }
            >
              <option value="">-- Todos --</option>
              <option value="1">Borrador</option>
              <option value="2">Pendiente</option>
              <option value="3">Aprobado</option>
            </select>
          </div>

          <div className="col-md-2 d-flex align-items-end">
            <button className="btn btn-dark w-100" onClick={aplicarFiltros}>
              <i className="bi bi-funnel me-2"></i>
              Filtrar
            </button>
          </div>

        </div>
      </div>

      {/* TABLA */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Consecutivo</th>
            <th>Fecha</th>
            <th>Referencia</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {asientos.map(a => {

            const puedeProrratear =
              a.IdEstadoAsiento === 1 || a.IdEstadoAsiento === 2;

            return (
              <React.Fragment key={a.IdAsiento}>

                <tr>
                  <td>{a.Consecutivo || a.IdAsiento}</td>
                  <td>{new Date(a.Fecha).toLocaleDateString()}</td>
                  <td>{a.Referencia}</td>
                  <td>{getEstadoTexto(a.IdEstadoAsiento)}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => toggleDetalle(a.IdAsiento)}
                    >
                      <i className="bi bi-eye me-1"></i>
                      Ver Detalle
                    </button>
                  </td>
                </tr>

                {expandido === a.IdAsiento && (
                  <tr>
                    <td colSpan={5} className="bg-light">

                      {!detalles[a.IdAsiento] && (
                        <div className="text-center p-2">Cargando...</div>
                      )}

                      {detalles[a.IdAsiento] && (
                        <table className="table table-sm mb-0">
                          <tbody>
                            {detalles[a.IdAsiento].map(d => {

                              return (
                                <tr key={d.IdAsientoDetalle}>
                                  <td>{d.CodigoCuenta} - {d.Nombre}</td>
                                  <td>{d.TipoMovimiento}</td>
                                  <td>{formatearMoneda(d.Monto)}</td>
                                  <td>{d.Descripcion || "Sin descripción"}</td>

                                  <td>
                                    {puedeProrratear ? (
                                      <>
                                        <button
                                          className="btn btn-sm btn-outline-secondary me-2"
                                          onClick={() =>
                                            navigate(`/prorrateo/costos/${d.IdAsientoDetalle}`)
                                          }
                                        >
                                          {d.tieneCC > 0 ? "✅ CC" : "CC"}
                                        </button>

                                        <button
                                          className="btn btn-sm btn-outline-secondary"
                                          onClick={() =>
                                            navigate(`/prorrateo/terceros/${d.IdAsientoDetalle}`)
                                          }
                                        >
                                          {d.tieneTercero > 0 ? "✅ T" : "T"}
                                        </button>
                                      </>
                                    ) : "N/A"}
                                  </td>

                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      )}

                    </td>
                  </tr>
                )}

              </React.Fragment>
            );
          })}
        </tbody>
      </table>

    <Paginacion
      page={page}
      totalPages={totalPages}
      onPageChange={cambiarPagina}
    />

    </div>
  );
}