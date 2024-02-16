const express = require("express");
const cors = require("cors");
  
const proyectRoutes = require("./routes/routes.proyect");
const epicsRoutes = require("./routes/routes.epica");
const taskRoutes = require("./routes/routes.task")
const userRoutes = require("./routes/routes.user")

const verifyToken = require("./middleware/authMiddleware")
const app = express();

require("dotenv").config()
app.use(cors());
app.use(express.json());

app.use(proyectRoutes);
app.use(epicsRoutes);
app.use(taskRoutes);
app.use(userRoutes);


app.get("/authentication/verify", verifyToken);

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
