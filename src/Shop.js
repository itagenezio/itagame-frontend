import React, { useState } from 'react';

function Shop() {
  const user = (() => { try { return JSON.parse(localStorage.getItem('user')) || {}; } catch { return {}; } })();
  const tecCoins = user.tecCoins || 0;
  const nivel = user.nivel || 1;

  const items = [
    { id: 1, nome: 'Camiseta ITAGAME', icone: '', custo: 50, nivelMin: 1, disponivel: true },
    { id: 2, nome: 'Kit Robotica', icone: '', custo: 150, nivelMin: 3, disponivel: true },
    { id: 3, nome: 'Curso Avancado', icone: '', custo: 200, nivelMin: 4, disponivel: true },
    { id: 4, nome: 'Certificado Especial', icone: '', custo: 500, nivelMin: 5, disponivel: false },
  ];

  const [msg, setMsg] = useState('');

  const solicitar = (item) => {
    if (tecCoins < item.custo) { setMsg('TecCoins insuficientes!'); return; }
    if (nivel < item.nivelMin) { setMsg('Nivel insuficiente!'); return; }
    setMsg('Solicitacao enviada com sucesso!');
  };

  const card = { background: '#1a1a2e', border: '1px solid rgba(0,212,170,0.2)', borderRadius: '16px', padding: '24px', transition: 'all 0.3s' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ color: 'white', marginBottom: '4px' }}>Loja de Recompensas</h2>
          <p style={{ color: '#94a3b8' }}>Troque seus TecCoins por recompensas</p>
        </div>
        <div style={{ background: '#1a1a2e', border: '1px solid #00d4aa', borderRadius: '12px', padding: '12px 20px', textAlign: 'center' }}>
          <div style={{ color: '#00d4aa', fontSize: '22px', fontWeight: 'bold' }}> {tecCoins}</div>
          <div style={{ color: '#94a3b8', fontSize: '12px' }}>TecCoins</div>
        </div>
      </div>

      {msg && (
        <div style={{ background: msg.includes('sucesso') ? 'rgba(0,212,170,0.1)' : 'rgba(239,68,68,0.1)', border: '1px solid ' + (msg.includes('sucesso') ? '#00d4aa' : '#ef4444'), borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', color: msg.includes('sucesso') ? '#00d4aa' : '#f87171' }}>
          {msg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '20px' }}>
        {items.map((item) => {
          const podeComprar = tecCoins >= item.custo && nivel >= item.nivelMin && item.disponivel;
          return (
            <div key={item.id} style={{ ...card, opacity: !item.disponivel ? 0.5 : 1 }}>
              <div style={{ fontSize: '48px', marginBottom: '12px', textAlign: 'center' }}>{item.icone}</div>
              <h3 style={{ color: 'white', marginBottom: '8px', textAlign: 'center' }}>{item.nome}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: '#00d4aa', fontWeight: 'bold' }}>{item.custo} TC</span>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>Nivel {item.nivelMin}+</span>
              </div>
              <button
                onClick={() => solicitar(item)}
                disabled={!podeComprar}
                style={{ width: '100%', padding: '10px', background: podeComprar ? '#00d4aa' : 'rgba(255,255,255,0.05)', color: podeComprar ? '#0f0f1a' : '#555', border: podeComprar ? 'none' : '1px solid #333', borderRadius: '8px', cursor: podeComprar ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}>
                {!item.disponivel ? 'Indisponivel' : !podeComprar ? 'Bloqueado' : 'Solicitar'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Shop;