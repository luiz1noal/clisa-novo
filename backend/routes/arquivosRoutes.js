const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const autenticarToken = require("../middlewares/authMiddleware");
const { listarArquivos } = require("../controllers/arquivosController");

router.get("/arquivos", autenticarToken, listarArquivos);
=======
const upload = require("../middlewares/upload");
const arquivosController = require("../controllers/arquivosController");

// Upload
router.post("/", upload.single("arquivo"), arquivosController.uploadArquivo);

// Listar
router.get("/", arquivosController.listarArquivos);
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde

module.exports = router;
