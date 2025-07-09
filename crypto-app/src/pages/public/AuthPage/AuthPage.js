import { useState } from 'react';

import Login from './Login/Login.js';
import RegistrationDefault from "./Registration/RegistrationDefault";

import './AuthPage.scss'

import tronCoinAnimation from '../../../assets/video/crypto_coin.mp4'

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false)

  if (showLogin) {
    return <Login onBack={() => setShowLogin(false)} />;
  }

  if (showRegister) {
      return <RegistrationDefault onBack={() => setShowRegister(false)} />
  }
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">CRYPTO (CON) AIRDROP</h1>

        <div className="tron-logo">
          <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto">
            <source src={tronCoinAnimation} type="video/mp4"/>
          </video>
        </div>

        <div className="auth-buttons">
          <button
              className="btn-login"
              onClick={() => setShowLogin(true)}
          >
            LOG IN
          </button>

          <button
              className="btn-signup"
              onClick={() => setShowRegister(true)}
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;