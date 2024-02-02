const express = require("express");
const proyectRoutes = require("./routes/routes.proyect");
const epicsRoutes = require("./routes/routes.epica");
const taskRoutes = require("./routes/routes.task")
const userRoutes = require("./routes/routes.user")
const app = express();

app.use(express.json());

app.use(proyectRoutes);
app.use(epicsRoutes);
app.use(taskRoutes);
app.use(userRoutes);

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
