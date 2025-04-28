import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import TaskList from '../components/TaskList';
import logo from '../assets/task.jpg';
import logo2 from '../assets/imgg.jpg';

// Decode token function
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error('Token decode error:', err);
    return null;
  }
};

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUser({ name: decoded.name || decoded.username || 'User', userId: decoded.id });
      } else {
        navigate('/');  
      }
    } else {
      navigate('/');  
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  if (!user) return null; // Wait until user is decoded

  return (
<div div style={styles.main}>
<div style={styles.container}>
      <button onClick={handleLogout} style={styles.logoutButton}>
        <FaSignOutAlt />
      </button>

      <div style={styles.container2}  >
        <h1 style={styles.title}>Welcome to Task Manager</h1>
        <h2 style={styles.subtitle}>Hello, {user.name} 👋</h2>
      </div>
    </div>
        <div  style={{
          background: 'linear-gradient(135deg,rgb(253, 247, 255),rgb(247, 244, 244))',
          minHeight: '75vh',
          padding: '20px',
          // borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        }}>

        <TaskList userId={user.userId} />
        </div>
        
        </div>
  );
};

const styles = {
  main:{
    width: '99vw',
  },
  container: {
    backgroundImage: `url(${logo2})`,  // Use the image URL variable properly
    backgroundSize: 'cover',  // Ensures the image covers the entire container
    backgroundPosition: 'center',  // Centers the image
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 0,
    display: 'flex',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: 'relative',
    borderBottom: '2px solid red',
  },  
  container2: {
 
    paddingLeft:'20px',
  },
  logoutButton: {
    position: 'absolute',
    top: '20px',
    right: '30px',
    border: 'none',
    backgroundColor: '#f44336',
    color: '#fff',
    fontSize: '18px',
    padding: '10px',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    width: '90%',
    maxWidth: '700px',
    textAlign: 'center',
    height :'200px'
  },
  title: {
    fontSize: '32px',
    marginBottom: '10px',
    color: '#333',
  },
  subtitle: {
    fontSize: '22px',
    marginBottom: '30px',
    color: '#555',
  },
};

export default HomePage;
