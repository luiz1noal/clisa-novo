const pool = require('../models/db');

// Consultas por médico no mês atual
exports.consultasPorMedicoMes = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT m.nome AS nome, COUNT(c.id) AS total
            FROM consultorio.consultas c
            JOIN consultorio.medicos m ON c.medico_id = m.id
            WHERE DATE_TRUNC('month', c.data_hora) = DATE_TRUNC('month', CURRENT_DATE)
            GROUP BY m.nome
            ORDER BY total DESC
        `);
        res.json(result.rows);
    } catch (err) {
        console.error("Erro consultasPorMedicoMes:", err);
        res.status(500).json({ erro: "Erro ao obter consultas por médico no mês." });
    }
};

// Consultas por dia da semana no mês atual
exports.consultasPorDiaSemana = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                TO_CHAR(c.data_hora, 'Day') AS dia_semana,
                COUNT(c.id) AS total_consultas
            FROM consultorio.consultas c
            WHERE DATE_TRUNC('month', c.data_hora) = DATE_TRUNC('month', CURRENT_DATE)
            GROUP BY TO_CHAR(c.data_hora, 'Day')
            ORDER BY
                CASE
                    WHEN TO_CHAR(c.data_hora, 'Day') LIKE 'Monday%' THEN 1
                    WHEN TO_CHAR(c.data_hora, 'Day') LIKE 'Tuesday%' THEN 2
                    WHEN TO_CHAR(c.data_hora, 'Day') LIKE 'Wednesday%' THEN 3
                    WHEN TO_CHAR(c.data_hora, 'Day') LIKE 'Thursday%' THEN 4
                    WHEN TO_CHAR(c.data_hora, 'Day') LIKE 'Friday%' THEN 5
                    WHEN TO_CHAR(c.data_hora, 'Day') LIKE 'Saturday%' THEN 6
                    WHEN TO_CHAR(c.data_hora, 'Day') LIKE 'Sunday%' THEN 7
                    ELSE 8
                END
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Erro em consultasPorDiaSemana:', err);
        res.status(500).json({ error: 'Erro ao obter consultas por dia da semana.' });
    }
};

// Estatísticas gerais do sistema
exports.obterEstatisticas = async (req, res) => {
    try {
        const consultasHojeResult = await pool.query(`
            SELECT COUNT(*) AS total
            FROM consultorio.consultas
            WHERE DATE(data_hora) = CURRENT_DATE
        `);
        const consultasHoje = parseInt(consultasHojeResult.rows[0]?.total) || 0;

        const pacientesAtivosResult = await pool.query(`
            SELECT COUNT(*) AS total
            FROM consultorio.pacientes
            WHERE status = 'ativo'
        `);
        const pacientesAtivos = parseInt(pacientesAtivosResult.rows[0]?.total) || 0;

        const novosCadastrosResult = await pool.query(`
            SELECT COUNT(*) AS total
            FROM consultorio.pacientes
            WHERE DATE_TRUNC('month', data_cadastro) = DATE_TRUNC('month', CURRENT_DATE)
        `);
        const novosCadastros = parseInt(novosCadastrosResult.rows[0]?.total) || 0;

        const ultimosPacientesResult = await pool.query(`
            SELECT id, nome, email
            FROM consultorio.pacientes
            ORDER BY data_cadastro DESC
            LIMIT 5
        `);
        const ultimosPacientes = ultimosPacientesResult.rows;

        const ultimasConsultasResult = await pool.query(`
            SELECT c.id, p.nome AS pacienteNome, m.nome AS medicoNome, c.data_hora
            FROM consultorio.consultas c
            JOIN consultorio.pacientes p ON c.paciente_id = p.id
            JOIN consultorio.medicos m ON c.medico_id = m.id
            ORDER BY c.data_hora DESC
            LIMIT 5
        `);
        const ultimasConsultas = ultimasConsultasResult.rows;

        res.json({
            consultasHoje,
            pacientesAtivos,
            novosCadastros,
            ultimosPacientes,
            ultimasConsultas
        });
    } catch (err) {
        console.error("Erro ao obter estatísticas:", err);
        res.status(500).json({ erro: "Erro ao obter estatísticas." });
    }
};
