import React from "react";
function Profile() {
  const user = (() => { try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; } })();
  return (
    <div style={{padding:"30px",maxWidth:"500px",margin:"0 auto"}}>
      <h2 style={{color:"#a855f7",marginBottom:"20px"}}>Meu Perfil</h2>
      <div style={{background:"rgba(255,255,255,0.05)",borderRadius:"15px",padding:"25px",border:"1px solid rgba(255,255,255,0.1)"}}>
        <p style={{color:"white",marginBottom:"10px"}}><strong>Nome:</strong> {user.name || "Usuario"}</p>
        <p style={{color:"white",marginBottom:"10px"}}><strong>Email:</strong> {user.email || "Nao informado"}</p>
        <p style={{color:"white",marginBottom:"10px"}}><strong>Perfil:</strong> {user.role || "Estudante"}</p>
        <p style={{color:"#a855f7",marginTop:"20px"}}>Pontos: 0</p>
        <p style={{color:"#6366f1"}}>Nivel: 1</p>
      </div>
    </div>
  );
}
export default Profile;
