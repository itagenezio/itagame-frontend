import React, { useState } from 'react';
import api from './services/api';
import './LoginNew.css';

const LoginNew = ({ onLoginSuccess, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const testAccounts = {
    student: { email: 'joao@test.com', password: '123456' },
    teacher: { email: 'maria@test.com', password: '123456' },
    admin:   { email: 'admin@test.com', password: '123456' }
  };

  const handleQuickLogin = async (type) => {
    setLoading(true);
    setMessage('');
    try {
      const response = await api.post('/users/login', testAccounts[type]);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLoginSuccess();
    } catch {
      setMessage('Erro no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await api.post('/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLoginSuccess();
    } catch {
      setMessage('Erro no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <span className="logo-icon">🎮</span>
        <h1 className="logo-text">ITAGAME</h1>
        <p className="tagline">Gamificação na Educação</p>
      </div>

      <div className="login-card">
        <h2 className="card-title">Faça seu Login</h2>

        <p className="role-label">Entrar como:</p>
        <div className="role-buttons">
          <button className="role-btn" onClick={() => handleQuickLogin('student')} disabled={loading}>
            🎓 Aluno
          </button>
          <button className="role-btn" onClick={() => handleQuickLogin('teacher')} disabled={loading}>
            👩‍🏫 Professor
          </button>
          <button className="role-btn" onClick={() => handleQuickLogin('admin')} disabled={loading}>
            ⚙️ Admin
          </button>
        </div>

        <div className="divider"><span>ou</span></div>

        <form onSubmit={handleLogin}>
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button type="submit" className="enter-btn" disabled={loading}>
            🚀 {loading ? 'ENTRANDO...' : 'ENTRAR'}
          </button>
        </form>

        {message && (
          <p className={`msg ${message.includes('sucesso') ? 'ok' : 'fail'}`}>
            {message}
          </p>
        )}

        {/* BOTÃO DE CADASTRO */}
        <div className="register-link">
          <p>Não tem conta?</p>
          <button
            className="register-btn"
            onClick={() => onNavigate('register')}
          >
            📝 CRIAR CONTA GRÁTIS
          </button>
        </div>

        <div className="footer-text">
          <p>⚡ Desenvolvido por <strong>Educador Genézio de Lavor</strong></p>
          <p>React.js • Node.js • PostgreSQL • Express.js</p>
        </div>
      </div>
    </div>
  );
};

export default LoginNew;