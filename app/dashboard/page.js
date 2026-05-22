'use client';

import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function Dashboard() {
  const router = useRouter();
  
  // useSession nos da el usuario actual
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <p>Cargando...</p>;

  // Si no hay sesión, redirige al login
  if (!session) {
    router.push('/login');
    return null;
  }

  async function handleLogout() {
    await authClient.signOut();
    router.push('/login');
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
     ¡Hola, {session.user.name}!
      </h1>
      <p className="text-gray-400 mt-2">Tu email: {session.user.email}</p>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
}