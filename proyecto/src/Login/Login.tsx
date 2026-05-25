import { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const [success, setSuccess] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const user = auth.currentUser;

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccess('');
    setErrorMsg('');

    try {
      await signInWithEmailAndPassword(
        auth,
        correo,
        contrasena
      );

      setSuccess(' Sesión iniciada correctamente');
    } catch (error: any) {
      setErrorMsg(' Correo o contraseña incorrectos');
    }
  };

  if (user) {
    return (
      <div>
        <h1>Login</h1>
        <p style={{ color: 'green' }}>
           Ya has iniciado sesión como {user.email}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={login}>
      <h1>Login</h1>

      {success && (
        <p style={{ color: 'green', fontWeight: 'bold' }}>
          {success}
        </p>
      )}

      {errorMsg && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          {errorMsg}
        </p>
      )}

      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />

      <br /><br />

      <button type="submit">
        Iniciar sesión
      </button>
    </form>
  );
}