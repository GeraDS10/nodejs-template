import express from 'express';
import { createServer } from 'http';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Obtener la ruta del directorio estático
const __dirname = dirname(fileURLToPath(import.meta.url));
const staticDir = resolve(__dirname, '../src');
app.use(express.static(staticDir));

// Importar las rutas desde routes/index.js
import indexRouter from '../src/routes/index';

// Utilizar las rutas importadas
app.use('/api', indexRouter);

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