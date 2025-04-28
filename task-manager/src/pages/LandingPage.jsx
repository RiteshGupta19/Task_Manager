import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/task.jpg';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.leftSide}>
        <img src={logo} alt="Background" style={styles.image} />
      </div>
      <div style={styles.rightSide}>
        <div style={styles.content}>
          <h1>Welcome to Task Manager</h1>
          <p style={styles.description}>
            Task Manager helps you keep track of your tasks, organize them, and improve your productivity.
          </p>
          <h2>Please log in to continue</h2>
          <div style={styles.buttonsContainer}>
            <button onClick={() => navigate('/login')} style={styles.button}>
              Go to Login
            </button>
            <span style={styles.or}>or</span>
            <button onClick={() => navigate('/register')} style={styles.button}>
              New User? Register Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
  },
  leftSide: {
    width: '50%', // Adjust width as needed
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '99%',
    objectFit: 'cover',
  },
  rightSide: {
    width: '50%', // Adjust width as needed
    padding: '20px',
    backgroundColor: '#fff', // Or any color you'd like
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    textAlign: 'center',
    width: '85%', // Adjust width as needed

  },
  logoutButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    border: 'none',
    backgroundColor: 'red',
    fontSize: '20px',
    cursor: 'pointer',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  or: {
    margin: '10px 0',
    fontSize: '16px',
    color: '#888',
  }
};

export default LandingPage;
