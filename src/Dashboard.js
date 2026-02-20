import React from 'react';

function Dashboard({ onNavigate }) {
  const user = (() => { try { return JSON.parse(localStorage.getItem('user')) || {}; } catch { return {}; } })();

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)',padding:'20px'}}>
      
      <div style={{background:'linear-gradient(135deg,#a855f7,#6366f1)',borderRadius:'20px',padding:'30px',marginBottom:'25px',boxShadow:'0 10px 40px rgba(168,85,247,0.3)'}}>
        <h2 style={{color:'white',fontSize:'28px',marginBottom:'5px'}}>Bem-vindo, {user.name || 'Usuario'}! </h2>
        <p style={{color:'rgba(255,255,255,0.8)'}}>Papel: {user.role === 'admin' ? 'Administrador' : user.role === 'teacher' ? 'Professor' : 'Estudante'}</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'15px',marginBottom:'25px'}}>
        <div style={{background:'white',borderRadius:'15px',padding:'20px',textAlign:'center',boxShadow:'0 5px 20px rgba(0,0,0,0.1)'}}>
          <div style={{fontSize:'30px',marginBottom:'8px'}}></div>
          <p style={{color:'#666',fontSize:'14px',marginBottom:'5px'}}>Pontos</p>
          <p style={{color:'#3b82f6',fontSize:'28px',fontWeight:'bold'}}>0</p>
        </div>
        <div style={{background:'white',borderRadius:'15px',padding:'20px',textAlign:'center',boxShadow:'0 5px 20px rgba(0,0,0,0.1)'}}>
          <div style={{fontSize:'30px',marginBottom:'8px'}}></div>
          <p style={{color:'#666',fontSize:'14px',marginBottom:'5px'}}>Nivel</p>
          <p style={{color:'#10b981',fontSize:'28px',fontWeight:'bold'}}>1</p>
        </div>
        <div style={{background:'white',borderRadius:'15px',padding:'20px',textAlign:'center',boxShadow:'0 5px 20px rgba(0,0,0,0.1)',cursor:'pointer'}} onClick={()=>onNavigate('ranking')}>
          <div style={{fontSize:'30px',marginBottom:'8px'}}></div>
          <p style={{color:'#666',fontSize:'14px',marginBottom:'5px'}}>Ranking</p>
          <p style={{color:'#f59e0b',fontSize:'28px',fontWeight:'bold'}}>Ver</p>
        </div>
      </div>

      <div style={{background:'white',borderRadius:'15px',padding:'20px',boxShadow:'0 5px 20px rgba(0,0,0,0.1)'}}>
        <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
          <span style={{fontSize:'24px',marginRight:'10px'}}></span>
          <h3 style={{color:'#333',margin:0}}>Meus Cursos</h3>
        </div>
        <p style={{color:'#999',textAlign:'center',padding:'20px 0'}}>Nenhum curso disponivel</p>
      </div>

    </div>
  );
}

export default Dashboard;