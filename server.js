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
    const [results] = await db.query('SELECT * FROM usuarios WHERE matricula = ?', [matricula]);

    if (results.length > 0 && results[0].password === password) {
      res.json({
        success: true,
        message: 'Login exitoso',
        user: {
          id: results[0].id,
          nombre: results[0].nombre,
          app: results[0].app,
          matricula: results[0].matricula,
        },
      });
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

    res.status(200).json({ message: 'Contraseña registrada exitosamente.' });
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
