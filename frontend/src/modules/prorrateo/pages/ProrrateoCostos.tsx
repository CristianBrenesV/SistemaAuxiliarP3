import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../core/api/axios";

// --- Interfaces ---
interface Centro {
    IdCentroCosto: number;
    Codigo: string;
    Nombre: string;
    Estado: string | number;
}

interface DistribucionBD {
    IdCentroCosto: number;
    Codigo: string;
    Nombre: string;
    Monto: number;
    Nota?: string;
}

interface LineaTabla {
    id: number;
    nombre: string;
    monto: number;
    nota: string;
}

export default function ProrrateoCostos() {
    const { idDetalle } = useParams<{ idDetalle: string }>();
    const navigate = useNavigate();

    // Estados de datos
    const [montoObjetivo, setMontoObjetivo] = useState(0);
    const [centros, setCentros] = useState<Centro[]>([]);
    const [lineas, setLineas] = useState<LineaTabla[]>([]);
    
    // Estados del formulario
    const [centroId, setCentroId] = useState("");
    const [montoInput, setMontoInput] = useState("");
    const [notaInput, setNotaInput] = useState("");

    useEffect(() => {
        // 1. Cargar catálogo de Centros de Costos
        api.get("/centros-costo?limit=100")
            .then(res => {
                const lista: Centro[] = res.data.data || [];
                const activos = lista.filter((c: Centro) => String(c.Estado) === "1");
                setCentros(activos);
            })
            .catch((err: Error) => console.error("Error centros:", err.message));

        if (!idDetalle) return;

        // 2. Obtener monto original de la línea
        api.get(`/prorrateo/detalle/${idDetalle}`)
            .then(res => setMontoObjetivo(Number(res.data.Monto) || 0));

        // 3. Cargar distribución existente
        api.get(`/prorrateo/cc/${idDetalle}`)
            .then(res => {
                if (res.data && Array.isArray(res.data)) {
                    const mapped: LineaTabla[] = res.data.map((x: DistribucionBD) => ({
                        id: x.IdCentroCosto,
                        nombre: `${x.Codigo} | ${x.Nombre}`,
                        monto: Number(x.Monto),
                        nota: x.Nota || ""
                    }));
                    setLineas(mapped);
                }
            });
    }, [idDetalle]);

    const totalAsignado = lineas.reduce((a, b) => a + b.monto, 0);
    const pendiente = montoObjetivo - totalAsignado;

    const agregarALista = () => {
        if (!centroId) return alert("Por favor, seleccione un Centro de Costo.");
        
        const montoNum = parseFloat(montoInput);
        if (isNaN(montoNum) || montoNum <= 0) return alert("Ingrese un monto válido.");

        if (totalAsignado + montoNum > montoObjetivo + 0.01) {
            return alert("El monto ingresado supera el total de la línea.");
        }

        if (lineas.some(l => l.id === Number(centroId))) {
            return alert("Este Centro de Costo ya está en la lista.");
        }

        const c = centros.find(x => x.IdCentroCosto === Number(centroId));
        
        setLineas([...lineas, {
            id: Number(centroId),
            nombre: `${c?.Codigo} | ${c?.Nombre}`,
            monto: montoNum,
            nota: notaInput
        }]);

        setCentroId(""); setMontoInput(""); setNotaInput("");
    };

    const eliminarDeLista = (index: number) => {
        setLineas(lineas.filter((_, i) => i !== index));
    };

    const guardarTodo = async () => {
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
            alert("Prorrateo de costos guardado con éxito.");
            navigate(-1);
        } catch (error: unknown) {
            let mensaje = "Error al guardar";
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosErr = error as { response: { data: { mensaje: string } } };
                mensaje = axiosErr.response?.data?.mensaje || mensaje;
            }
            alert(mensaje);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="fw-bold">Prorrateo por Centros de Costo</h2>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
                    ← Volver
                </button>
            </div>

            {/* Banner de Info - Ahora usa bg-dark para diferenciarlo de Terceros (que es azul) */}
            <div className="card bg-dark text-white p-2 mb-3 shadow-sm border-0">
                <div className="d-flex justify-content-between px-3">
                    <span><i className="bi bi-hash"></i> Detalle ID: <strong>{idDetalle}</strong></span>
                    <span>Monto a Distribuir: <strong>₡{montoObjetivo.toLocaleString()}</strong></span>
                </div>
            </div>

            <div className="row">
                {/* Formulario */}
                <div className="col-md-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-white fw-bold border-bottom">Asignar Centro de Costo</div>
                        <div className="card-body">
                            <label className="small fw-bold text-muted">Centro de Costo</label>
                            <select className="form-select mb-3" value={centroId} onChange={e => setCentroId(e.target.value)}>
                                <option value="">-- Seleccione --</option>
                                {centros.map(c => (
                                    <option key={c.IdCentroCosto} value={c.IdCentroCosto}>{c.Codigo} | {c.Nombre}</option>
                                ))}
                            </select>

                            <label className="small fw-bold text-muted">Monto</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text bg-light text-muted">₡</span>
                                <input type="number" className="form-control" placeholder="0.00"
                                    value={montoInput} onChange={e => setMontoInput(e.target.value)} />
                            </div>

                            <label className="small fw-bold text-muted">Nota</label>
                            <textarea className="form-control mb-3" rows={2}
                                value={notaInput} onChange={e => setNotaInput(e.target.value)} />

                            <button className="btn btn-dark w-100 fw-bold" onClick={agregarALista}>
                                <i className="bi bi-plus-circle"></i> Agregar a la Lista
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabla */}
                <div className="col-md-8">
                    <div className="card shadow-sm border-0">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Código / Nombre</th>
                                        <th className="text-end">Monto</th>
                                        <th className="text-end">%</th>
                                        <th className="text-center">Quitar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lineas.map((l, i) => (
                                        <tr key={i}>
                                            <td className="small"><strong>{l.nombre}</strong><br/><span className="text-muted">{l.nota}</span></td>
                                            <td className="text-end fw-bold">₡{l.monto.toLocaleString()}</td>
                                            <td className="text-end text-muted">
                                                {((l.monto / (montoObjetivo || 1)) * 100).toFixed(1)}%
                                            </td>
                                            <td className="text-center">
                                                <button className="btn btn-link text-danger p-0" onClick={() => eliminarDeLista(i)}>
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {lineas.length === 0 && (
                                        <tr><td colSpan={4} className="text-center py-5 text-muted small">No hay centros asignados.</td></tr>
                                    )}
                                </tbody>
                                <tfoot className="table-light">
                                    <tr className="fw-bold">
                                        <td>Pendiente: ₡{pendiente.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                        <td colSpan={3} className="text-end">
                                            Total: <span className="text-dark fs-5">₡{totalAsignado.toLocaleString()}</span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-4">
                        <button 
                            className="btn btn-dark btn-lg px-5 shadow" 
                            disabled={Math.abs(pendiente) > 0.01 || lineas.length === 0}
                            onClick={guardarTodo}
                        >
                            <i className="bi bi-save"></i> Guardar Distribución
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}