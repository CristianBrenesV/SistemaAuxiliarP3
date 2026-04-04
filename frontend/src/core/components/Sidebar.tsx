import { Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Sidebar() {
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

        <li className="mt-3">Centros de Costo</li>
        <Link className="nav-link text-white" to="/centros">
          <i className="bi bi-grid"></i> Gestión Centros de Costo
        </Link>

        <li className="mt-3">Terceros</li>
        <Link className="nav-link text-white" to="/terceros">
          <i className="bi bi-people"></i> Gestión Terceros
        </Link>

        <li className="mt-3">Asignaciones</li>
        <Link className="nav-link text-white" to="/asientos">
          <i className="bi bi-journal-check"></i> Prorrateo
        </Link>

        <li className="mt-3">Reportes</li>
        <Link className="nav-link text-white" to="/reportes-centros">
          <i className="bi bi-diagram-3"></i> Centros
        </Link>

      </ul>
    </nav>
  );
}