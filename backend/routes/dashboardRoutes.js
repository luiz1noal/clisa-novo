const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const autenticarToken = require('../middlewares/authMiddleware');

const {
  consultasPorMedicoMes,
  consultasPorDiaSemana,
  obterEstatisticas
} = require('../controllers/dashboardController');

router.get('/consultas-medicos-mes', autenticarToken, consultasPorMedicoMes);
router.get('/consultas-dia-semana', autenticarToken, consultasPorDiaSemana);
router.get('/', autenticarToken, obterEstatisticas);
=======
const authMiddleware = require('../middlewares/authMiddleware');
const {
  consultasPorDiaSemana,
  consultasPorMedicoPeriodo,
  consultasPorMedicoMes,
  consultasPorDiaSemanaPeriodo,
  obterEstatisticas
} = require('../controllers/dashboardController');

router.get('/consultas-medicos-mes', authMiddleware, consultasPorMedicoMes);
router.get('/consultas-medicos-periodo', authMiddleware, consultasPorMedicoPeriodo);
router.get('/consultas-dia-semana', authMiddleware, consultasPorDiaSemana);
router.get('/consultas-dia-semana-periodo', authMiddleware, consultasPorDiaSemanaPeriodo);
router.get('/dashboard', authMiddleware, obterEstatisticas);
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde

module.exports = router;
