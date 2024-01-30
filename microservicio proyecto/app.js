const express = require('express');
const router = require('./routes/routes');
const permisos = require('./routes/permisos')
const app = express();

app.use(express.json());


app.use('/', router);
app.use('/permisos', permisos);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});