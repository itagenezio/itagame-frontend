import React, { useState } from 'react';
function Missions() {
  const [missions, setMissions] = useState([
    { id: 1, title: '🎓 Completar 1 Curso', description: 'Finalize um curso completo.', progress: 30, reward: 50, completed: false },
    { id: 2, title: '✏️ Fazer 5 Exercícios', description: 'Complete 5 exercícios.', progress: 60, reward: 75, completed: false },
    { id: 3, title: '⭐ Ganhar 100 Pontos', description: 'Alcance 100 pontos no sistema.', progress: 80, reward: 100, completed: false },
    { id: 4, title: '🏆 Participar do Ranking', description: 'Entre no ranking semanal.', progress: 0, reward: 50, completed: false },
    { id: 5, title: '📚 Estudar 2 Horas', description: 'Estude por 2 horas consecutivas.', progress: 45, reward: 150, completed: false },
    { id: 6, title: '🤝 Ajudar 3 Colegas', description: 'Ajude 3 colegas com dúvidas.', progress: 100, reward: 80, completed: true },
  ]);
  const [userPoints, setUserPoints] = useState(0);
  const [message, setMessage] = useState('');
  const completeMission = (id) => {
    const mission = missions.find(m => m.id === id);
    setMissions(missions.map(m => m.id === id ? { ...m, completed: true } : m));
    setUserPoints(userPoints + mission.reward);
    setMessage(`✅ Missão completada! Você ganhou ${mission.reward} pontos.`);
    setTimeout(() => setMessage(''), 3000);
  };
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>🎯 Minhas Missões</h2>
      <p style={{ textAlign: 'right', marginBottom: '20px', fontSize: '1.1em', fontWeight: 'bold' }}>
        Pontos Totais: <span style={{ color: '#007bff' }}>⭐ {userPoints}</span>
      </p>
      {message && (
        <p style={{ marginTop: '15px', padding: '10px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '4px', textAlign: 'center', marginBottom: '20px' }}>
          {message}
        </p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {missions.map((mission) => (
          <div key={mission.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', border: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ marginBottom: '5px', color: '#2c3e50' }}>{mission.title}</h3>
              <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '15px' }}>{mission.description}</p>
              <div style={{ marginBottom: '15px' }}>
                <div style={{ width: '100%', height: '10px', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${mission.progress}%`, height: '100%', background: 'linear-gradient(90deg, #11998e 0%, #38ef7d 100%)', transition: 'width 0.5s ease-in-out' }}></div>
                </div>
                <p style={{ fontSize: '0.85em', color: '#999', marginTop: '5px' }}>{mission.progress}% concluído</p>
              </div>
              <p style={{ fontWeight: 'bold', color: '#f5af19', fontSize: '1.1em', marginBottom: '15px' }}>
                🎁 Recompensa: {mission.reward} pontos
              </p>
            </div>
            <button onClick={() => completeMission(mission.id)} disabled={mission.completed} style={{ padding: '10px 15px', background: mission.completed ? '#6c757d' : 'linear-gradient(135deg, #00d4ff 0%, #007bff 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: mission.completed ? 'not-allowed' : 'pointer', fontWeight: 'bold', opacity: mission.completed ? 0.6 : 1 }}>
              {mission.completed ? '✅ Completada' : '🎯 Completar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Missions;