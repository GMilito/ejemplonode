const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const carreraRoutes = require('./routes/carreraRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const grupoRoutes = require('./routes/grupoRoutes');
const institucionRoutes = require('./routes/institucionRoutes');
const periodoRoutes = require('./routes/periodoRoutes');
const profesorRoutes = require('./routes/profesorRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Rutas
app.use('/institucion', institucionRoutes);
app.use('/carrera', carreraRoutes);
app.use('/curso', cursoRoutes);
app.use('/grupo', grupoRoutes);
app.use('/periodo', periodoRoutes);
app.use('/profesor', profesorRoutes);




module.exports = app;