const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'arely',
  password: '1234',
  database: 'prueba_dipa'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

app.post('/Login', (req, res) => {
  const { matricula, password } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE matricula = ? AND password = ?';
  db.query(sql, [matricula, password], (err, results) => {
    if (err) return res.status(500).send({ message: 'Error en el servidor', error: err });
    if (results.length > 0) {
      res.send({ success: true, message: 'Login exitoso', user: results[0] });
    } else {
      res.send({ success: false, message: 'Matrícula o contraseña incorrecta', error: 'Invalid credentials' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
