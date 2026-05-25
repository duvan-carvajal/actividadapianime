import { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        correo,
        contrasena
      );

      alert('Sesión iniciada');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={login}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />

      <button type="submit">Iniciar sesión</button>
    </form>
  );
}