const pool = require('../models/db'); // sua conexão com o PostgreSQL

exports.listarPacientes = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nome FROM consultorio.pacientes ORDER BY nome');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar pacientes:', err);
    res.status(500).json({ erro: 'Erro ao listar pacientes' });
  }
};

exports.criarPaciente = async (req, res) => {
  const { nome } = req.body;

  if (!nome || !nome.trim()) {
    return res.status(400).json({ erro: 'Nome do paciente é obrigatório' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO consultorio.pacientes (nome, data_cadastro, status) VALUES ($1, NOW(), $2) RETURNING id, nome',
      [nome.trim(), 'ativo'] // status padrão ativo
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao cadastrar paciente:', err);
    res.status(500).json({ erro: 'Erro ao cadastrar paciente' });
  }
};
exports.buscarPaciente = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT id, nome FROM consultorio.pacientes WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: 'Paciente não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar paciente:', err);
    res.status(500).json({ erro: 'Erro ao buscar paciente' });
  }
};

// Atualizar paciente por ID
exports.atualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  if (!nome || !nome.trim()) {
    return res.status(400).json({ erro: 'Nome do paciente é obrigatório' });
  }

  try {
    const result = await pool.query(
      'UPDATE consultorio.pacientes SET nome = $1 WHERE id = $2 RETURNING id, nome',
      [nome.trim(), id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: 'Paciente não encontrado para atualização' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar paciente:', err);
    res.status(500).json({ erro: 'Erro ao atualizar paciente' });
  }
};

// Deletar paciente por ID
exports.deletarPaciente = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM consultorio.pacientes WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: 'Paciente não encontrado para exclusão' });
    }

    res.json({ mensagem: 'Paciente excluído com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar paciente:', err);
    res.status(500).json({ erro: 'Erro ao deletar paciente' });
  }
};
