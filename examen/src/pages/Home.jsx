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

  if (loading) return (
    <div style={styles.loadingContainer}>
      <div style={styles.spinner}></div>
      <p>Cargando usuarios...</p>
    </div>
  );

  if (error) return (
    <div style={styles.errorContainer}>
      <p style={styles.errorText}>{error}</p>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.welcomeTitle}>Bienvenido, <span style={styles.userName}>{currentUser?.nombre}</span></h2>
        <h3 style={styles.subtitle}>Usuarios registrados en el sistema</h3>
      </div>
      
      <div style={styles.usersContainer}>
        {users.map((user, index) => (
          <div key={index} style={styles.userCard}>
            <div style={styles.userInfo}>
              <p style={styles.userName}>{user.nombre}</p>
              <p style={styles.userEmail}>{user.correo}</p>
              <p style={styles.userCareer}>{user.carrera}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '30px 20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  welcomeTitle: {
    color: '#2c3e50',
    fontSize: '28px',
    marginBottom: '10px',
  },
  userName: {
    color: '#3498db',
    fontWeight: '600',
  },
  subtitle: {
    color: '#7f8c8d',
    fontSize: '18px',
    fontWeight: '400',
  },
  usersContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
    padding: '20px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    },
  },
  userInfo: {
    lineHeight: '1.6',
  },
  userEmail: {
    color: '#3498db',
    fontSize: '14px',
    margin: '5px 0',
  },
  userCareer: {
    color: '#27ae60',
    fontSize: '14px',
    fontStyle: 'italic',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px',
  },
  spinner: {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    borderLeftColor: '#3498db',
    animation: 'spin 1s linear infinite',
    marginBottom: '15px',
  },
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    backgroundColor: '#fdecea',
    borderRadius: '8px',
    margin: '20px',
  },
  errorText: {
    color: '#e74c3c',
    fontWeight: '500',
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
};

export default Home;