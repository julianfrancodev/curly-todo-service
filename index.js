const express = require("express");
const connectDatabase = require('./config/db');
// Crear el servidor

const app = express();

// Conectar a la base de datos

connectDatabase();

// Habilitar express.json

app.use(express.json({extended: true}));



// Puerto de la app
const PORT = process.env.PORT || 5000;

// Importar rUTAS

app.use('/api/users',require('./routes/Users'));
app.use('/api/auth', require('./routes/Auth'));


// Arrancamos el servidor

app.listen(PORT, () => {
  console.log(`Server Running in port  ${PORT}`);
});
