import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    listar();
  }, []);

  async function listar() {
    const res = await api.get("/api/pacientes");
    setPacientes(res.data);
  }

  async function cadastrar(e) {
    e.preventDefault();
    if (!nome || !email || !telefone || !dataNascimento || !senha) return;

    await api.post("/api/pacientes", {
      nome,
      email,
      telefone,
      data_nascimento: dataNascimento,
      senha,
    });

    setNome("");
    setEmail("");
    setTelefone("");
    setDataNascimento("");
    setSenha("");
    listar();
  }

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Pacientes</h2>

        <form onSubmit={cadastrar} className="grid grid-cols-1 gap-3 mb-4 max-w-xl">
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="email"
            className="border p-2 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            className="border p-2 rounded"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded"
            placeholder="Data de nascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />
          <input
            type="password"
            className="border p-2 rounded"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Adicionar</button>
        </form>

        <ul className="bg-white p-4 rounded shadow max-w-xl">
          {pacientes.map((p) => (
            <li key={p.id} className="py-2 border-b">
              <strong>{p.nome}</strong> — {p.email}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
