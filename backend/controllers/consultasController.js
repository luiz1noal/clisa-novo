const db = require("../models/db");

// Listar todas as consultas com dados de médico e paciente
async function listarConsultas(req, res) {
  try {
    const resultado = await db.query(`
      SELECT
        c.id,
        c.data_hora,
<<<<<<< HEAD
        c.status,
=======
        c.motivo,
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
        m.nome AS nome_medico,
        p.nome AS nome_paciente
      FROM consultorio.consultas c
      JOIN consultorio.medicos m ON c.medico_id = m.id
      JOIN consultorio.pacientes p ON c.paciente_id = p.id
      ORDER BY c.data_hora DESC
    `);
    res.json(resultado.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao listar consultas" });
  }
}

// Buscar consulta por ID
async function buscarConsulta(req, res) {
  const { id } = req.params;
<<<<<<< HEAD
=======
  const idInt = parseInt(id, 10);
  
  if (isNaN(idInt)) {
    return res.status(400).json({ erro: "ID inválido. Deve ser um número inteiro." });
  }

>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
  try {
    const resultado = await db.query(`
      SELECT
        c.id,
        c.data_hora,
<<<<<<< HEAD
        c.status,
=======
        c.motivo,
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
        m.nome AS nome_medico,
        p.nome AS nome_paciente
      FROM consultorio.consultas c
      JOIN consultorio.medicos m ON c.medico_id = m.id
      JOIN consultorio.pacientes p ON c.paciente_id = p.id
      WHERE c.id = $1
<<<<<<< HEAD
    `, [id]);
=======
    `, [idInt]);
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Consulta não encontrada" });
    }
<<<<<<< HEAD
=======

>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
    res.json(resultado.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar consulta" });
  }
}

// Criar nova consulta
async function criarConsulta(req, res) {
<<<<<<< HEAD
  const { paciente_id, medico_id, data_hora } = req.body;
  try {
    const resultado = await db.query(
      `INSERT INTO consultorio.consultas (paciente_id, medico_id, data_hora)
       VALUES ($1, $2, $3) RETURNING *`,
      [paciente_id, medico_id, data_hora]
=======
  const { paciente_id, medico_id, data_hora, motivo } = req.body;
  try {
    const resultado = await db.query(
      `INSERT INTO consultorio.consultas (paciente_id, medico_id, data_hora, motivo)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [paciente_id, medico_id, data_hora, motivo]
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
    );
    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao criar consulta" });
  }
}

<<<<<<< HEAD
// Atualizar status e/ou data
async function atualizarConsulta(req, res) {
  const { id } = req.params;
  const { data_hora, status } = req.body;
=======
// Atualizar status e/ou data_hora
async function atualizarConsulta(req, res) {
  const { id } = req.params;
  const { data_hora, status } = req.body;
  const idInt = parseInt(id, 10);

  if (isNaN(idInt)) {
    return res.status(400).json({ erro: "ID inválido. Deve ser um número inteiro." });
  }
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde

  try {
    const resultado = await db.query(
      `UPDATE consultorio.consultas
       SET data_hora = COALESCE($1, data_hora),
           status = COALESCE($2, status)
       WHERE id = $3
       RETURNING *`,
<<<<<<< HEAD
      [data_hora, status, id]
=======
      [data_hora, status, idInt]
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Consulta não encontrada" });
    }

    res.json(resultado.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao atualizar consulta" });
  }
}

// Deletar consulta
async function deletarConsulta(req, res) {
  const { id } = req.params;
<<<<<<< HEAD
  try {
    const resultado = await db.query(
      "DELETE FROM consultorio.consultas WHERE id = $1 RETURNING *",
      [id]
=======
  const idInt = parseInt(id, 10);

  if (isNaN(idInt)) {
    return res.status(400).json({ erro: "ID inválido. Deve ser um número inteiro." });
  }

  try {
    const resultado = await db.query(
      "DELETE FROM consultorio.consultas WHERE id = $1 RETURNING *",
      [idInt]
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
    );
    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Consulta não encontrada" });
    }
    res.json({ mensagem: "Consulta deletada com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao deletar consulta" });
  }
}

<<<<<<< HEAD
async function obterEstatisticas(req, res) {
  try {
    const estatisticas = {
      totalConsultas: 100,
      consultasPorMedico: [
        { medico: "Dr. João", total: 40 },
        { medico: "Dra. Maria", total: 60 },
      ],
    };

    res.json(estatisticas);
  } catch (error) {
    console.error("Erro ao obter estatísticas:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

=======
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
module.exports = {
  listarConsultas,
  buscarConsulta,
  criarConsulta,
  atualizarConsulta,
  deletarConsulta,
<<<<<<< HEAD
  obterEstatisticas,
=======
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
};
