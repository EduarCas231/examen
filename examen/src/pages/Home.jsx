import React, { useState, useEffect } from 'react';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://3.17.12.163/usuarios');
        if (!response.ok) {
          throw new Error('Error al obtener usuarios');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Bienvenido, {currentUser?.nombre}</h2>
      <h3>Usuarios registrados:</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.nombre} - {user.correo} - {user.carrera}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;