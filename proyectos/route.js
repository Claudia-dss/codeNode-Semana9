import {NextResponse} from 'next/server';
import db from '@/db/db';

//para que nos de todos los proyectos (PEDIR)
export function GET () {
    try{
        const proyectos = db.prepare('SELECT * FROM proyectos').all();
        return NextResponse.json(proyectos);
    } catch (error) {
        return NextResponse.json(
            {error: 'Error al obtener los proyectos.'},
            {status: 500}
        );
    }
}

//esto hace que reciba los proyectos y los guarde (DAR)
export async function POST(request) {
    try{
        const body = await request.json();
        const {titulo, descripcion, url, imagen} = body;

        if (!titulo) {
            return NextResponse.json(
                {error: 'El título es obligatorio.'},
                {status: 400}
            );
        }

        const result = db.prepare(`
            INSERT INTO proyectos (titulo, descripcion, url, imagen) VALUES
            (?, ?, ?, ?)
            `).run(titulo, descripcion || '', url || '', imagen || '');

        return NextResponse.json(
            {id: result.lastInsertRowid, titulo, descripcion, url, imagen},
            {status: 201}
        );
    } catch (error) {
        return NextResponse.json(
            {error: 'Error al cargar el proyecto'},
            {status: 500}
        );
    }
}