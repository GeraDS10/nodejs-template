import express from 'express';
import { createServer } from 'http';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Obtener la ruta del directorio estático
const staticDir = resolve(fileURLToPath(import.meta.url), '../src');
app.use(express.static(staticDir));

// Ruta de inicio
app.get('/', (req, res) => {
  console.log('Se recibió una solicitud GET en la ruta /');
  res.sendFile(resolve(staticDir, 'index.html'));
});

// Ruta de otra solicitud
app.get('/otra-ruta', (req, res) => {
  console.log('Se recibió una solicitud GET en la ruta /otra-ruta');
  res.send('Respuesta desde la ruta /otra-ruta');
});

// Crea el servidor HTTP
const server = createServer(app);

// Define el puerto en el que escuchará el servidor
const PORT = process.env.PORT || 3000;

// Imprime un mensaje cuando el servidor empiece a escuchar
server.on('listening', () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Imprime un mensaje cuando ocurra un error en el servidor
server.on('error', (error) => {
  console.error('Error en el servidor:', error);
});

// Inicia el servidor
server.listen(PORT);