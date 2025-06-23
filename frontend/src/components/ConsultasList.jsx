import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function NovaConsultaModal({ isOpen, onClose, onCriado }) {
  const [pacienteId, setPacienteId] = useState('');
  const [medicoId, setMedicoId] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [motivo, setMotivo] = useState('');

  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    api.get('/pacientes').then(res => setPacientes(res.data));
    api.get('/medicos').then(res => setMedicos(res.data));
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pacienteId || !medicoId || !dataHora) {
      alert('Preencha paciente, médico e data/hora');
      return;
    }

    try {
      await api.post('/consultas', {
        paciente_id: pacienteId,
        medico_id: medicoId,
        data_hora: dataHora,
        motivo: motivo || 'Consulta agendada',
      });
      alert('Consulta criada com sucesso!');
      onCriado();
      onClose();
      setPacienteId('');
      setMedicoId('');
      setDataHora('');
      setMotivo('');
    } catch (err) {
      alert('Erro ao criar consulta: ' + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 mx-2">
        <h2 className="text-2xl font-semibold mb-6 text-center">Nova Consulta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="paciente" className="block text-gray-700 font-medium mb-1">
              Paciente
            </label>
            <select
              id="paciente"
              value={pacienteId}
              onChange={e => setPacienteId(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione</option>
              {pacientes.map(p => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="medico" className="block text-gray-700 font-medium mb-1">
              Médico
            </label>
            <select
              id="medico"
              value={medicoId}
              onChange={e => setMedicoId(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione</option>
              {medicos.map(m => (
                <option key={m.id} value={m.id}>
                  {m.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="dataHora" className="block text-gray-700 font-medium mb-1">
              Data e Hora
            </label>
            <input
              id="dataHora"
              type="datetime-local"
              value={dataHora}
              onChange={e => setDataHora(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="motivo" className="block text-gray-700 font-medium mb-1">
              Motivo (opcional)
            </label>
            <input
              id="motivo"
              type="text"
              value={motivo}
              onChange={e => setMotivo(e.target.value)}
              placeholder="Motivo da consulta"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Agendar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
