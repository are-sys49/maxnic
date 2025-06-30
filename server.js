import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'arely',
  password: '1234',
  database: 'prueba_dipa2',
});


app.post('/Login', async (req, res) => {
  const { matricula, password } = req.body;

  try {
    const [results] = await db.query(`
      SELECT u.*, a.nombre_academia, s.nombre_sede
      FROM usuarios u
      INNER JOIN academias a ON u.id_academia = a.id_academia
      INNER JOIN sede s ON u.id_sede = s.id_sede
      WHERE u.matricula = ?
    `, [matricula]);

    if (results.length > 0) {
      console.log('Usuario encontrado:', results[0].matricula);
      console.log('Password recibido:', password);
      console.log('Password en DB:', results[0].password);

      const match = await bcrypt.compare(password, results[0].password);

      console.log('¿Contraseña coincide?', match);

      if (match) {
        res.json({
          success: true,
          message: 'Login exitoso',
          user: {
            matricula: results[0].matricula,
            nombre: results[0].nombre,
            app: results[0].app,
            apm: results[0].apm,
            academia: results[0].nombre_academia,
            sede: results[0].nombre_sede,
          },
        });
      } else {
        res.json({ success: false, message: 'Matrícula o contraseña incorrecta' });
      }
    } else {
      res.json({ success: false, message: 'Matrícula o contraseña incorrecta' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor', error: err });
  }
});





// Ruta para registrar o actualizar contraseña si aún no existe
app.post('/Continuar', async (req, res) => {
  const { matricula, password } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM usuarios WHERE matricula = ? AND (password IS NULL OR password = "")',
      [matricula]
    );

    if (rows.length === 0) {
      return res.status(400).json({
        message: 'Ya existe una contraseña para esta matrícula o la matrícula no existe.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query('UPDATE usuarios SET password = ? WHERE matricula = ?', [
      hashedPassword,
      matricula,
    ]);

   const [userRows] = await db.query(
     `SELECT 
         u.matricula, u.nombre, u.app, u.apm, u.gen,
         a.nombre_academia,
         s.nombre_sede
       FROM usuarios u
       JOIN academias a ON u.id_academia = a.id_academia
       JOIN sede s ON u.id_sede = s.id_sede
       WHERE u.matricula = ?`,
      [matricula]
    );
     if (userRows.length === 0) {
      return res.status(404).json({ message: 'Usuario actualizado pero no encontrado' });
    }

    const user = {
      matricula: userRows[0].matricula,
      nombre: userRows[0].nombre,
      app: userRows[0].app,
      apm: userRows[0].apm,
      gen: userRows[0].gen,
      academia: userRows[0].nombre_academia,
      sede: userRows[0].nombre_sede,
    };


    res.status(200).json({ message: 'Contraseña registrada exitosamente.', user });
  } catch (err) {
    console.error('Error al insertar la contraseña:', err);
    res.status(500).json({ message: 'Error del servidor al insertar la contraseña.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.get('/Datos/:matricula', async (req, res) => {
  const matricula = req.params.matricula;

  try {
    const [rows] = await db.query(
      `SELECT 
         u.matricula, u.nombre, u.app, u.apm, u.gen,
         a.nombre_academia,
         s.nombre_sede
       FROM usuarios u
       JOIN academias a ON u.id_academia = a.id_academia
       JOIN sede s ON u.id_sede = s.id_sede
       WHERE u.matricula = ?`,
      [matricula]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Retornamos la información renombrando para que coincida con los nombres en React
    const user = {
      matricula: rows[0].matricula,
      nombre: rows[0].nombre,
      app: rows[0].app,
      apm: rows[0].apm,
      gen: rows[0].gen,
      academia: rows[0].nombre_academia,
      sede: rows[0].nombre_sede,
    };

    res.json({ user });
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.get('/CursosSede/:matricula', async (req, res) => {
  const matricula = req.params.matricula;
  try {
    const [userRows] = await db.query(
      'SELECT id_sede FROM usuarios WHERE matricula = ?',
      [matricula]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const idSede = userRows[0].id_sede;

    const [academias] = await db.query(
      'SELECT * FROM academias WHERE id_sede = ?',
      [idSede]
    );

    res.json({ cursos: rows });
  } catch (error) {
    console.error('Error al obtener cursos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
<<<<<<< Updated upstream
}
);
=======
});

app.post('/api/users/avatar', async (req, res) => {
  try {
    const {matricula, avatarPng, avatarPngName, accessory } = req.body;

    if (!matricula) {
      return res.status(400).json({ message: 'Falta la matrícula' });
    }

    // Insertar avatar en la tabla usuarios_avatar
    const query = `
     UPDATE usuarios
     SET avatarPng = ?, avatarPngName = ?, accessory = ?
     WHERE matricula = ?
     `;

const [result] = await db.query(query, [avatarPng, avatarPngName, accessory, matricula]);


    res.json({ success: true, message: 'Avatar guardado correctamente', data: { affectedRows: result.affectedRows } });
  } catch (error) {
    console.error('Error al guardar el avatar:', error);
    res.status(500).json({ success: false, message: 'Error del servidor al guardar el avatar.' });
  }
});
app.get('/api/sedes', async (req, res) => {
    try {
       
        const [rows] = await db.query(`
            SELECT 
                id_sede,
                nombre_sede
            FROM sede 
            ORDER BY nombre_sede ASC
        `);
        
        console.log('Número de sedes encontradas:', rows.length);
        console.log('Datos completos:', rows);
        
        res.json(rows);
        
    } catch (error) {
        console.error('Error completo:', error);
        res.status(500).json({
            error: 'Error al obtener sedes',
            details: error.message
        });
    }
});
app.get('/api/cursos/sede/:id_sede', async (req, res) => {
    try {
        const { id_sede } = req.params;
        
        const [rows] = await db.query(`
            SELECT 
                id_curso,
                nombre_curso,
                descripcion,
                modalidad,
                horas
            FROM cursos
            WHERE id_sede = ?
            ORDER BY nombre_curso ASC
        `, [id_sede]);

        res.json(rows);
        
    } catch (error) {
        console.error('Error al obtener cursos:', error);
        res.status(500).json({
            error: 'Error al obtener cursos'
        });
    }
});
 app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });


>>>>>>> Stashed changes
