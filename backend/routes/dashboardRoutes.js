const express = require('express');
const router = express.Router();
const autenticarToken = require('../middlewares/authMiddleware');

const {
  consultasPorMedicoMes,
  consultasPorDiaSemana,
  obterEstatisticas
} = require('../controllers/dashboardController');

router.get('/consultas-medicos-mes', autenticarToken, consultasPorMedicoMes);
router.get('/consultas-dia-semana', autenticarToken, consultasPorDiaSemana);
router.get('/', autenticarToken, obterEstatisticas);

module.exports = router;
