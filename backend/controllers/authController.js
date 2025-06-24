<<<<<<< HEAD
const pool = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
  }

  try {
    const result = await pool.query(
      'SELECT id, nome, email, senha FROM consultorio.usuarios WHERE email = $1',
      [email]
    );
    const usuario = result.rows[0];

    if (!usuario) {
      return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
    }

    if (!usuario.senha) {
      console.error('Senha do usuário está undefined ou null:', usuario);
      return res.status(500).json({ erro: 'Senha inválida ou não registrada para este usuário.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
=======
const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "segredo";

async function registrar(req, res) {
  const { nome, email, senha } = req.body;

  try {
    const senhaHash = await bcrypt.hash(senha, 10);

    const resultado = await db.query(
      "INSERT INTO consultorio.usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email",
      [nome, email, senhaHash]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    console.error("Erro ao registrar usuário:", err);
    res.status(500).json({ erro: "Erro ao registrar usuário" });
  }
}

async function login(req, res) {
  const { email, senha } = req.body;
  console.log("Login tentado com:", email, senha); // DEBUG

  try {
    const resultado = await db.query(
      "SELECT * FROM consultorio.usuarios WHERE email = $1",
      [email]
    );

    if (resultado.rows.length === 0) {
      console.log("Usuário não encontrado");
      return res.status(401).json({ erro: "Usuário não encontrado" });
    }

    const usuario = resultado.rows[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      console.log("Senha incorreta");
      return res.status(401).json({ erro: "Senha incorreta" });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, {
      expiresIn: "4h",
    });

    res.json({ token });
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    res.status(500).json({ erro: "Erro ao fazer login" });
  }
}


module.exports = {
  registrar,
  login,
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
};
