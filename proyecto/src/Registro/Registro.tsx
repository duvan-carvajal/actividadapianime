import { useState } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function Registro() {
  const user = auth.currentUser;

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const [success, setSuccess] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const registrar = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccess('');
    setErrorMsg('');

    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        correo,
        contrasena
      );

      await setDoc(doc(db, 'usuarios', cred.user.uid), {
        nombre,
        correo,
      });

      setSuccess(' Usuario registrado correctamente');
    } catch (error: any) {
      setErrorMsg(` ${error.message}`);
    }
  };

  if (user) {
    return (
      <div>
        <h1>Registro</h1>
        <p style={{ color: 'green' }}>
          Ya has iniciado sesión como {user.email}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={registrar}>
      <h1>Registro</h1>

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
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <br /><br />

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
        Registrarse
      </button>
    </form>
  );
}