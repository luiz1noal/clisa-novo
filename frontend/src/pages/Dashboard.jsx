import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import Navbar from "../components/Navbar";
import api from "../services/api";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function Dashboard() {
  const [dados, setDados] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/api/dashboard/dashboard");
        console.log("Dados recebidos da API:", res.data);

        setDados({
          labels: res.data.map((item) => item.mes),
          datasets: [{
            label: "Consultas por mês",
            data: res.data.map((item) => item.total),
            backgroundColor: "#3B82F6"
          }]
        });
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    }
    fetchData(); // IMPORTANTE: chama a função para rodar o fetch
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>

          {/* Cards resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Consultas Hoje</h3>
              <p className="text-4xl font-bold text-blue-600">15</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Pacientes Ativos</h3>
              <p className="text-4xl font-bold text-green-600">120</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Médicos</h3>
              <p className="text-4xl font-bold text-purple-600">8</p>
            </div>
          </div>

          {/* Gráfico */}
          <div className="bg-white p-6 rounded-lg shadow">
            {dados.labels ? (
              <Bar data={dados} options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Consultas por mês',
                    font: { size: 18 }
                  }
                }
              }} />
            ) : (
              <p className="text-center text-gray-500">Carregando gráfico...</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
