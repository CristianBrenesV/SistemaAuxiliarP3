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

  const getItem = (ruta: string) =>
    menu.find(
      (m) =>
        m.Ruta === ruta &&
        !m.Ruta.includes(':') &&
        !m.Ruta.includes('/crear') &&
        !m.Ruta.includes('/editar')
    );

  const usuarios = getItem('/usuarios');
  const centrosCosto = getItem('/centros-costo');
  const terceros = getItem('/terceros');
  const prorrateo = getItem('/prorrateo');
  const repCentros = getItem('/reportes-centros');
  const repTerceros = getItem('/reportes-terceros');

  return (
    <nav className="col-md-3 col-lg-2 bg-dark text-white p-3" style={{ minHeight: '100vh' }}>
      
      <div className="text-center mb-3">
        <Link to="/principal" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src="/images/logo2.png" style={{ width: 70 }} />
          <h5 className="mt-2">Desarrollos Ordenados S.A</h5>
        </Link>
      </div>

      <hr />

      <ul className="nav flex-column">

        {usuarios && (
          <>
            <li className="mt-3">Administración</li>
            <Link className="nav-link text-white" to={usuarios.Ruta}>
              <i className="bi bi-person me-2"></i> {usuarios.Nombre}
            </Link>
          </>
        )}

        {centrosCosto && (
          <>
            <li className="mt-3">Centros de Costo</li>
            <Link className="nav-link text-white" to={centrosCosto.Ruta}>
              <i className="bi bi-diagram-3 me-2"></i> {centrosCosto.Nombre}
            </Link>
          </>
        )}

        {terceros && (
          <>
            <li className="mt-3">Terceros</li>
            <Link className="nav-link text-white" to={terceros.Ruta}>
              <i className="bi bi-people"></i> {terceros.Nombre}
            </Link>
          </>
        )}

        {prorrateo && (
          <>
            <li className="mt-3">Asignaciones</li>
            <Link className="nav-link text-white" to={prorrateo.Ruta}>
              <i className="bi bi-journal-check"></i> {prorrateo.Nombre}
            </Link>
          </>
        )}

        {(repCentros || repTerceros) && (
          <>
            <li className="mt-3">Reportes</li>

            {repCentros && (
              <Link className="nav-link text-white" to={repCentros.Ruta}>
                <i className="bi bi-diagram-3"></i> {repCentros.Nombre}
              </Link>
            )}

            {repTerceros && (
              <Link className="nav-link text-white" to={repTerceros.Ruta}>
                <i className="bi bi-people"></i> {repTerceros.Nombre}
              </Link>
            )}
          </>
        )}

      </ul>
    </nav>
  );
}