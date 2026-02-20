import React, { useState, useEffect } from 'react';
import LoginNew from './LoginNew';
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
    if (token) { setIsLoggedIn(true); setPage('dashboard'); }
  }, []);

  const handleLoginSuccess = () => { setIsLoggedIn(true); setPage('dashboard'); };
  const handleLogout = () => {
    localStorage.removeItem('token'); localStorage.removeItem('user');
    setIsLoggedIn(false); setPage('login');
  };
  const nav = (p) => setPage(p);

  const links = [
    { label: 'Dashboard', page: 'dashboard' },
    { label: 'Cursos', page: 'courses' },
    { label: 'Missoes', page: 'missions' },
    { label: 'Loja', page: 'shop' },
    { label: 'Ranking', page: 'ranking' },
    { label: 'Perfil', page: 'profile' },
  ];

  return (
    <div className="App">
      {isLoggedIn && (
        <nav className="navbar">
          <span className="navbar-brand">ITA<span>GAME</span></span>
          {links.map((l, i) => (
            <button key={i} className={page === l.page ? 'nav-button active' : 'nav-button'} onClick={() => nav(l.page)}>{l.label}</button>
          ))}
          <button className="logout-button" onClick={handleLogout}>Sair</button>
        </nav>
      )}
      <main className="main-content">
        {page === 'login' && <LoginNew onLoginSuccess={handleLoginSuccess} onNavigate={nav} />}
        {page === 'register' && <Register onNavigate={nav} />}
        {page === 'dashboard' && <Dashboard onNavigate={nav} />}
        {page === 'courses' && <Courses />}
        {page === 'missions' && <Missions />}
        {page === 'shop' && <Shop />}
        {page === 'ranking' && <Ranking />}
        {page === 'profile' && <Profile />}
      </main>
    </div>
  );
}
export default App;