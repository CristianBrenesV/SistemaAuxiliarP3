import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { clearSession } from '../utils/storage';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    clearSession();
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="bg-dark d-flex justify-content-end align-items-center px-3 mb-3" style={{ height: 60 }}>
      
        <span className="text-white me-3">
          {user
            ? user.nombre
              ? `${user.nombre} ${user.apellido ?? ''}`
              : user.usuario
            : 'Invitado'
          }    
      </span>

      <div className="dropdown">
        <img
          src="/images/avatar_generico.jpg"
          className="rounded-circle dropdown-toggle"
          style={{ width: 40, cursor: 'pointer' }}
          data-bs-toggle="dropdown"
        />

       <ul className="dropdown-menu dropdown-menu-end p-2">
        <li>
          <button
            className="btn btn-outline-secondary w-100 d-flex align-items-center text-nowrap"
            onClick={logout}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Cerrar sesión
          </button>
        </li>
      </ul>
      </div>
    </div>
  );
}