import React, { useState, useEffect } from 'react';
import api from './services/api';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/courses').then(res => setCourses(Array.isArray(res.data) ? res.data : [])).catch(() => setCourses([])).finally(() => setLoading(false));
  }, []);

  const card = { background: '#1a1a2e', border: '1px solid rgba(0,212,170,0.2)', borderRadius: '16px', padding: '24px', transition: 'all 0.3s', cursor: 'pointer' };

  return (
    <div>
      <h2 style={{ color: 'white', marginBottom: '8px' }}>Cursos</h2>
      <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Explore os cursos disponiveis</p>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#00d4aa' }}>Carregando cursos...</div>
      ) : courses.length === 0 ? (
        <div style={{ ...card, textAlign: 'center', padding: '60px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}></div>
          <p style={{ color: '#94a3b8', fontSize: '18px' }}>Nenhum curso disponivel ainda.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '20px' }}>
          {courses.map((c, i) => (
            <div key={i} style={card} onMouseOver={e=>e.currentTarget.style.borderColor='#00d4aa'} onMouseOut={e=>e.currentTarget.style.borderColor='rgba(0,212,170,0.2)'}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}></div>
              <h3 style={{ color: 'white', marginBottom: '8px' }}>{c.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px' }}>{c.description || 'Sem descricao'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Courses;