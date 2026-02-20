import React, { useState, useEffect } from "react";
import LoginNew from "./LoginNew";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import Ranking from "./Ranking";
import Profile from "./Profile";
import Missions from "./Missions";
import Shop from "./Shop";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) { setIsLoggedIn(true); setPage("dashboard"); }
  }, []);
  const handleLoginSuccess = () => { setIsLoggedIn(true); setPage("dashboard"); };
  const handleLogout = () => { localStorage.removeItem("token"); localStorage.removeItem("user"); setIsLoggedIn(false); setPage("login"); };
  const handleNavigate = (p) => setPage(p);
  return (
    <div className="App">
      {isLoggedIn && (
        <nav className="navbar">
          <button className={page==="dashboard"?"nav-button active":"nav-button"} onClick={()=>handleNavigate("dashboard")}>Dashboard</button>
          <button className={page==="courses"?"nav-button active":"nav-button"} onClick={()=>handleNavigate("courses")}>Cursos</button>
          <button className={page==="missions"?"nav-button active":"nav-button"} onClick={()=>handleNavigate("missions")}>Missoes</button>
          <button className={page==="shop"?"nav-button active":"nav-button"} onClick={()=>handleNavigate("shop")}>Loja</button>
          <button className={page==="ranking"?"nav-button active":"nav-button"} onClick={()=>handleNavigate("ranking")}>Ranking</button>
          <button className={page==="profile"?"nav-button active":"nav-button"} onClick={()=>handleNavigate("profile")}>Perfil</button>
          <button className="logout-button" onClick={handleLogout}>Sair</button>
        </nav>
      )}
      <main className="main-content">
        {page==="login" && <LoginNew onLoginSuccess={handleLoginSuccess} onNavigate={handleNavigate}/>}
        {page==="register" && <Register onNavigate={handleNavigate}/>}
        {page==="dashboard" && <Dashboard onNavigate={handleNavigate}/>}
        {page==="courses" && <Courses/>}
        {page==="missions" && <Missions/>}
        {page==="shop" && <Shop/>}
        {page==="ranking" && <Ranking/>}
        {page==="profile" && <Profile/>}
      </main>
    </div>
  );
}
export default App;
