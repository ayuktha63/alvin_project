import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Authentication successful');
      } else {
        setMessage('Authentication failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Authentication failed: Server error');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Events</h1>
        <h2>Welcome Back!</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <div className="input-group password-input">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
            <span className="password-toggle" onClick={handlePasswordVisibility}>
              {passwordVisible ? '🙈' : '👁️'}
            </span>
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
        <p className="forgot-password">Forgot your password?</p>
        <p className="signup-prompt">Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
