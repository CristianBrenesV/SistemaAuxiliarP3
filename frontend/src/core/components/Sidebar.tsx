import { Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useMenu } from '../hooks/useMenu';

export default function Sidebar() {
  const { menu, loading } = useMenu();

  if (loading) {
    return (
      <nav className="col-md-3 col-lg-2 bg-dark text-white p-3" style={{ minHeight: '100vh' }}>
        <div className="text-center">Cargando...</div>
      </nav>
    );
  }

  // Función para obtener un item del menú por su ruta
  const getItem = (ruta: string) =>
    menu.find(
      (m) =>
        m.Ruta === ruta &&
        !m.Ruta.includes(':') &&
        !m.Ruta.includes('/crear') &&
        !m.Ruta.includes('/editar')
    );

  // Obtener items existentes
  const usuarios = getItem('/usuarios');
  const prorrateo = getItem('/prorrateo');
  const reporteCentros = getItem('/reportes-centros');
  const reporteTerceros = getItem('/reportes-terceros');
  
  // NUEVOS ITEMS (si están en la BD, se mostrarán, si no, se ocultan)
  const terceros = getItem('/terceros');
  const centrosCosto = getItem('/centros-costo');

  return (
    <nav className="col-md-3 col-lg-2 bg-dark text-white p-3" style={{ minHeight: '100vh' }}>
      
      {/* Logo y título */}
      <div className="text-center mb-3">
        <Link to="/principal" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src="/images/logo2.png" alt="Logo" style={{ width: 70 }} />
          <h5 className="mt-2">Desarrollos Ordenados S.A</h5>
        </Link>
      </div>

      <hr />

      <ul className="nav flex-column">

        {/* ================= SECCIÓN ADMINISTRACIÓN ================= */}
        {usuarios && (
          <>
            <li className="mt-3 text-secondary">Administración</li>
            <Link className="nav-link text-white" to={usuarios.Ruta}>
              <i className="bi bi-people-fill me-2"></i> {usuarios.Nombre}
            </Link>
          </>
        )}

        {/* ================= SECCIÓN TERCEROS (AUX5) ================= */}
        {terceros && (
          <>
            <li className="mt-3 text-secondary">Terceros</li>
            <Link className="nav-link text-white" to={terceros.Ruta}>
              <i className="bi bi-people me-2"></i> {terceros.Nombre}
            </Link>
            
            {/* Submenú de Direcciones (enlaces directos con alerta) */}
            <Link 
              className="nav-link text-white ps-4" 
              to="/terceros/1/direcciones" 
              onClick={(e) => {
                e.preventDefault();
                alert('Seleccione un tercero desde la lista de terceros para ver sus direcciones.');
              }}
            >
              <i className="bi bi-geo-alt me-2"></i> Direcciones
            </Link>
            
            {/* Submenú de Contactos */}
            <Link 
              className="nav-link text-white ps-4" 
              to="/terceros/1/contactos" 
              onClick={(e) => {
                e.preventDefault();
                alert('Seleccione un tercero desde la lista de terceros para ver sus contactos.');
              }}
            >
              <i className="bi bi-person-lines-fill me-2"></i> Contactos
            </Link>
          </>
        )}

        {/* ================= SECCIÓN CENTROS DE COSTO (AUX6) ================= */}
        {centrosCosto && (
          <>
            <li className="mt-3 text-secondary">Centros de Costo</li>
            <Link className="nav-link text-white" to={centrosCosto.Ruta}>
              <i className="bi bi-grid me-2"></i> {centrosCosto.Nombre}
            </Link>
          </>
        )}

        {/* ================= SECCIÓN ASIGNACIONES / PRORRATEO ================= */}
        {prorrateo && (
          <>
            <li className="mt-3 text-secondary">Asignaciones / Prorrateo</li>
            <Link className="nav-link text-white" to={prorrateo.Ruta}>
              <i className="bi bi-journal-check me-2"></i> {prorrateo.Nombre}
            </Link>
          </>
        )}

        {/* ================= SECCIÓN REPORTES ================= */}
        {(reporteCentros || reporteTerceros) && (
          <>
            <li className="mt-3 text-secondary">Reportes</li>
            
            {reporteCentros && (
              <Link className="nav-link text-white" to={reporteCentros.Ruta}>
                <i className="bi bi-diagram-3 me-2"></i> {reporteCentros.Nombre}
              </Link>
            )}
            
            {reporteTerceros && (
              <Link className="nav-link text-white" to={reporteTerceros.Ruta}>
                <i className="bi bi-person-lines-fill me-2"></i> {reporteTerceros.Nombre}
              </Link>
            )}
          </>
        )}

      </ul>
    </nav>
  );
}