export default async function Proyectos() {

    let proyectos = [];

    try{
    const res = await fetch('http://localhost:3000/api/proyectos', {
        cache: 'no-store'
    });

        if (!res.ok) throw new Error ('Error al cargar proyectos');
        proyectos = await res.json();

    } catch (error) {
        console.error('Error fetching proyectos:', error);
    }

    return (
        <div className="min-h-screen flex flex-col items-center py-10 px-4">
            <h1 className="text-5xl text-center mt-12 mb-10 font-bold">Proyectos</h1>
            <a href="/proyectos/nuevo" className="text-blue-600 underline ml-16"> + Añadir proyecto </a>

            {proyectos.length === 0 ? (
                <p>No se encontraron proyectos.</p>
            ) : (
            <div className="px-8 py-6">
                <p className="font-bold mt-8 ml-16 mb-16">¡Aquí puedes ver algunos de mis proyectos!</p>
                <ul className="w-full max-w-2xl flex flex-col gap-6">
                    {proyectos.map(proyecto =>(
                        //el child tiene que tener siempre una clave unica (key).
                        <li key={proyecto.id} className="border border-purple-200 rounded-md p-6 transition-colors duration-300 hover:bg-purple-600/10 hover:border-purple-400">
                            <h2 className="text-xl font-bold text-white">{proyecto.titulo}</h2>
                            <p className="text-base text-gray-400 mt-2">{proyecto.descripcion}</p>
                            <a href={proyecto.url} target="_blank" className="text-sm text-blue-500 underline mt-4 inline-block">Ver proyecto</a>
                        </li>
                    ))}
                </ul>
            </div>
            )}
        </div>
    );
}