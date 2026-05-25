
import { auth } from '../firebase/firebaseConfig';

export default function Usuario() {
  const user = auth.currentUser;

  return (
    <div>
      <h1>Panel de Usuario</h1>

      {user ? (
        <>
          <p style={{ color: 'green', fontWeight: 'bold' }}>
            Conectado
          </p>

          <p>
            <strong>Correo:</strong> {user.email}
          </p>

          <p>
            <strong>UID:</strong> {user.uid}
          </p>
        </>
      ) : (
        <>
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            Desconectado
          </p>

          <p>
            Debes iniciar sesión para acceder a tu cuenta.
          </p>
        </>
      )}
    </div>
  );
}