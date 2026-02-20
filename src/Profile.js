import React from 'react';

function Profile() {
  const user = (() => { try { return JSON.parse(localStorage.getItem('user')) || {}; } catch { return {}; } })();
  const xp = user.xp || 0;
  const nivel = xp < 100 ? 'Explorador' : xp < 300 ? 'Programador' : xp < 600 ? 'Maker' : xp < 1000 ? 'Engenheiro' : 'Mentor';
  const proximoNivel = xp < 100 ? 100 : xp < 300 ? 300 : xp < 600 ? 600 : xp < 1000 ? 1000 : 9999;
  const progresso = Math.min((xp / proximoNivel) * 100, 100).toFixed(0);

  const card = { background: '#1a1a2e', border: '1px solid rgba(0,212,170,0.2)', borderRadius: '16px', padding: '24px', marginBottom: '20px' };
  const nivelCores = { Explorador:'#8b5cf6', Programador:'#6366f1', Maker:'#00d4aa', Engenheiro:'#f59e0b', Mentor:'#ef4444' };

  return (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ ...card, display: 'flex', gap: '20px', alignItems: 'center', background: 'linear-gradient(135deg,#2d1b4e,#1a1a2e)' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg,#00d4aa,#4c2882)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0 }}>
          {(user.name || 'U')[0].toUpperCase()}
        </div>
        <div>
          <h2 style={{ color: 'white', marginBottom: '4px' }}>{user.name || 'Usuario'}</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '8px' }}>{user.email || 'email@exemplo.com'}</p>
          <span style={{ background: (nivelCores[nivel] || '#00d4aa') + '22', color: nivelCores[nivel] || '#00d4aa', border: '1px solid ' + (nivelCores[nivel] || '#00d4aa'), borderRadius: '999px', padding: '3px 14px', fontSize: '13px', fontWeight: '600' }}>
            {nivel}
          </span>
        </div>
      </div>

      <div style={card}>
        <h3 style={{ color: '#00d4aa', marginBottom: '16px' }}>Progresso de Nivel</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: 'white', fontWeight: 'bold' }}>{nivel}</span>
          <span style={{ color: '#94a3b8', fontSize: '13px' }}>{xp} / {proximoNivel} XP</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.1)', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ background: 'linear-gradient(90deg,#00d4aa,#4c2882)', height: '100%', width: progresso + '%', transition: 'width 0.5s' }}></div>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px', textAlign: 'right' }}>{progresso}% completo</p>
      </div>

      <div style={{ ...card, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#fbbf24' }}> {xp}</div>
          <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>XP Total</div>
        </div>
        <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#00d4aa' }}> {user.tecCoins || 0}</div>
          <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>TecCoins</div>
        </div>
        <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#8b5cf6' }}> 0</div>
          <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>Missoes</div>
        </div>
        <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ec4899' }}> 0</div>
          <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>Conquistas</div>
        </div>
      </div>

      <div style={card}>
        <h3 style={{ color: '#00d4aa', marginBottom: '16px' }}>Informacoes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[{label:'Nome',val:user.name||'Nao informado'},{label:'Email',val:user.email||'Nao informado'},{label:'Perfil',val:user.role==='admin'?'Administrador':user.role==='teacher'?'Professor':'Estudante'}].map((info,i)=>(
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
              <span style={{ color: '#94a3b8' }}>{info.label}</span>
              <span style={{ color: 'white', fontWeight: '500' }}>{info.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Profile;