<<<<<<< HEAD
const pool = require("../models/db");

exports.listarArquivos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM consultorio.arquivos");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao listar arquivos:", err);
    res.status(500).json({ erro: "Erro interno do servidor ao listar arquivos" });
  }
};

exports.uploadArquivo = async (req, res) => {
  // Aqui vai a lógica de upload (exemplo se usar multer)
  res.json({ mensagem: "Arquivo enviado com sucesso" });
=======
const db = require("../models/db");
const path = require("path");

async function uploadArquivo(req, res) {
  const { paciente_id, consulta_id } = req.body;
  const arquivo = req.file;

  if (!arquivo) {
    return res.status(400).json({ erro: "Nenhum arquivo enviado" });
  }

  try {
    const resultado = await db.query(
      `INSERT INTO consultorio.arquivos (paciente_id, consulta_id, nome, caminho, tipo)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        paciente_id || null,
        consulta_id || null,
        arquivo.originalname,
        arquivo.path,
        arquivo.mimetype
      ]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao salvar arquivo no banco" });
  }
}

async function listarArquivos(req, res) {
  try {
    const resultado = await db.query(
      "SELECT * FROM consultorio.arquivos ORDER BY criado_em DESC"
    );
    res.json(resultado.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao listar arquivos" });
  }
}

module.exports = {
  uploadArquivo,
  listarArquivos
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
};
