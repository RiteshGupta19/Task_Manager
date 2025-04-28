import React, { useState } from 'react';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.login({ email, password });
      localStorage.setItem('userToken', response.token);   
      navigate('/home');  
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>
        {error && (
            <div style={styles.alertBox}>
              <strong>Oops!</strong> Email or password didn't match. Please try again.
            </div>
          )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />  <a href="/forgot-password" style={styles.forgotPassword}>Forgot Password?</a>

        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    // backgroundColor: '#ffffff', // Light background color
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // semi-transparent
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    width: '300px',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)', // for Safari support
    border: '1px solid rgba(255, 255, 255, 0.18)',
  }
  ,
  heading: {
    fontSize: '2em',
    marginBottom: '20px',
    color: '#333',
  },
  alertBox: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    color: '#d8000c',
    border: '1px solid #d8000c',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '15px',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px',
    width: '100%',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  forgotPassword: {
    display: 'block',
    textAlign: 'right',
    fontSize: '14px',
    color: '#007bff',
    textDecoration: 'none',
    marginBottom: '15px',
    marginTop: '-5px',
    cursor: 'pointer',
    transition: 'color 0.3s',
  },
};

export default LoginForm;
