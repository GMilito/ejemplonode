require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3000;

sequelize.sync()
    .then(() => console.log("✅ Base de datos sincronizada"))
    .catch(err => console.error("❌ Error al sincronizar:", err));

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});