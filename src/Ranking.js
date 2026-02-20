import React, { useState, useEffect } from 'react';
import api from './services/api';
function Ranking() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        const sorted = response.data.sort((a, b) => b.points - a.points);
        setUsers(sorted);
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  if (loading) return <p>Carregando...</p>;
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🏆 Ranking de Pontos</h2>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
        {users.length === 0 ? (
          <p>Nenhum usuário</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>🥇 Posição</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>👤 Nome</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>📧 Email</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>⭐ Pontos</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>🎖️ Nível</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px' }}>{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}</td>
                  <td style={{ padding: '10px' }}>{user.name}</td>
                  <td style={{ padding: '10px' }}>{user.email}</td>
                  <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#007bff' }}>{user.points}</td>
                  <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#28a745' }}>{user.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
export default Ranking;