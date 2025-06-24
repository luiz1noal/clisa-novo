import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Pacientes from "./pages/Pacientes";
import Consultas from "./pages/Consultas";
import Uploads from "./pages/Uploads";
<<<<<<< HEAD
import ProtectedRoute from "./components/ProtectedRoute";
import Principal from './components/Principal';
import Cadastro from './pages/Cadastro';
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/principal" element={<Principal />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/pacientes"
            element={<ProtectedRoute><Pacientes /></ProtectedRoute>}
          />
          <Route
            path="/consultas"
            element={<ProtectedRoute><Consultas /></ProtectedRoute>}
          />
          <Route
            path="/uploads"
            element={<ProtectedRoute><Uploads /></ProtectedRoute>}
          />
          <Route path="*" element={<div className="p-8 text-center text-red-600">Página não encontrada</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
=======
import Perfil from "./pages/pgPerfil";
import ProtectedRoute from "./components/ProtectedRoute";
import Principal from './components/Principal';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/pacientes"
          element={<ProtectedRoute><Pacientes /></ProtectedRoute>}
        />
        <Route
          path="/consultas"
          element={<ProtectedRoute><Consultas /></ProtectedRoute>}
        />
        <Route
          path="/uploads"
          element={<ProtectedRoute><Uploads /></ProtectedRoute>}
        />
        <Route path="*" element={<div className="p-8 text-center text-red-600">Página não encontrada</div>} />
      </Routes>
    </BrowserRouter>
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
  );
}
