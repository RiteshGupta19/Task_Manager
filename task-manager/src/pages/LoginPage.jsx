import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div style={styles.container}>
      <LoginForm />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    background: `
    linear-gradient(135deg, #f5f5f5 0%, #dcdcdc 25%, #f5f5f5 50%, #dcdcdc 75%, #f5f5f5 100%)
    `,
    backgroundSize: '400% 400%',
    animation: 'shine 5s linear infinite',
    color: '#000',
  },
};



export default LoginPage;
