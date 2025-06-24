const express = require("express");
const router = express.Router();
const consultasController = require("../controllers/consultasController");
<<<<<<< HEAD
const authMiddleware = require("../middlewares/authMiddleware");

// Rota atual para listar consultas
router.get("/", authMiddleware, consultasController.listarConsultas);

// NOVA rota para estatísticas
router.get("/estatisticas", authMiddleware, consultasController.obterEstatisticas);
=======

// GET /api/consultas
router.get("/", consultasController.listarConsultas);

// GET /api/consultas/:id
router.get("/:id", consultasController.buscarConsulta);

// POST /api/consultas
router.post("/", consultasController.criarConsulta);

// PUT /api/consultas/:id
router.put("/:id", consultasController.atualizarConsulta);

// DELETE /api/consultas/:id
router.delete("/:id", consultasController.deletarConsulta);
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde

module.exports = router;
