<<<<<<< HEAD
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

<<<<<<< HEAD
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
=======
  const navigate = useNavigate(); // hook para redirecionar
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
<<<<<<< HEAD
      const res = await api.post('/auth/login', { email, senha });

      if (res.data.token) {
        login(res.data.token, res.data.usuario);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErro(error.response.data.erro || "Erro ao fazer login");
      } else {
        setErro("Erro na conexão com o servidor.");
      }
=======
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.erro || "Erro ao fazer login");
      } else {
        localStorage.setItem("token", data.token);
        alert("Login realizado com sucesso!");
        navigate("/principal"); // redireciona para a página principal
      }
    } catch (err) {
      setErro("Erro na conexão com o servidor.");
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {erro && (
          <div className="bg-red-200 text-red-800 p-3 mb-4 rounded">{erro}</div>
        )}

        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
        />

        <label className="block mb-2 font-semibold">Senha</label>
        <input
          type="password"
          className="w-full p-2 mb-6 border rounded"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
<<<<<<< HEAD

        {/* Botão para ir para a página de cadastro */}
        <button
          type="button"
          onClick={() => navigate("/cadastro")}
          className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded font-semibold"
        >
          Ainda não tem conta? Cadastre-se
        </button>
=======
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
      </form>
    </div>
  );
}
