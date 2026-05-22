'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function Register() {
  const router = useRouter();
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [error, setError]         = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Crear cuenta</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded w-full">
          Registrarse
        </button>
      </form>

      <p className="mt-4 text-sm">¿Ya tienes cuenta? <a href="/login" className="text-blue-500 underline">Inicia sesión</a></p>
    </div>
  );
}