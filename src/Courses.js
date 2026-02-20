import React, { useState, useEffect } from "react";
import api from "./services/api";
function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get("/courses").then(res=>setCourses(Array.isArray(res.data)?res.data:[])).catch(()=>setCourses([])).finally(()=>setLoading(false));
  }, []);
  return (
    <div style={{padding:"30px",maxWidth:"900px",margin:"0 auto"}}>
      <h2 style={{color:"#a855f7",marginBottom:"20px"}}>Cursos</h2>
      {loading ? <p style={{color:"#888"}}>Carregando...</p> : courses.length===0 ? (
        <div style={{background:"rgba(255,255,255,0.05)",borderRadius:"15px",padding:"40px",textAlign:"center"}}>
          <p style={{color:"#888"}}>Nenhum curso disponivel ainda.</p>
        </div>
      ) : courses.map((c,i)=>(
        <div key={i} style={{background:"rgba(255,255,255,0.05)",borderRadius:"15px",padding:"20px",marginBottom:"15px"}}>
          <h3 style={{color:"white"}}>{c.title}</h3>
        </div>
      ))}
    </div>
  );
}
export default Courses;
