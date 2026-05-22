import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'proyectos.db'));

//creamos tabla en la bd
db.exec(`
    CREATE TABLE IF NOT EXISTS proyectos (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo       TEXT NOT NULL,
        descripcion  TEXT,
        url          TEXT,
        imagen       TEXT
    )
`);

//insertamos datos
const count = db.prepare('SELECT COUNT(*) as total FROM proyectos').get();
if (count.total === 0) {
    db.prepare(`
        INSERT INTO proyectos (titulo, descripcion, url, imagen) VALUES
    (?, ?, ?, ?)
    `).run('Mi Jardín', 'Gestión CRUD de botanica', 'https://github.com/Claudia-dss/Gestion-Plantas.git', '');

    db.prepare(`
        INSERT INTO proyectos (titulo, descripcion, url, imagen) VALUES
    (?, ?, ?, ?)
    `).run('TicTacToe', 'Juego sencillo de tres en raya', 'https://github.com/Claudia-dss/Ejercicios/tree/7138e9d7ff546ea2f4639e52816562fc88423b8e/Practicas%20por%20libre/TicTacToe', '');

    db.prepare(`
        INSERT INTO proyectos (titulo, descripcion, url, imagen) VALUES
    (?, ?, ?, ?)
    `).run('Dark/Light Mode', 'API para cambiar el modo de lectura de la página web', 'https://github.com/Claudia-dss/Ejercicios', '');
}

export default db;