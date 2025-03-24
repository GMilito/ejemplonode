const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const institucionRoutes = require("./routes/institucionRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());


app.use("/api/institucion", institucionRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;