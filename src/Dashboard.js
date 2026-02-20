import React from 'react';

function Dashboard({ onNavigate }) {
  const user = (() => { try { return JSON.parse(localStorage.getItem('user')) || {}; } catch { return {}; } })();

  return (
    <div style={{padding:'30px',maxWidth:'900px',margin:'0 auto'}}>
      <h2 style={{color:'#a855f7',marginBottom:'5px'}}>Dashboard</h2>
      <p style={{color:'#888',marginBottom:'30px'}}>Ola, <strong style={{color:'white'}}>{user.name || 'Usuario'}</strong>!</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:'20px'}}>
        {[
          {label:'Cursos',page:'courses'},
          {label:'Missoes',page:'missions'},
          {label:'Loja',page:'shop'},
          {label:'Ranking',page:'ranking'},
          {label:'Perfil',page:'profile'}
        ].map((c,i)=>(
          <div key={i} onClick={()=>onNavigate(c.page)} style={{background:'rgba(255,255,255,0.05)',borderRadius:'15px',padding:'30px 20px',textAlign:'center',cursor:'pointer',border:'1px solid rgba(168,85,247,0.3)'}}>
            <p style={{color:'white',fontWeight:'bold'}}>{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;