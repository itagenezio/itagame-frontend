import React, { useState, useEffect } from 'react';
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
      setMessage(`❌ Você não tem pontos suficientes para comprar ${item.name}.`);
      return;
    }
    try {
      const updatedUser = { ...user, points: user.points - item.price };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setMessage(`✅ Você comprou ${item.name} por ${item.price} pontos!`);
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
export default Shop;