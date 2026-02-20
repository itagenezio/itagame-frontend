import React from 'react';

function Missions() {
  const categorias = [
    { nome: 'Programacao', cor: '#6366f1', icone: '' },
    { nome: 'Robotica', cor: '#00d4aa', icone: '' },
    { nome: 'Maker', cor: '#f59e0b', icone: '' },
    { nome: 'IoT', cor: '#ec4899', icone: '' },
    { nome: 'IA', cor: '#8b5cf6', icone: '' },
  ];

  const missoes = [];

  const card = { background: '#1a1a2e', border: '1px solid rgba(0,212,170,0.2)', borderRadius: '16px', padding: '24px' };

  return (
    <div>
      <h2 style={{ color: 'white', marginBottom: '8px' }}>Missoes</h2>
      <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Complete missoes e ganhe XP e TecCoins!</p>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {categorias.map((cat, i) => (
          <div key={i} style={{ background: cat.cor + '22', border: '1px solid ' + cat.cor, borderRadius: '999px', padding: '6px 16px', color: cat.cor, fontSize: '13px', fontWeight: '600' }}>
            {cat.icone} {cat.nome}
          </div>
        ))}
      </div>

      {missoes.length === 0 ? (
        <div style={{ ...card, textAlign: 'center', padding: '60px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}></div>
          <p style={{ color: '#94a3b8', fontSize: '18px' }}>Nenhuma missao disponivel ainda.</p>
          <p style={{ color: '#555', fontSize: '14px', marginTop: '8px' }}>As missoes aparecerao aqui quando forem cadastradas.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {missoes.map((m, i) => (
            <div key={i} style={{ ...card, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: 'white', marginBottom: '6px' }}>{m.title}</h3>
                <span style={{ background: '#00d4aa22', color: '#00d4aa', borderRadius: '999px', padding: '3px 12px', fontSize: '12px' }}>{m.category}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#fbbf24', fontWeight: 'bold' }}>+{m.xp || 0} XP</div>
                <div style={{ color: '#00d4aa', fontSize: '13px' }}>+{m.tecCoins || 0} TC</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Missions;