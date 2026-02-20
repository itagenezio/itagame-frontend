import React, { useState, useEffect } from 'react';
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
        await api.put(`/courses/${editingId}`, { title, description, published });
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
        await api.delete(`/courses/${id}`);
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
export default Courses;