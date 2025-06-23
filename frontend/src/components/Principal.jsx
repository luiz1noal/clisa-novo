import React from "react";
import Navbar from "./Navbar";

export default function Principal() {
  return (
    <div className="min-h-screen pt-20 bg-green-100 flex flex-col items-center justify-center">
      <Navbar />
      <h1 className="text-3xl font-bold">Bem-vindo à Página Principal!</h1>
      <p className="mt-4">Você está logado com sucesso.</p>
    </div>
  );
}
