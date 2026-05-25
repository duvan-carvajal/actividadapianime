import { auth } from '../firebase/firebaseConfig';

export default function Usuario() {
  const user = auth.currentUser;

  return (
    <div>
      <h1>Usuario</h1>
      <p>{user?.email}</p>
    </div>
  );
}