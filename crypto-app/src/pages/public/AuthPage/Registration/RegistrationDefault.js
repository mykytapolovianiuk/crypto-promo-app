import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';

import './RegistrationDefault.scss'

const RegistrationDefault = observer( () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    referralCode: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Валідація
    if (!formData.username || !formData.email || !formData.password) {
      setError('Заповніть всі поля');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(formData.username)) {
      setError('Username can only contain letters, numbers, and underscores');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (formData.username.length > 20) {
      setError('Username cannot exceed 20 characters');
      return;
    }

    // Якщо всі перевірки пройшли успішно, тільки тоді переходимо
    setTimeout(() => {
      setSuccess(true);

      setTimeout(() => {
        navigate('/register-email');
      }, 1000);
    }, 1000);
  };

  if (auth.isLoading) {
    return (
      <div className="loading-container">
        <div className="login-card">
          <div className="loading">
            <svg className="loading-spinner" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="#d4ff4a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="50,200"
              />
            </svg>
            <p>Connecting to Web3... 🔗</p>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="login-page">
        <div className="login-container">
          <h1 className="login-title">CRYPTO (CON) AIRDROP</h1>
          <div className="success-message">
            <div className="success-content">
              <div className="success-icon">✓</div>
              <p>SUCCESS!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <span className="arrow-left" onClick={() => {
          navigate(-1)
        }}>←</span>
        <h1 className="login-title">CRYPTO (CON) AIRDROP</h1>

        <form onSubmit={handleRegister} className="login-form">
          <div className={`login-input-container ${error ? 'accent-border' : ''}`}>
            <input
                className="login-input"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username*"
            />
          </div>
          {error && <div className="error-user">{error}</div>}

          <div className={`login-input-container ${error ? 'accent-border' : ''}`}>
            <input
                className="login-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email*"
            />
          </div>

          <div className={`login-input-container ${error ? 'accent-border' : ''}`}>
            <input
                className="login-input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password*"
            />
          </div>

          <div className={`login-input-container ${error ? 'accent-border' : ''}`}>
            <input
                className="login-input"
                type="text"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                placeholder="Referral Code"
            />
          </div>

          <button type="submit" className="btn-login-submit">
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
});

export default RegistrationDefault;