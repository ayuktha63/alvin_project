import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('User registration successful');
      } else {
        setMessage('Registration failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setMessage('Registration failed: Server error');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Events</h1>
        <h2>Create an Account</h2>
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
          <div className="input-group password-input">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm Password"
            />
            <span className="password-toggle" onClick={handleConfirmPasswordVisibility}>
              {confirmPasswordVisible ? '🙈' : '👁️'}
            </span>
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <p className="login-prompt">Already have an account? <Link to="/login">Log In</Link></p>
      </div>
    </div>
  );
}

export default SignUpPage;
