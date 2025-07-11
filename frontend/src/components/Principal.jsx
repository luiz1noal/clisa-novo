<<<<<<< HEAD
import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";

export default function Principal() {
  const { usuario, logout } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDashboard() {
      setLoading(true);
      setErro("");
      try {
        const res = await api.get("/dashboard");
        setDashboardData(res.data);
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logout();
          navigate("/login");
        } else {
          setErro("Falha ao carregar dados do dashboard.");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, [logout, navigate]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-6">
        <h1 className="text-3xl font-bold mb-4">
          Bem-vindo, {usuario?.nome || "Usuário"}!
        </h1>

        {loading && <Loader />}

        {erro && <Alert type="error" message={erro} />}

        {!loading && !erro && dashboardData && (
          <section className="w-full max-w-4xl bg-white rounded shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Seu resumo do dia</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-100 p-4 rounded shadow">
                <h3 className="text-lg font-medium">Consultas Hoje</h3>
                <p className="text-3xl font-bold">{dashboardData.consultasHoje}</p>
              </div>

              <div className="bg-yellow-100 p-4 rounded shadow">
                <h3 className="text-lg font-medium">Pacientes Ativos</h3>
                <p className="text-3xl font-bold">{dashboardData.pacientesAtivos}</p>
              </div>

              <div className="bg-green-100 p-4 rounded shadow">
                <h3 className="text-lg font-medium">Novos Cadastros</h3>
                <p className="text-3xl font-bold">{dashboardData.novosCadastros}</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Últimos Pacientes</h2>
              <ul className="list-disc list-inside text-gray-700">
                {dashboardData.ultimosPacientes.map((paciente) => (
                  <li key={paciente.id}>
                    {paciente.nome} ({paciente.email})
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Últimas Consultas</h2>
              <ul className="list-disc list-inside text-gray-700">
                {dashboardData.ultimasConsultas.map((consulta) => (
                  <li key={consulta.id}>
                    {consulta.pacienteNome} com {consulta.medicoNome} em{" "}
                    {new Date(consulta.data).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={logout}
              className="mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded"
            >
              Sair
            </button>
          </section>
        )}

        {!loading && !erro && !dashboardData && (
          <p className="text-gray-700 mt-4">Nenhum dado disponível no momento.</p>
        )}
      </main>
    </>
=======
import React from "react";
import Navbar from "./Navbar";

export default function Principal() {
  return (
    <div className="min-h-screen pt-20 bg-green-100 flex flex-col items-center justify-center">
      <Navbar />
      <h1 className="text-3xl font-bold">Bem-vindo à Página Principal!</h1>
      <p className="mt-4">Você está logado com sucesso.</p>
    </div>
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
  );
}
