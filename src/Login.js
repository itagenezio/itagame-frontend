import React, { useState } from 'react';
import api from './services/api';
function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('joao@test.com');
  const [password, setPassword] = useState('123456');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await api.post('/users/login', { email, password });
      if (response.data && response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setMessage('✅ Login realizado com sucesso!');
        setTimeout(() => onLoginSuccess(), 500);
      }
    } catch (error) {
      let errorMsg = 'Erro ao fazer login';
      if (error.response) errorMsg = error.response.data?.error || error.response.statusText;
      else if (error.request) errorMsg = 'Servidor não respondeu. Verifique se o backend está rodando na porta 5000';
      setMessage('❌ ' + errorMsg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: 'none', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', background: 'white' }}>
      <h2 style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '20px', fontSize: '28px' }}>🔐 Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} style={{ width: '100%', padding: '12px', marginBottom: '10px', boxSizing: 'border-box', borderRadius: '10px', border: '2px solid #e0e0e0', fontSize: '14px' }} />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} style={{ width: '100%', padding: '12px', marginBottom: '10px', boxSizing: 'border-box', borderRadius: '10px', border: '2px solid #e0e0e0', fontSize: '14px' }} />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', border: 'none', borderRadius: '10px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: '600' }}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      {message && <p style={{ marginTop: '15px', padding: '10px', backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da', color: message.includes('✅') ? '#155724' : '#721c24', borderRadius: '4px', textAlign: 'center' }}>{message}</p>}
    </div>
  );
}
export default Login;