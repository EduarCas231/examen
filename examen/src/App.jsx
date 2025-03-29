import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';



const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        {user && <li style={styles.li}><Link to="/">Inicio</Link></li>}
        {!user && <li style={styles.li}><Link to="/registro">Registro</Link></li>}
        {!user && <li style={styles.li}><Link to="/login">Login</Link></li>}
        {user && (
          <li style={styles.li}>
            <button onClick={handleLogout} style={styles.button}>
              Cerrar sesión
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

// Estilos (los mismos que antes)
const styles = {
  nav: {
    backgroundColor: '#333',
    padding: '10px',
  },
  ul: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    margin: 0,
    padding: 0,
  },
  li: {
    color: 'white',
  },
  button: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '16px',
  },
};

export default App;