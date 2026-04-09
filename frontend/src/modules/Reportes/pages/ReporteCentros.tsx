import { useEffect, useState, useCallback } from "react";
import api from "../../../core/api/axios";

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
    const [totales, setTotales] = useState<Totales>({ totalDebe: 0, totalHaber: 0, diferencia: 0 });
    
    const [filtros, setFiltros] = useState({
        centro_id: "",
        fecha_inicio: "",
        fecha_fin: "",
        estado_id: ""
    });

    // 1. Declarar buscarReporte antes de usarlo (Hoisting fix)
    const buscarReporte = useCallback(async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        try {
            // Eliminar 'any' usando Record para los query params
            const queryObj: Record<string, string> = {};
            Object.entries(filtros).forEach(([key, value]) => {
                if (value) queryObj[key] = value;
            });

            const params = new URLSearchParams(queryObj).toString();
            const res = await api.get(`/reportes/centros?${params}`);
            
            setMovimientos(res.data.movimientos || []);
            setTotales({
                totalDebe: res.data.totalDebe || 0,
                totalHaber: res.data.totalHaber || 0,
                diferencia: res.data.diferencia || 0
            });
        } catch (error) {
            console.error("Error al buscar el reporte:", error);
        }
    }, [filtros]);

    // 2. useEffect ahora puede llamar a buscarReporte de forma segura
    useEffect(() => {
        api.get("/centros-costo?limit=100")
            .then(res => setCentros(res.data.data || []))
            .catch(err => console.error("Error al cargar centros:", err));
        
        buscarReporte();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const manejarCambioFiltro = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setFiltros({ ...filtros, [e.target.name]: e.target.value });
    };

    const limpiarFiltros = () => {
        const filtrosLimpios = { centro_id: "", fecha_inicio: "", fecha_fin: "", estado_id: "" };
        setFiltros(filtrosLimpios);
        // Recargar con filtros vacíos
        setTimeout(() => buscarReporte(), 0); 
    };

    const formatoMoneda = (monto: number) => 
        new Intl.NumberFormat('es-CR', { minimumFractionDigits: 2 }).format(monto);

    const formatoFecha = (fechaISO: string) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString('es-CR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <div className="container mt-4">
            <div className="card shadow border-0">
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Reporte de Movimientos por Centro de Costo</h5>
                </div>

                <div className="card-body">
                    <form onSubmit={buscarReporte} className="row g-3 mb-4">
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">Centro de costo</label>
                            <select name="centro_id" className="form-select form-select-sm" value={filtros.centro_id} onChange={manejarCambioFiltro}>
                                <option value="">Todos</option>
                                {centros.map(c => (
                                    <option key={c.IdCentroCosto} value={c.IdCentroCosto}>{c.Nombre}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label fw-semibold">Fecha inicio</label>
                            <input type="date" name="fecha_inicio" className="form-control form-control-sm" 
                                value={filtros.fecha_inicio} onChange={manejarCambioFiltro} />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label fw-semibold">Fecha fin</label>
                            <input type="date" name="fecha_fin" className="form-control form-control-sm" 
                                value={filtros.fecha_fin} onChange={manejarCambioFiltro} />
                        </div>

                        <div className="col-md-2">
                            <label className="form-label fw-semibold">Estado</label>
                            <select name="estado_id" className="form-select form-select-sm" value={filtros.estado_id} onChange={manejarCambioFiltro}>
                                <option value="">Todos</option>
                                <option value="1">Borrador</option>
                                <option value="2">Pendiente</option>
                                <option value="3">Aprobado</option>
                            </select>
                        </div>

                        <div className="col-md-1 d-flex align-items-end">
                            <button type="submit" className="btn btn-dark btn-sm w-100">Buscar</button>
                        </div>

                        <div className="col-md-12">
                            <button type="button" onClick={limpiarFiltros} className="btn btn-outline-secondary btn-sm">
                                Limpiar filtros
                            </button>
                        </div>
                    </form>

                    <div className="table-responsive">
                        <table className="table table-bordered table-hover table-striped align-middle">
                            <thead className="table-dark text-center">
                                <tr>
                                    <th style={{ width: '120px' }}>Fecha</th>
                                    <th style={{ width: '100px' }}>Asiento</th>
                                    <th>Cuenta</th>
                                    <th style={{ width: '120px' }}>Debe</th>
                                    <th style={{ width: '120px' }}>Haber</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movimientos.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center text-muted py-4">No se encontraron movimientos</td>
                                    </tr>
                                ) : (
                                    movimientos.map((m, i) => (
                                        <tr key={i}>
                                            <td className="text-center">{formatoFecha(m.Fecha)}</td>
                                            <td className="text-center fw-semibold">{m.Consecutivo}</td>
                                            <td>{m.CodigoCuenta} - {m.Cuenta}</td>
                                            <td className="text-end">
                                                {m.TipoMovimiento === 'D' && (
                                                    <span className="text-success fw-semibold">{formatoMoneda(m.Monto)}</span>
                                                )}
                                            </td>
                                            <td className="text-end">
                                                {m.TipoMovimiento === 'C' && (
                                                    <span className="text-danger fw-semibold">{formatoMoneda(m.Monto)}</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-4">
                            <div className="alert alert-light border text-center shadow-sm">
                                <strong>Total Debe</strong><br/>
                                <span className="fs-5 fw-bold text-success">{formatoMoneda(totales.totalDebe)}</span>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="alert alert-light border text-center shadow-sm">
                                <strong>Total Haber</strong><br/>
                                <span className="fs-5 fw-bold text-danger">{formatoMoneda(totales.totalHaber)}</span>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="alert alert-secondary text-center shadow-sm">
                                <strong>Total Movimientos</strong><br/>
                                <span className="fs-5 fw-bold">{formatoMoneda(totales.totalDebe + totales.totalHaber)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}