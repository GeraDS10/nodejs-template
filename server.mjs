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