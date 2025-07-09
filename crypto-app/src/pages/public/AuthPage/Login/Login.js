import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import {useNavigate} from 'react-router-dom';

import './Login.scss'

const Login = observer(() => {
  const auth = useAuth();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Валідація
    if (!formData.email || !formData.password) {
      setError('Заповніть всі поля');
      return;
    }

    setError('');

    // Валідація пройшла
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      auth.setLoading(true);


      // Мокові дані
      setTimeout(() => {
        if (formData.email === 'admin@test.com' && formData.password === '123456') {
          auth.setLoading(false);
          auth.setUser({
            name: 'Адмін Адмінович',
            email: 'admin@test.com',
            id: 1
          });

        } else if (formData.email === 'user@test.com' && formData.password === '123456') {
          auth.setLoading(false);
          auth.setUser({
            name: 'Звичайний Користувач',
            email: 'user@test.com',
            id: 2
          });

        } else {
          auth.setLoading(false);
          setError('Невірний email або пароль');
        }
      }, 2000);
    }, 2000);
  };

  // Тест
  console.log('isSuccess:', isSuccess);
  console.log('auth.isLoading:', auth.isLoading);

  if (isSuccess) {
    // Для тесту
    console.log('Showing success screen');
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

  return (
      <div className="login-page">
      <div className="login-container">
        <span className="arrow-left" onClick={() => {
          navigate(-1)
        }}>←</span>
        <h1 className="login-title">CRYPTO (CON) AIRDROP</h1>

        <form onSubmit={handleLogin} className="login-form">
          <div className={`login-input-container ${error ? 'accent-border' : ''}`}>
            <input
                className="login-input"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@test.com"
            />
          </div>

          <div className={`login-input-container ${error ? 'accent-border' : ''}`}>
            <input
                className="login-input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="123456"
            />
          </div>

          <div className="forgot-password">
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-login-submit">
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
});

export default Login;