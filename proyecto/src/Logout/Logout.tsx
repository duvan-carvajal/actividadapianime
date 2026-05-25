import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';

export default function Logout() {
  const logout = async () => {
    await signOut(auth);
    alert('Sesión cerrada');
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
}