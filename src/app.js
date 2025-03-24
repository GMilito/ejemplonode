const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const institucionRoutes = require("./routes/institucionRoutes");
const authRoutes = require("./routes/authRoutes");
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

app.use('/api', routes);

module.exports = app;