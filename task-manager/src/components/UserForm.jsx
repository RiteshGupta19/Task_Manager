import React, { useState } from 'react';
import userService from '../services/userService';

const UserForm = ({ setUserId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await userService.login({ email, password });
      setUserId(user._id);
      alert('Login successful');
    } catch (error) {
      alert('Login failed');
    }
  };

  const handleRegister = async () => {
    try {
      const user = await userService.register({ email, password });
      setUserId(user._id);
      alert('Registration successful');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default UserForm;
