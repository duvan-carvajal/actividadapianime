import { useState } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const registrar = async (e: React.FormEvent) => {
    e.preventDefault();

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

      alert('Usuario registrado');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={registrar}>
      <h1>Registro</h1>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

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

      <button type="submit">Registrarse</button>
    </form>
  );
}