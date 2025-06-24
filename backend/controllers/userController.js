const pool = require('../models/db');
const bcrypt = require('bcrypt');

// Criar médico (precisa de usuário já cadastrado)
exports.createMedico = async (req, res) => {
  const { usuario_id, especialidade, crm } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO consultorio.medicos (usuario_id, especialidade, crm) VALUES ($1, $2, $3) RETURNING *',
      [usuario_id, especialidade, crm]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar médicos
exports.listMedicos = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT m.id, u.nome, u.email, m.especialidade, m.crm
      FROM medicos m
<<<<<<< HEAD
      JOIN consultorio.usuarios u ON m.usuario_id = u.id
=======
      JOIN usuarios u ON m.usuario_id = u.id
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Criar paciente (precisa de usuário já cadastrado)
exports.createPaciente = async (req, res) => {
  const { usuario_id, data_nascimento } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO consultorio.pacientes (usuario_id, data_nascimento) VALUES ($1, $2) RETURNING *',
      [usuario_id, data_nascimento]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar pacientes
exports.listPacientes = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.id, u.nome, u.email, p.data_nascimento
      FROM pacientes p
<<<<<<< HEAD
      JOIN consultorio.usuarios u ON p.usuario_id = u.id
=======
      JOIN usuarios u ON p.usuario_id = u.id
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Criar usuário
exports.createUsuario = async (req, res) => {
<<<<<<< HEAD
  const { nome, email, senha, papel } = req.body;

  try {
    const verifica = await pool.query('SELECT id FROM consultorio.usuarios WHERE email = $1', [email]);

    if (verifica.rows.length > 0) {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }

    const hashedSenha = await bcrypt.hash(senha, 10);

    const result = await pool.query(
      'INSERT INTO consultorio.usuarios (nome, email, senha, papel) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, email, hashedSenha, papel]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao cadastrar usuário:', err);
    res.status(500).json({ error: 'Erro interno ao cadastrar usuário.' });
  }
};
=======
  const { nome, email, senha } = req.body;
  try {
    // Criptografar senha
    const saltRounds = 10;
    const hashedSenha = await bcrypt.hash(senha, saltRounds);
    
    const result = await pool.query(
      'INSERT INTO consultorio.usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, senha]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
