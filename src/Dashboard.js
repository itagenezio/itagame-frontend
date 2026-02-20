import React, { useState, useEffect } from 'react';
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
export default Dashboard;