const express = require('express');
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Importa y usa las rutas
const indexRouter = require('./routes/index');
app.use('/api', indexRouter); // o usa simplemente app.use(indexRouter); dependiendo de tus necesidades

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});