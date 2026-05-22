'use client'; 

import {useState} from 'react';
import {useRouter} from 'next/navigation';


export default function NuevoProyecto() {
  const router = useRouter();

  const [titulo, setTitulo]                = useState('');
  const [descripcion, setDescripcion]      = useState('');
  const [url, setUrl]                      = useState('');
  const [error, setError]                  = useState('');
  const [enviando, setEnviando]            = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); //con esto no se recarga la pagina
    setEnviando(true);
    setError('');

    try{
      const res = await fetch ('/api/proyectos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({titulo, descripcion, url}),
      });

      if(!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error desconocido');
      }

      router.push('/proyectos');

    } catch (error) {
      setError(error.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="p-8 max-w-md">
      <h1 className="text-3xl font-bold">Nuevo Proyecto</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Descripción</label>
          <textarea
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <label className="block font-medium">URL del proyecto</label>
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={enviando}
        >
          {enviando ? 'Guardando...' : 'Guardar proyecto'}
        </button>
      </form>
    </div>
  );
}
