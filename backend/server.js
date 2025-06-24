<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const arquivosRoutes = require('./routes/arquivosRoutes');
const medicosRoutes = require('./routes/medicosRoutes');
const pacientesRoutes = require('./routes/pacientesRoutes');
const consultasRoutes = require('./routes/consultasRoutes');
=======
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models/db'); // ← Importa o db corretamente

console.log("DB_NAME =", process.env.DB_NAME);

const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const arquivosRoutes = require("./routes/arquivosRoutes");
const medicosRoutes = require("./routes/medicosRoutes");
const pacientesRoutes = require("./routes/pacientesRoutes");
const consultasRoutes = require('./routes/consultasRoutes');
const autenticarToken = require("./middlewares/authMiddleware");
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde

const app = express();
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api', arquivosRoutes);
app.use('/api/medicos', medicosRoutes);
app.use('/api/pacientes', pacientesRoutes);;
app.use('/api/consultas', consultasRoutes);
app.use('/uploads', express.static('uploads'));

// Middleware para tratar rotas inexistentes
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

=======
// Rotas
app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/arquivos', arquivosRoutes);
app.use('/api/medicos', medicosRoutes);
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/consultas', autenticarToken, consultasRoutes);
app.use('/uploads', express.static('uploads'));

// Teste de conexão com o banco
db.query("SELECT NOW()")
  .then(res => console.log("✅ Conexão com o banco feita com sucesso:", res.rows[0]))
  .catch(err => console.error("❌ Erro ao conectar com o banco:", err));

// Inicialização do servidor
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
