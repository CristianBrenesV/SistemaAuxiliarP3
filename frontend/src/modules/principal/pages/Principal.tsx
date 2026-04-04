import { useAuth } from '../../../core/hooks/useAuth';

export default function Principal() {
  const { user } = useAuth();

  const nombreCompleto = user
    ? user.nombre
      ? `${user.nombre} ${user.apellido ?? ''}`
      : user.usuario
    : 'Invitado';

  return (
        <div
        style={{
            backgroundColor: '#f5f5f5', // fallback
            backgroundImage: "url('/images/logo4.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '600px',
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
  );
}