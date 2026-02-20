import React, { useState, useEffect } from 'react';
function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);
  if (!user) return <p>Carregando...</p>;
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>👤 Meu Perfil</h2>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
        <p><strong>Nome:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Papel:</strong> {user.role === 'admin' ? 'Administrador' : user.role === 'teacher' ? 'Professor' : 'Estudante'}</p>
        <p><strong>Pontos:</strong> ⭐ {user.points}</p>
        <p><strong>Nível:</strong> 🎖️ {user.level}</p>
        <p><strong>Membro desde:</strong> {new Date(user.createdAt).toLocaleDateString('pt-BR')}</p>
      </div>
    </div>
  );
}
export default Profile;