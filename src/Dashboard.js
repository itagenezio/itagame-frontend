import React from 'react';

function Dashboard({ onNavigate }) {
  const user = (() => { try { return JSON.parse(localStorage.getItem('user')) || {}; } catch { return {}; } })();
  const role = user.role || 'student';

  const xp = user.xp || 0;
  const nivel = xp < 100 ? 'Explorador' : xp < 300 ? 'Programador' : xp < 600 ? 'Maker' : xp < 1000 ? 'Engenheiro' : 'Mentor';
  const proximoNivel = xp < 100 ? 100 : xp < 300 ? 300 : xp < 600 ? 600 : xp < 1000 ? 1000 : 9999;
  const progresso = Math.min((xp / proximoNivel) * 100, 100).toFixed(0);

  const grid = { display: 'grid', gap: '20px' };
  const card = { background: '#1a1a2e', border: '1px solid rgba(0,212,170,0.2)', borderRadius: '16px', padding: '24px', transition: 'all 0.3s' };

  if (role === 'admin') return (
    <div>
      <div style={{ background: 'linear-gradient(135deg,#2d1b4e,#1a1a2e)', borderRadius: '16px', padding: '28px', marginBottom: '24px', borderLeft: '4px solid #00d4aa' }}>
        <h2 style={{ color: 'white', fontSize: '24px', marginBottom: '4px' }}>Painel Administrativo</h2>
        <p style={{ color: '#94a3b8' }}>Visao geral do sistema ITAGAME</p>
      </div>
      <div style={{ ...grid, gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', marginBottom: '24px' }}>
        {[{label:'Total de Usuarios',val:'0',icon:''},{label:'Total de Cursos',val:'0',icon:''},{label:'Missoes Ativas',val:'0',icon:''},{label:'Resgates Pendentes',val:'0',icon:''}].map((s,i) => (
          <div key={i} style={card}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{s.icon}</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#00d4aa' }}>{s.val}</div>
            <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ ...grid, gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))' }}>
        {[{label:'Gerenciar Usuarios',page:'profile',icon:''},{label:'Ver Cursos',page:'courses',icon:''},{label:'Ver Missoes',page:'missions',icon:''},{label:'Ver Ranking',page:'ranking',icon:''}].map((c,i)=>(
          <div key={i} onClick={()=>onNavigate(c.page)} style={{...card,cursor:'pointer',textAlign:'center'}}>
            <div style={{fontSize:'36px',marginBottom:'10px'}}>{c.icon}</div>
            <p style={{color:'white',fontWeight:'bold'}}>{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (role === 'teacher') return (
    <div>
      <div style={{ background: 'linear-gradient(135deg,#2d1b4e,#1a1a2e)', borderRadius: '16px', padding: '28px', marginBottom: '24px', borderLeft: '4px solid #00d4aa' }}>
        <h2 style={{ color: 'white', fontSize: '24px', marginBottom: '4px' }}>Ola, Prof. {user.name || 'Professor'}!</h2>
        <p style={{ color: '#94a3b8' }}>Painel do Professor</p>
      </div>
      <div style={{ ...grid, gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', marginBottom: '24px' }}>
        {[{label:'Alunos Ativos',val:'0',icon:''},{label:'Missoes',val:'0',icon:''},{label:'Pontuacoes',val:'0',icon:''},{label:'Resgates Pendentes',val:'0',icon:'',color:'#fbbf24'}].map((s,i) => (
          <div key={i} style={card}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{s.icon}</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: s.color || '#00d4aa' }}>{s.val}</div>
            <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ ...grid, gridTemplateColumns: '1fr 1fr' }}>
        <div style={card}>
          <h3 style={{ color: '#00d4aa', marginBottom: '16px' }}>Acoes Rapidas</h3>
          {[{label:'Ver Cursos',page:'courses'},{label:'Ver Missoes',page:'missions'},{label:'Ver Ranking',page:'ranking'}].map((a,i)=>(
            <button key={i} onClick={()=>onNavigate(a.page)} style={{ display:'block',width:'100%',marginBottom:'10px',padding:'10px',background:'rgba(0,212,170,0.1)',color:'#00d4aa',border:'1px solid rgba(0,212,170,0.3)',borderRadius:'8px',cursor:'pointer',textAlign:'left' }}>{a.label}</button>
          ))}
        </div>
        <div style={card}>
          <h3 style={{ color: '#00d4aa', marginBottom: '16px' }}>Top Alunos</h3>
          <p style={{ color: '#94a3b8', textAlign: 'center', paddingTop: '20px' }}>Nenhum dado disponivel</p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg,#2d1b4e,#0f3460)', borderRadius: '16px', padding: '28px', marginBottom: '24px', boxShadow: '0 10px 40px rgba(0,212,170,0.1)' }}>
        <h2 style={{ color: 'white', fontSize: '26px', marginBottom: '4px' }}>Bem-vindo, {user.name || 'Aluno'}!</h2>
        <p style={{ color: '#00d4aa' }}>Nivel atual: <strong>{nivel}</strong></p>
        <div style={{ marginTop: '12px', background: 'rgba(255,255,255,0.1)', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ background: 'linear-gradient(90deg,#00d4aa,#4c2882)', height: '100%', width: progresso + '%', transition: 'width 0.5s' }}></div>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px' }}>{xp} / {proximoNivel} XP para proximo nivel</p>
      </div>
      <div style={{ ...grid, gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', marginBottom: '24px' }}>
        {[{label:'XP Total',val:xp,icon:''},{label:'TecCoins',val:user.tecCoins||0,icon:''},{label:'Nivel',val:nivel,icon:''},{label:'Missoes',val:'0',icon:''}].map((s,i) => (
          <div key={i} style={card}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#00d4aa' }}>{s.val}</div>
            <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ ...grid, gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))' }}>
        {[{label:'Cursos',page:'courses',icon:''},{label:'Missoes',page:'missions',icon:''},{label:'Loja',page:'shop',icon:''},{label:'Ranking',page:'ranking',icon:''},{label:'Perfil',page:'profile',icon:''}].map((c,i)=>(
          <div key={i} onClick={()=>onNavigate(c.page)} style={{...card,cursor:'pointer',textAlign:'center'}}>
            <div style={{fontSize:'36px',marginBottom:'10px'}}>{c.icon}</div>
            <p style={{color:'white',fontWeight:'bold',fontSize:'14px'}}>{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Dashboard;