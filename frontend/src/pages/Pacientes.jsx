import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function Pacientes() {
  const [nome, setNome] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  useEffect(() => {
    listar();
  }, []);

  async function listar() {
    setLoading(true);
    setErro("");
    try {
      const res = await api.get("/pacientes");
      setPacientes(res.data);
    } catch (err) {
      setErro("Erro ao carregar pacientes.");
      console.error("Erro ao listar pacientes:", err);
    } finally {
      setLoading(false);
    }
  }

  async function cadastrar(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");
    if (!nome.trim()) {
      setErro("Por favor, informe o nome do paciente.");
      return;
    }
    try {
      await api.post("/pacientes", { nome });
      setNome("");
      setSucesso("Paciente cadastrado com sucesso!");
      listar();
    } catch (err) {
      setErro("Erro ao cadastrar paciente.");
      console.error("Erro ao cadastrar paciente:", err);
    }
  }

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Pacientes</h2>

        <form onSubmit={cadastrar} className="flex gap-2 mb-4">
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Nome do paciente"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 rounded" disabled={loading}>
            {loading ? "Carregando..." : "Adicionar"}
          </button>
        </form>

        {erro && (
          <div className="bg-red-200 text-red-800 p-3 rounded mb-4">
            {erro}
          </div>
        )}

        {sucesso && (
          <div className="bg-green-200 text-green-800 p-3 rounded mb-4">
            {sucesso}
          </div>
        )}

        {loading && !pacientes.length ? (
          <p>Carregando pacientes...</p>
        ) : (
          <ul className="bg-white p-4 rounded shadow max-h-96 overflow-auto">
            {pacientes.length > 0 ? (
              pacientes.map((p) => (
                <li key={p.id} className="py-2 border-b">
                  {p.nome}
                </li>
              ))
            ) : (
              <p className="p-4 text-center text-gray-500">Nenhum paciente cadastrado.</p>
            )}
          </ul>
        )}
      </div>
    </>
  );
}
