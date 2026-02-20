const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const servicesDir = path.join(srcDir, 'services');

// Criar pasta services se não existir
if (!fs.existsSync(servicesDir)) {
  fs.mkdirSync(servicesDir, { recursive: true });
  console.log('✅ Pasta src/services/ criada!');
}

// ============ API.JS ============
const apiJs = `import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

export default api;`;

// ============ LOGIN.JS ============
const loginJs = `import React, { useState } from 'react';
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
      if (error.response) {
        errorMsg = error.response.data?.error || error.response.statusText;
      } else if (error.request) {
        errorMsg = 'Servidor não respondeu. Verifique se o backend está rodando na porta 5000';
      }
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

export default Login;`;

// ============ REGISTER.JS ============
const registerJs = `import React, { useState } from 'react';
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

export default Register;`;

// ============ DASHBOARD.JS ============
const dashboardJs = `import React, { useState, useEffect } from 'react';
import api from './services/api';

function Dashboard({ onNavigate }) {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
        const coursesResponse = await api.get('/courses');
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)' }}>
        <div>
          <h1>Bem-vindo, {user?.name}! 👋</h1>
          <p>Papel: {user?.role === 'admin' ? '👨‍💼 Administrador' : user?.role === 'teacher' ? '👨‍🏫 Professor' : '👨‍🎓 Estudante'}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', cursor: 'pointer' }} onClick={() => onNavigate('profile')}>
          <h3>⭐ Pontos</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#007bff' }}>{user?.points || 0}</p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', cursor: 'pointer' }} onClick={() => onNavigate('profile')}>
          <h3>🎖️ Nível</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#28a745' }}>{user?.level || 1}</p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', cursor: 'pointer' }} onClick={() => onNavigate('ranking')}>
          <h3>🏆 Ranking</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#ffc107' }}>Ver</p>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
        <h2>📚 Meus Cursos</h2>
        {courses.length === 0 ? (
          <p>Nenhum curso disponível</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {courses.map((course) => (
              <div key={course.id} style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '12px', border: '1px solid #e8e8e8' }}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <button style={{ width: '100%', padding: '10px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}>
                  Acessar Curso
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;`;

// ============ COURSES.JS ============
const coursesJs = `import React, { useState, useEffect } from 'react';
import api from './services/api';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [published, setPublished] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      setMessage('❌ Erro ao buscar cursos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(\`/courses/\${editingId}\`, { title, description, published });
        setMessage('✅ Curso atualizado!');
        setEditingId(null);
      } else {
        await api.post('/courses', { title, description, published });
        setMessage('✅ Curso criado!');
      }
      setTitle('');
      setDescription('');
      setPublished(false);
      fetchCourses();
    } catch (error) {
      setMessage('❌ Erro ao salvar curso');
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Deletar este curso?')) {
      try {
        await api.delete(\`/courses/\${id}\`);
        setMessage('✅ Curso deletado!');
        fetchCourses();
      } catch (error) {
        setMessage('❌ Erro ao deletar');
      }
    }
  };

  const handleEditCourse = (course) => {
    setEditingId(course.id);
    setTitle(course.title);
    setDescription(course.description);
    setPublished(course.published);
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>📚 Gerenciar Cursos</h2>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', marginBottom: '30px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
        <h3>{editingId ? '✏️ Editar Curso' : '➕ Criar Novo Curso'}</h3>
        <form onSubmit={handleCreateCourse}>
          <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '10px', boxSizing: 'border-box', borderRadius: '8px', border: '1px solid #ddd' }} />
          <textarea placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', boxSizing: 'border-box', borderRadius: '8px', border: '1px solid #ddd', minHeight: '100px' }} />
          <label style={{ marginRight: '20px' }}>
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
            {' '}Publicado
          </label>
          <button type="submit" style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', marginRight: '10px' }}>
            {editingId ? 'Atualizar' : 'Criar'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setTitle(''); setDescription(''); setPublished(false); }} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Cancelar
            </button>
          )}
        </form>
        {message && <p style={{ marginTop: '15px', padding: '10px', backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da', color: message.includes('✅') ? '#155724' : '#721c24', borderRadius: '4px' }}>{message}</p>}
      </div>

      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
        <h3>Lista de Cursos</h3>
        {courses.length === 0 ? (
          <p>Nenhum curso criado</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {courses.map((course) => (
              <div key={course.id} style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '12px', border: '1px solid #ddd' }}>
                <h4>{course.title}</h4>
                <p>{course.description}</p>
                <p style={{ color: course.published ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
                  {course.published ? '✅ Publicado' : '❌ Não publicado'}
                </p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button onClick={() => handleEditCourse(course)} style={{ flex: 1, padding: '8px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                    ✏️ Editar
                  </button>
                  <button onClick={() => handleDeleteCourse(course.id)} style={{ flex: 1, padding: '8px', background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                    🗑️ Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;`;

// ============ RANKING.JS ============
const rankingJs = `import React, { useState, useEffect } from 'react';
import api from './services/api';

function Ranking() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        const sorted = response.data.sort((a, b) => b.points - a.points);
        setUsers(sorted);
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🏆 Ranking de Pontos</h2>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
        {users.length === 0 ? (
          <p>Nenhum usuário</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>🥇 Posição</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>👤 Nome</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>📧 Email</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>⭐ Pontos</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>🎖️ Nível</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px' }}>{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}</td>
                  <td style={{ padding: '10px' }}>{user.name}</td>
                  <td style={{ padding: '10px' }}>{user.email}</td>
                  <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#007bff' }}>{user.points}</td>
                  <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#28a745' }}>{user.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Ranking;`;

// ============ PROFILE.JS ============
const profileJs = `import React, { useState, useEffect } from 'react';

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

export default Profile;`;

// ============ MISSIONS.JS ============
const missionsJs = `import React, { useState } from 'react';

function Missions() {
  const [missions, setMissions] = useState([
    { id: 1, title: '🎓 Completar 1 Curso', description: 'Finalize um curso completo.', progress: 30, reward: 50, completed: false },
    { id: 2, title: '✏️ Fazer 5 Exercícios', description: 'Complete 5 exercícios.', progress: 60, reward: 75, completed: false },
    { id: 3, title: '⭐ Ganhar 100 Pontos', description: 'Alcance 100 pontos no sistema.', progress: 80, reward: 100, completed: false },
    { id: 4, title: '🏆 Participar do Ranking', description: 'Entre no ranking semanal.', progress: 0, reward: 50, completed: false },
    { id: 5, title: '📚 Estudar 2 Horas', description: 'Estude por 2 horas consecutivas.', progress: 45, reward: 150, completed: false },
    { id: 6, title: '🤝 Ajudar 3 Colegas', description: 'Ajude 3 colegas com dúvidas.', progress: 100, reward: 80, completed: true },
  ]);
  const [userPoints, setUserPoints] = useState(0);
  const [message, setMessage] = useState('');

  const completeMission = (id) => {
    const mission = missions.find(m => m.id === id);
    setMissions(missions.map(m => m.id === id ? { ...m, completed: true } : m));
    setUserPoints(userPoints + mission.reward);
    setMessage(\`✅ Missão completada! Você ganhou \${mission.reward} pontos.\`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>🎯 Minhas Missões</h2>
      <p style={{ textAlign: 'right', marginBottom: '20px', fontSize: '1.1em', fontWeight: 'bold' }}>
        Pontos Totais: <span style={{ color: '#007bff' }}>⭐ {userPoints}</span>
      </p>
      {message && (
        <p style={{ marginTop: '15px', padding: '10px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '4px', textAlign: 'center', marginBottom: '20px' }}>
          {message}
        </p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {missions.map((mission) => (
          <div key={mission.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', border: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ marginBottom: '5px', color: '#2c3e50' }}>{mission.title}</h3>
              <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '15px' }}>{mission.description}</p>
              <div style={{ marginBottom: '15px' }}>
                <div style={{ width: '100%', height: '10px', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ width: \`\${mission.progress}%\`, height: '100%', background: 'linear-gradient(90deg, #11998e 0%, #38ef7d 100%)', transition: 'width 0.5s ease-in-out' }}></div>
                </div>
                <p style={{ fontSize: '0.85em', color: '#999', marginTop: '5px' }}>{mission.progress}% concluído</p>
              </div>
              <p style={{ fontWeight: 'bold', color: '#f5af19', fontSize: '1.1em', marginBottom: '15px' }}>
                🎁 Recompensa: {mission.reward} pontos
              </p>
            </div>
            <button onClick={() => completeMission(mission.id)} disabled={mission.completed} style={{ padding: '10px 15px', background: mission.completed ? '#6c757d' : 'linear-gradient(135deg, #00d4ff 0%, #007bff 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: mission.completed ? 'not-allowed' : 'pointer', fontWeight: 'bold', opacity: mission.completed ? 0.6 : 1 }}>
              {mission.completed ? '✅ Completada' : '🎯 Completar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Missions;`;

// ============ SHOP.JS ============
const shopJs = `import React, { useState, useEffect } from 'react';

function Shop() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const shopItems = [
    { id: 1, name: 'Skin Roxo', description: 'Mude a cor do seu perfil para roxo!', price: 100, icon: '💜', gradient: 'linear-gradient(135deg, #a8c0ff 0%, #392b58 100%)' },
    { id: 2, name: 'Tema Escuro', description: 'Ative o modo noturno para a plataforma.', price: 150, icon: '🌙', gradient: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)' },
    { id: 3, name: 'Avatar Gato', description: 'Adicione um avatar de gato fofo ao seu perfil.', price: 200, icon: '🐱', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: 4, name: 'Badge Ouro', description: 'Exiba uma badge de ouro no seu perfil.', price: 300, icon: '🏅', gradient: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)' },
    { id: 5, name: 'Skin Verde', description: 'Mude a cor do seu perfil para verde!', price: 120, icon: '💚', gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
    { id: 6, name: 'Tema Claro', description: 'Ative o modo diurno para a plataforma.', price: 140, icon: '☀️', gradient: 'linear-gradient(135deg, #e0e0e0 0%, #fefefe 100%)' },
    { id: 7, name: 'Avatar Robô', description: 'Adicione um avatar de robô futurista.', price: 250, icon: '🤖', gradient: 'linear-gradient(135deg, #00d4ff 0%, #007bff 100%)' },
    { id: 8, name: 'Badge Prata', description: 'Exiba uma badge de prata no seu perfil.', price: 280, icon: '🥈', gradient: 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)' },
  ];

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    setLoading(false);
  }, []);

  const handleBuyItem = (item) => {
    if (!user) {
      setMessage('❌ Você precisa estar logado para comprar itens.');
      return;
    }
    if (user.points < item.price) {
      setMessage(\`❌ Você não tem pontos suficientes para comprar \${item.name}.\`);
      return;
    }

    try {
      const updatedUser = { ...user, points: user.points - item.price };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setMessage(\`✅ Você comprou \${item.name} por \${item.price} pontos!\`);
    } catch (error) {
      setMessage('❌ Erro ao comprar item.');
    }
  };

  if (loading) return <p>Carregando loja...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>🛍️ Loja de Itens</h2>
      {user && (
        <p style={{ textAlign: 'right', marginBottom: '20px', fontSize: '1.1em', fontWeight: 'bold' }}>
          Seus Pontos: <span style={{ color: '#007bff' }}>⭐ {user.points}</span>
        </p>
      )}
      {message && (
        <p style={{ marginTop: '15px', padding: '10px', backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da', color: message.includes('✅') ? '#155724' : '#721c24', borderRadius: '4px', textAlign: 'center' }}>
          {message}
        </p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {shopItems.map((item) => (
          <div key={item.id} style={{ background: item.gradient, color: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 8px 20px rgba(0,0,0,0.15)', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '3em', marginBottom: '10px' }}>{item.icon}</div>
            <h3 style={{ marginBottom: '5px' }}>{item.name}</h3>
            <p style={{ fontSize: '0.9em', opacity: 0.9, flexGrow: 1 }}>{item.description}</p>
            <p style={{ fontSize: '1.5em', fontWeight: 'bold', margin: '15px 0' }}>⭐ {item.price}</p>
            <button onClick={() => handleBuyItem(item)} disabled={!user || (user && user.points < item.price)} style={{ padding: '10px 15px', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', opacity: (!user || (user && user.points < item.price)) ? 0.6 : 1 }}>
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;`;

// ============ APP.JS ============
const appJs = `import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Courses from './Courses';
import Ranking from './Ranking';
import Profile from './Profile';
import Missions from './Missions';
import Shop from './Shop';
import './App.css';

function App() {
  const [page, setPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setPage('dashboard');
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setPage('login');
  };

  const handleNavigate = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="App">
      {isLoggedIn && (
        <nav className="navbar">
          <button className={page === 'dashboard' ? 'nav-button active' : 'nav-button'} onClick={() => handleNavigate('dashboard')}>
            🏠 Dashboard
          </button>
          <button className={page === 'courses' ? 'nav-button active' : 'nav-button'} onClick={() => handleNavigate('courses')}>
            📚 Cursos
          </button>
          <button className={page === 'missions' ? 'nav-button active' : 'nav-button'} onClick={() => handleNavigate('missions')}>
            🎯 Missões
          </button>
          <button className={page === 'shop' ? 'nav-button active' : 'nav-button'} onClick={() => handleNavigate('shop')}>
            🛍️ Loja
          </button>
          <button className={page === 'ranking' ? 'nav-button active' : 'nav-button'} onClick={() => handleNavigate('ranking')}>
            🏆 Ranking
          </button>
          <button className={page === 'profile' ? 'nav-button active' : 'nav-button'} onClick={() => handleNavigate('profile')}>
            👤 Perfil
          </button>
          <button className="logout-button" onClick={handleLogout}>
            🚪 Sair
          </button>
        </nav>
      )}

      <main className="main-content">
        {page === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
        {page === 'register' && <Register />}
        {page === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
        {page === 'courses' && <Courses />}
        {page === 'missions' && <Missions />}
        {page === 'shop' && <Shop />}
        {page === 'ranking' && <Ranking />}
        {page === 'profile' && <Profile />}
      </main>
    </div>
  );
}

export default App;`;

// ============ APP.CSS ============
const appCss = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', 'Arial', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: #333;
}

.App {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

/* NAVBAR */
.navbar {
  background: linear-gradient(90deg, #2c3e50 0%, #3498db 100%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  padding: 15px 20px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-button {
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  color: white;
  background: rgba(255, 255, 255, 0.2);
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.nav-button.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.logout-button {
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  color: white;
  background: #ff6b6b;
}

.logout-button:hover {
  background: #ff5252;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
}

.main-content {
  padding: 20px;
}

/* RESPONSIVIDADE */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 10px;
  }

  .nav-button {
    width: 100%;
    text-align: center;
  }
}`;

// Criar todos os arquivos
const files = [
  { path: path.join(servicesDir, 'api.js'), content: apiJs },
  { path: path.join(srcDir, 'Login.js'), content: loginJs },
  { path: path.join(srcDir, 'Register.js'), content: registerJs },
  { path: path.join(srcDir, 'Dashboard.js'), content: dashboardJs },
  { path: path.join(srcDir, 'Courses.js'), content: coursesJs },
  { path: path.join(srcDir, 'Ranking.js'), content: rankingJs },
  { path: path.join(srcDir, 'Profile.js'), content: profileJs },
  { path: path.join(srcDir, 'Missions.js'), content: missionsJs },
  { path: path.join(srcDir, 'Shop.js'), content: shopJs },
  { path: path.join(srcDir, 'App.js'), content: appJs },
  { path: path.join(srcDir, 'App.css'), content: appCss },
];

files.forEach(file => {
  fs.writeFileSync(file.path, file.content);
  console.log(`✅ ${path.basename(file.path)} criado com sucesso!`);
});

console.log('\n🎉 TODOS OS ARQUIVOS FORAM CRIADOS COM SUCESSO!');
console.log('\n📝 Próximos passos:');
console.log('1. Volte ao navegador em http://localhost:3000');
console.log('2. Limpe o cache (Ctrl + Shift + Delete)');
console.log('3. Faça login com: joao@test.com / 123456');
console.log('4. Explore todas as páginas!');