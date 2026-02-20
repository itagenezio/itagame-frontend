import React, { useState, useEffect } from 'react';
import api from './services/api';

function Ranking() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    api.get('/users').then(res => {
      const users = Array.isArray(res.data) ? res.data : Array.isArray(res.data.users) ? res.data.users : [];
      const sorted = users.sort((a, b) => (b.xp || 0) - (a.xp || 0));
      setRanking(sorted);
    }).catch(() => setRanking([]));
  }, []);

  const medalha = (pos) => {
    if (pos === 0) return { icone: '', cor: '#fbbf24', bg: 'rgba(251,191,36,0.1)' };
    if (pos === 1) return { icone: '', cor: '#94a3b8', bg: 'rgba(148,163,184,0.1)' };
    if (pos === 2) return { icone: '', cor: '#f97316', bg: 'rgba(249,115,22,0.1)' };
    return { icone: (pos + 1).toString(), cor: '#94a3b8', bg: 'transparent' };
  };

  const card = { background: '#1a1a2e', border: '1px solid rgba(0,212,170,0.2)', borderRadius: '16px', padding: '24px' };

  return (
    <div>
      <h2 style={{ color: 'white', marginBottom: '8px' }}>Ranking</h2>
      <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Os melhores alunos do ITAGAME</p>
      <div style={card}>
        {ranking.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}></div>
            <p style={{ color: '#94a3b8' }}>Nenhum dado de ranking ainda.</p>
          </div>
        ) : ranking.map((u, i) => {
          const m = medalha(i);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px', marginBottom: '8px', background: m.bg, borderRadius: '10px', border: i < 3 ? '1px solid ' + m.cor + '44' : 'none' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: m.bg, color: m.cor, fontWeight: 'bold', fontSize: i < 3 ? '20px' : '14px' }}>
                {m.icone}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: i < 3 ? 'white' : '#ccc', fontWeight: i < 3 ? 'bold' : 'normal' }}>{u.name || u.email}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{u.email}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#fbbf24', fontWeight: 'bold' }}>{u.xp || 0} XP</div>
                <div style={{ color: '#00d4aa', fontSize: '12px' }}> {u.tecCoins || 0}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Ranking;