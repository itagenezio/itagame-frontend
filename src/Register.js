import React, { useState } from 'react';
import api from './services/api';

function Register({ onNavigate }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/users/register', { name, email, password, role });
      setMessage('✅ Conta criada! Redirecionando...');
      setTimeout(() => onNavigate('login'), 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || 'Erro ao registrar';
      setMessage('❌ Erro: ' + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
        borderRadius: '20px',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
      }}>
        <h2 style={{ color: '#a855f7', textAlign: 'center', marginBottom: '30px', fontSize: '28px' }}>
          📝 Criar Conta
        </h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            style={inputStyle}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
            style={inputStyle}
          >
            <option value="student">🎓 Estudante</option>
            <option value="teacher">👩‍🏫 Professor</option>
            <option value="admin">⚙️ Administrador</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #a855f7, #6366f1)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              marginTop: '10px'
            }}
          >
            {loading ? 'CRIANDO...' : '🚀 CRIAR CONTA'}
          </button>
        </form>

        {message && (
          <p style={{
            marginTop: '15px',
            padding: '12px',
            backgroundColor: message.includes('✅') ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
            color: message.includes('✅') ? '#10b981' : '#ef4444',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            {message}
          </p>
        )}

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#888' }}>
          Já tem conta?{' '}
          <button
            onClick={() => onNavigate('login')}
            style={{ background: 'none', border: 'none', color: '#a855f7', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Fazer Login
          </button>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '12px',
  boxSizing: 'border-box',
  borderRadius: '10px',
  border: '1px solid rgba(255,255,255,0.2)',
  background: 'rgba(255,255,255,0.1)',
  color: 'white',
  fontSize: '15px'
};

export default Register;