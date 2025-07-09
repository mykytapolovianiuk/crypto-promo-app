import { observer } from 'mobx-react-lite';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../../../context/AuthContext';

import './EmailAuth.scss'

const EmailAuth = observer(() => {
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const [step, setStep] = useState('verify'); // verify, success
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    if (!/^\d*$/.test(value)) {
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (error) {
      setError('');
    }

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const isComplete = newCode.every(digit => digit !== '');
    setIsValid(isComplete);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then(text => {
        const numbers = text.replace(/\D/g, '').slice(0, 6);
        if (numbers.length === 6) {
          const newCode = numbers.split('');
          setCode(newCode);
          setIsValid(true);
          inputRefs.current[5]?.focus();
        }
      });
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();

    if (!isValid) {
      setError('Введіть всі 6 цифр коду');
      return;
    }

    const enteredCode = code.join('');
    auth.setLoading(true);
    setError('');

    setTimeout(() => {

      if (enteredCode === '123456') {
        setShowSuccess(true);
        setStep('success');
        auth.setLoading(false);
        auth.isAuthenticated = true;

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError('Невірний код. Спробуйте ще раз');
        auth.setLoading(false);
      }
    }, 3000);
  };

  const handleResendCode = () => {
    setCode(['', '', '', '', '', '']);
    setError('');
    setIsValid(false);
    setShowSuccess(false);
    inputRefs.current[0]?.focus();
    console.log('Resending code...'); // дебаг
    setTimeLeft(45);
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

  return (
      <div className="emailPage">
        <div className="login-page">
          <div className="login-container">
            <span className="arrow-left" onClick={() => {
              navigate(-1)
            }}>←</span>
            <h1 className="login-title">CRYPTO (CON) AIRDROP</h1>
            <div className="verify-container">
              <div className="verify_text-container">
                <h2 className="verify-title">Verify your email address</h2>
                <p className="verify-subtitle">We sent a 6-digit code to your email. Please enter it below</p>
              </div>

              <div className="verify_code-container">
                {code.map((digit, index) => (
                    <input
                        key={index}
                        ref={el => inputRefs.current[index] = el}
                        className={`verify_code ${error && !digit ? 'error' : ''} ${showSuccess ? 'success' : ''}`}
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        autoComplete="off"
                    />
                ))}
              </div>
              <p>correct code: 123456</p>

              {error && (
                  <div className="error-message">
                    {error}
                  </div>
              )}

              <button
                  className={`verify-button ${showSuccess ? 'success' : ''} ${!isValid ? 'disabled' : ''}`}
                  onClick={handleVerify}
                  disabled={!isValid || auth.isLoading}
              >
                {showSuccess ? 'EMAIL SUCCESSFULLY VERIFIED!' : 'CONFIRM EMAIL'}
              </button>

              <div className="verify-resend-btn-container">
                <button
                    className="verify-resend-btn"
                    onClick={handleResendCode}
                    disabled={timeLeft > 0}
                    style={{
                      color: timeLeft > 0 ? '#777777' : '',
                      cursor: timeLeft > 0 ? 'not-allowed' : 'pointer',
                    }}
                >
                  {timeLeft > 0 ? `Resend code in ${timeLeft}s` : 'Resend code'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
});

export default EmailAuth;