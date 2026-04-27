import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../services/auth.service';
import { useAuth } from '../../../core/hooks/useAuth';
import { setToken, setUserStorage } from '../../../core/utils/storage';
import AuthLayout from '../../../core/layouts/LoginLayout';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const mensaje = location.state?.mensaje;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await login(usuario, password);

      setToken(data.token);
      setUser(data.user);
      setUserStorage(data.user);

      navigate('/principal', { replace: true });
    } catch (error) {
      console.error(error);
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <AuthLayout>
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: '400px', width: '100%', backgroundColor: '#e6e6e6' }}
      >
        <div className="text-center">
          <img
            src="/images/logo2.png"
            alt="Logo"
            className="img-fluid mb-3"
            style={{ maxHeight: '150px' }}
          />
          <h4 className="card-title mb-3">Iniciar sesión</h4>
        </div>

        {mensaje && (
          <div className="alert alert-warning">
            {mensaje}
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese su usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-secondary w-100">
            Aceptar
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}