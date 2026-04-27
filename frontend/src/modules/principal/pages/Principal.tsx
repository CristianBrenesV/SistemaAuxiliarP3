import { useMenu } from '../../../core/hooks/useMenu';
import { useAuth } from '../../../core/hooks/useAuth';

export default function Principal() {
  const { user } = useAuth();
  const { menu } = useMenu();

  const esAdmin = menu.some((m) => m.Ruta === '/usuarios');

  const nombreCompleto = user
    ? `${user.nombre} ${user.apellido ?? ''}`
    : 'Invitado';

  return (
    <div>
      {esAdmin && (
        <div
          style={{
            backgroundColor: '#f5f5f5',
            backgroundImage: "url('/images/logo4.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '700px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <h1
            className="display-4"
            style={{
              color: 'black',
              fontWeight: 700,
              textShadow: `
                1px 1px 0 #fff,
                -1px 1px 0 #fff,
                1px -1px 0 #fff,
                -1px -1px 0 #fff,
                0 2px 2px rgba(0,0,0,0.2)
              `
            }}
          >
            ¡Bienvenido, {nombreCompleto}!
          </h1>
        </div>
      )}
    </div>
  );
}