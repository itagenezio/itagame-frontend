import React, { useState } from 'react';
import api from './services/api';
function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [message, setMessage] = useState('');
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/register', { name, email, password, role });
      setMessage('✅ Usuário criado com sucesso! Faça login agora.');
      setName('');
      setEmail('');
      setPassword('');
      setRole('student');
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || 'Erro ao registrar';
      setMessage('❌ Erro: ' + errorMsg);
    }
  };
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: 'none', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', background: 'white' }}>
      <h2 style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '20px', fontSize: '28px' }}>📝 Registrar</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '10px', boxSizing: 'border-box', borderRadius: '10px', border: '2px solid #e0e0e0' }} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '10px', boxSizing: 'border-box', borderRadius: '10px', border: '2px solid #e0e0e0' }} />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '10px', boxSizing: 'border-box', borderRadius: '10px', border: '2px solid #e0e0e0' }} />
        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '10px', boxSizing: 'border-box', borderRadius: '10px', border: '2px solid #e0e0e0' }}>
          <option value="student">Estudante</option>
          <option value="teacher">Professor</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit" style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}>
          Registrar
        </button>
      </form>
      {message && <p style={{ marginTop: '15px', padding: '10px', backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da', color: message.includes('✅') ? '#155724' : '#721c24', borderRadius: '4px', textAlign: 'center' }}>{message}</p>}
    </div>
  );
}
export default Register;