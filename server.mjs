import express from 'express';
import { createServer } from 'http';
import { resolve } from 'path';

const app = express();

// Sirve los archivos estáticos desde la carpeta 'src'
const staticDir = resolve(new URL(import.meta.url).pathname, '../src');
app.use(express.static(staticDir));

// Ruta de inicio
app.get('/', (req, res) => {
  res.sendFile(resolve(staticDir, 'index.html'));
});

// Crea el servidor HTTP
const server = createServer(app);

// Define el puerto en el que escuchará el servidor
const PORT = process.env.PORT || 3000;

// Inicia el servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});