import { useEffect, useState, useCallback } from "react";
import api from "../../../core/api/axios";
import Paginacion from '../../../core/components/Paginacion';

interface CentroCosto {
    IdCentroCosto: number;
    Nombre: string;
}

interface Movimiento {
    Consecutivo: string;
    Fecha: string;
    CentroCosto: string;
    CodigoCuenta: string;
    Cuenta: string;
    TipoMovimiento: 'D' | 'C';
    Monto: number;
}

interface Totales {
    totalDebe: number;
    totalHaber: number;
    diferencia: number;
}

export default function ReporteCentros() {
    const [centros, setCentros] = useState<CentroCosto[]>([]);
    const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
    const [totales, setTotales] = useState<Totales>({
        totalDebe: 0,
        totalHaber: 0,
        diferencia: 0
    });

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [filtros, setFiltros] = useState({
        centro_id: "",
        fecha_inicio: "",
        fecha_fin: "",
        estado_id: ""
    });

    const buscarReporte = useCallback(async (pagina: number = 1, e?: React.FormEvent) => {
        if (e) e.preventDefault();

        try {
            const queryObj: Record<string, string> = {};

            Object.entries(filtros).forEach(([key, value]) => {
                if (value) queryObj[key] = value;
            });

            queryObj.page = pagina.toString();

            const params = new URLSearchParams(queryObj).toString();
            const res = await api.get(`/reportes/centros?${params}`);

            const data: Movimiento[] = Array.isArray(res.data.data)
                ? res.data.data.map((m: Omit<Movimiento, 'Monto'> & { Monto: string | number }) => ({
                    ...m,
                    Monto: Number(m.Monto)
                }))
                : [];

            setMovimientos(data);

            setTotales({
                totalDebe: res.data.totalDebe ?? 0,
                totalHaber: res.data.totalHaber ?? 0,
                diferencia: res.data.diferencia ?? 0
            });

            setPage(res.data.page ?? res.data.current_page ?? 1);
            setTotalPages(res.data.totalPages ?? res.data.last_page ?? 1);

        } catch (error) {
            console.error("Error al buscar el reporte:", error);
        }
    }, [filtros]);

    const cambiarPagina = (nueva: number) => {
        buscarReporte(nueva);
    };

    useEffect(() => {
        const inicializar = async () => {
            try {
                const resCentros = await api.get("/centros-costo?limit=100");
                setCentros(resCentros.data.data || []);

                await buscarReporte(1);
            } catch (err) {
                console.error("Error en la carga inicial:", err);
            }
        };

        inicializar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const manejarCambioFiltro = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setFiltros({ ...filtros, [e.target.name]: e.target.value });
    };

    // ✅ LIMPIAR FILTROS
    const limpiarFiltros = () => {
        setFiltros({
            centro_id: "",
            fecha_inicio: "",
            fecha_fin: "",
            estado_id: ""
        });

        setTimeout(() => buscarReporte(1), 0);
    };

    const formatoMoneda = (monto: number) =>
        new Intl.NumberFormat('es-CR', { minimumFractionDigits: 2 }).format(monto);

    const formatoFecha = (fechaISO: string) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString('es-CR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className="container-fluid mt-4">
            <div className="card shadow border-0">
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Reporte de Movimientos por Centro de Costo</h5>
                </div>

                <div className="card-body">
                    {/* 🔍 FILTROS */}
                    <form onSubmit={(e) => buscarReporte(1, e)} className="row g-3 mb-4">
                        <div className="col-md-3">
                            <label className="form-label fw-semibold text-secondary small">Centro de costo</label>
                            <select
                                name="centro_id"
                                className="form-select form-select-sm"
                                value={filtros.centro_id}
                                onChange={manejarCambioFiltro}
                            >
                                <option value="">Todos los centros</option>
                                {centros.map(c => (
                                    <option key={c.IdCentroCosto} value={c.IdCentroCosto}>
                                        {c.Nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-2">
                            <label className="form-label fw-semibold text-secondary small">Fecha inicio</label>
                            <input
                                type="date"
                                name="fecha_inicio"
                                className="form-control form-control-sm"
                                value={filtros.fecha_inicio}
                                onChange={manejarCambioFiltro}
                            />
                        </div>

                        <div className="col-md-2">
                            <label className="form-label fw-semibold text-secondary small">Fecha fin</label>
                            <input
                                type="date"
                                name="fecha_fin"
                                className="form-control form-control-sm"
                                value={filtros.fecha_fin}
                                onChange={manejarCambioFiltro}
                            />
                        </div>

                        <div className="col-md-2">
                            <label className="form-label fw-semibold text-secondary small">Estado</label>
                            <select
                                name="estado_id"
                                className="form-select form-select-sm"
                                value={filtros.estado_id}
                                onChange={manejarCambioFiltro}
                            >
                                <option value="">Todos los estados</option>
                                <option value="1">Borrador</option>
                                <option value="2">Pendiente de Aprobar</option>
                                <option value="3">Aprobado</option>
                            </select>
                        </div>

                        <div className="col-md-2 d-flex align-items-end gap-2">
                            <button type="submit" className="btn btn-dark btn-sm w-100">
                                <i className="bi bi-funnel me-1"></i>
                                Filtrar
                            </button>

                            <button
                                type="button"
                                onClick={limpiarFiltros}
                                className="btn btn-outline-secondary btn-sm w-100"
                            >
                                <i className="bi bi-x-circle me-1"></i>
                                Limpiar
                            </button>
                        </div>
                    </form>

                    {/* 📊 TABLA */}
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover table-sm align-middle">
                            <thead className="table-dark text-center">
                                <tr>
                                    <th style={{ width: '110px' }}>Fecha</th>
                                    <th style={{ width: '100px' }}>Asiento</th>
                                    <th>Cuenta Contable</th>
                                    <th style={{ width: '130px' }}>Debe</th>
                                    <th style={{ width: '130px' }}>Haber</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movimientos.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center text-muted py-5">
                                            No se encontraron movimientos con los filtros seleccionados
                                        </td>
                                    </tr>
                                ) : (
                                    movimientos.map((m, i) => (
                                        <tr key={i}>
                                            <td className="text-center">{formatoFecha(m.Fecha)}</td>
                                            <td className="text-center fw-bold">{m.Consecutivo}</td>
                                            <td className="small">
                                                <span className="text-muted">{m.CodigoCuenta}</span> — {m.Cuenta}
                                            </td>
                                            <td className="text-end pe-3">
                                                {m.TipoMovimiento === 'D'
                                                    ? <span className="text-success fw-semibold">{formatoMoneda(m.Monto)}</span>
                                                    : '-'}
                                            </td>
                                            <td className="text-end pe-3">
                                                {m.TipoMovimiento === 'C'
                                                    ? <span className="text-danger fw-semibold">{formatoMoneda(m.Monto)}</span>
                                                    : '-'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* 📄 PAGINACIÓN */}
                    <div className="mt-3 d-flex justify-content-center">
                        <Paginacion
                            page={page}
                            totalPages={totalPages}
                            onPageChange={cambiarPagina}
                        />
                    </div>

                    {/* 💰 TOTALES */}
                    <div className="row mt-4 g-3">
                        <div className="col-md-4">
                            <div className="card border-0 bg-light shadow-sm text-center p-3">
                                <span className="text-muted small fw-bold text-uppercase">Total Debe</span>
                                <h4 className="mb-0 text-success fw-bold">{formatoMoneda(totales.totalDebe)}</h4>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card border-0 bg-light shadow-sm text-center p-3">
                                <span className="text-muted small fw-bold text-uppercase">Total Haber</span>
                                <h4 className="mb-0 text-danger fw-bold">{formatoMoneda(totales.totalHaber)}</h4>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card border-dark text-white bg-dark shadow-sm text-center p-3">
                                <span className="text-light small fw-bold text-uppercase">Total (Saldo)</span>
                                <h4 className="mb-0 fw-bold">{formatoMoneda(totales.diferencia)}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}