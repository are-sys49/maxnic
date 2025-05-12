// MiComponente.js
import mysql from 'mysql';
import { dbConfig } from '../dbconfig.js'; // Asegúrate de que la ruta sea correcta

function MiComponente() {
  React.useEffect(() => {
    const connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
      if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
      }
      console.log('Conexión a la base de datos establecida');

      // Ejecutar consultas a la base de datos
      connection.query('SELECT * FROM usuarios', (error, results, fields) => {
        if (error) {
          console.error('Error al ejecutar la consulta:', error);
          return;
        }
        // Procesar los resultados de la consulta
        console.log(results);
      });

      connection.end();
    });
  }, []);

  return (
    // Renderizar el componente
    <View>
      <Text>Datos de la base de datos</Text>
    </View>
  );
}
