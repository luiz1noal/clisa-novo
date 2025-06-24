const express = require('express');
const router = express.Router();
<<<<<<< HEAD
=======
const bcrypt = require('bcrypt');
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde

const {
  createUsuario,
  createMedico,
  listMedicos,
  createPaciente,
  listPacientes,
} = require('../controllers/userController');

router.post('/medicos', createMedico);
router.get('/medicos', listMedicos);

router.post('/pacientes', createPaciente);
router.get('/pacientes', listPacientes);

router.post('/usuarios', createUsuario);

module.exports = router;
