import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Drop.scss';

import AirdropTimer from "../../../components/AirdropTimer";
import BurgerMenu from "../../../components/BurgerMenu/BurgerMenu";
import profileIcon from "../../../assets/icons/person-run.svg";
import settingsIcon from "../../../assets/icons/settings.svg";

const Drop = observer(() => {
  const navigate = useNavigate()
  const auth = useAuth();

  const PHASES = {
    COMING_SOON: 'coming_soon',
    WALLET_CONNECTION: 'wallet_connection',
    VERIFICATION: 'verification',
    REWARDING: 'rewarding',
    COMPLETE: 'complete'
  };

  const [connectedWallets, setConnectedWallets] = useState(0);
  const [verifiedParticipants, setVerifiedParticipants] = useState(0);
  const [totalParticipants, setTotalParticipants] = useState(18302);
  const [nextDropTime, setNextDropTime] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false); // Add transition flag

  // Отримуємо дані з auth store
  const currentPhase = auth.currentDropPhase;
  const isWalletConnected = auth.currentDrop.walletConnected;
  const isVerified = auth.currentDrop.isVerified;
  const userRewards = auth.currentDrop.rewards;
  const hasParticipatedInDrops = auth.hasParticipatedInDrops;
  const missedLastDrop = auth.missedLastDrop;
  const isFirstTimeDrop = auth.isFirstTimeDrop;
  const dropUIType = auth.dropUIType;

  useEffect(() => {
    initializeDropData();
    const interval = setInterval(updateDropData, 5000);
    return () => clearInterval(interval);
  }, []);


  const initializeDropData = () => {
    setNextDropTime(new Date('2024-12-14T21:00:00'));
    console.log('Drop UI Type:', dropUIType);
    console.log('Current Phase:', currentPhase);
    console.log('Wallet Connected:', isWalletConnected);
    console.log('Verified:', isVerified);
    console.log('Has Claimed Reward:', auth.currentDrop.hasClaimedReward);
  };

  const updateDropData = () => {
    console.log('Updating drop data...');
  };

  const handleConnectWallet = async () => {
    if (isTransitioning) return; // Prevent multiple clicks

    try {
      setIsTransitioning(true);
      console.log('Connecting wallet...');
      auth.setWalletConnected(true);
      setConnectedWallets(prev => prev + 1);

      // Single phase transition with proper cleanup
      setTimeout(() => {
        auth.setDropPhase(PHASES.VERIFICATION);
        setIsTransitioning(false);
      }, 1000);
    } catch (error) {
      console.error('Wallet connection failed:', error);
      setIsTransitioning(false);
    }
  };

  const handleVerification = async () => {
    if (isTransitioning) return; // Prevent multiple clicks

    try {
      setIsTransitioning(true);
      console.log('Starting verification...');
      auth.setVerified(true);
      setVerifiedParticipants(prev => prev + 1);

      // Single phase transition with proper cleanup
      setTimeout(() => {
        auth.setDropPhase(PHASES.REWARDING);
        setIsTransitioning(false);
      }, 2000);
    } catch (error) {
      console.error('Verification failed:', error);
      setIsTransitioning(false);
    }
  };

  const handleClaimReward = async () => {
    if (isTransitioning) return; // Prevent multiple clicks

    try {
      setIsTransitioning(true);
      console.log('Claiming reward...');
      auth.setRewards(18.5, 65);
      auth.claimReward();

      // Single phase transition chain
      setTimeout(() => {
        auth.setDropPhase(PHASES.COMPLETE);
        setTimeout(() => {
          auth.completeDrop(true);
          setIsTransitioning(false);
        }, 1000);
      }, 1000);
    } catch (error) {
      console.error('Reward claiming failed:', error);
      setIsTransitioning(false);
    }
  };

  const handleRestartDrop = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    auth.setDropPhase(PHASES.COMING_SOON);
    auth.setWalletConnected(false);
    auth.setVerified(false);
    auth.setRewards(0, 0);
    auth.resetClaimedReward();
    setConnectedWallets(0);
    setVerifiedParticipants(0);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const renderPhaseContent = () => {
    switch (currentPhase) {
      case PHASES.COMING_SOON:
        return renderComingSoonContent();
      case PHASES.WALLET_CONNECTION:
        return renderWalletConnectionContent();
      case PHASES.VERIFICATION:
        return renderVerificationContent();
      case PHASES.REWARDING:
        return renderRewardingContent();
      case PHASES.COMPLETE:
        return renderCompleteContent();
      default:
        return <div>Unknown phase</div>;
    }
  };

  const renderComingSoonContent = () => {
    const getContentByUserType = () => {
      switch (dropUIType) {
        case 'first_time':
          return {
            title: 'FIRST TIME PARTICIPANT',
            subtitle: 'Welcome! You will get full rewards for participation',
            missedText: false
          };
        case 'missed_last':
          return {
            title: 'YOU MISSED LAST AIRDROP',
            subtitle: 'But don\'t worry, you still get 30% target @38000 participants',
            missedText: true
          };
        case 'regular':
          return {
            title: 'REGULAR PARTICIPANT',
            subtitle: 'You participated in previous drops. Full rewards available!',
            missedText: false
          };
        default:
          return {
            title: 'DROP COMPLETE',
            subtitle: 'You successfully participated',
            missedText: false
          };
      }
    };

    const content = getContentByUserType();

    return (
        <div className="drop-phase coming-soon">
          <AirdropTimer/>
          {hasParticipatedInDrops ? (
              <div className="drop-phase complete">
                <AirdropTimer/>
                <div className="drop-reward_container">
                  <div className="drop-status_container">
                    <div className="drop-status_title">
                      DROP COMPLETE
                    </div>
                    <div className="drop-status_subtitle">
                      You successfully participated!
                    </div>
                  </div>
                  <div className="reward-value_container">
                    <div className="value_section">
                      <p className="progress-value">+{userRewards.trx} CON</p>
                      <p className="value-cell">Your reward</p>
                    </div>
                    <div className="value_section">
                      <p className="progress-value">{userRewards.percentage}%</p>
                      <p className="value-cell">Your progress to next level</p>
                    </div>
                    <div className="value_section">
                      <p className="progress-value">18,302</p>
                      <p className="value-cell">Total participants</p>
                    </div>
                  </div>
                  <button className="reward-btn">Share my referral link</button>
                </div>

                <div className="next-drop-info">
                  <div className="next-drop-title">NEXT DROP:</div>
                  <div className="next-drop-time">SATURDAY AT 21:00 UTC</div>
                </div>

                <button
                    className="action-button primary"
                    onClick={() => auth.setDropPhase(PHASES.WALLET_CONNECTION)}
                    disabled={isTransitioning}
                >
                  {isTransitioning ? 'LOADING...' : 'CONNECT WALLET'}
                </button>

                <footer className="footer__container">
                  <div className="profile__section">
                    <button><img className="profile-img" src={profileIcon} alt="profile-icon"
                                 onClick={() => navigate('/')}/></button>
                    <div className="profile-user__container">
                      <h2 className="profile-username">THOMAS</h2>
                      <p className="profile-status">{isVerified ? "Verified" : "Not verified"}</p>
                    </div>
                  </div>
                  <Link to="/referral">
                    <img className="settings-icon"
                         src={settingsIcon}
                         alt="settings-icon"
                    />
                  </Link>
                </footer>
              </div>
          ) : (
              <div className="coming-phase_container">
                <div className="missed-drop_section">
                  <p className="missed-drop_title">You missed LAST airdrop</p>
                  <p className="missed-drop_subtitle">Join the next one and don't forget to activate participation.</p>
                </div>
                <div className="next-drop-info not-shadow">
                  <div className="next-drop-title">NEXT DROP:</div>
                  <div className="next-drop-time">SATURDAY AT 21:00 UTC</div>
                </div>
              </div>
          )}

          <footer className="footer__container">
            <div className="profile__section">
              <button><img className="profile-img" src={profileIcon} alt="profile-icon"
                           onClick={() => navigate('/')}/></button>
              <div className="profile-user__container">
                <h2 className="profile-username">THOMAS</h2>
                <p className="profile-status">{isVerified ? "Verified" : "Not verified"}</p>
              </div>
            </div>
            <BurgerMenu/>
          </footer>
        </div>
    );
  };

  const renderWalletConnectionContent = () => (
      <div className="drop-phase wallet-connection">
        <AirdropTimer/>
        <div className="drop-phase_wallet shadow">
          <div className="wallet-phase_text">
            <p className="wallet-phase_title"><span>step 1 /</span> Wallets Connecting</p>
            <p className="wallet-phase_subtitle">Status: Done</p>
          </div>
          <button
              className="wallet-phase_btn accent-color-bg"
              onClick={handleConnectWallet}
              disabled={isWalletConnected || isTransitioning}
          >
            {isTransitioning ? 'CONNECTING...' : (isWalletConnected ? 'WALLET CONNECTED' : 'CONNECT WALLET')}
          </button>
        </div>
        <div className="disable-phase_container">
          <div className="disable-phase-text">step 2 /Participant verification</div>
        </div>
        <div className="disable-phase_container">
          <div className="disable-phase-text">step 3 / Reward distribution</div>
        </div>

        <footer className="footer__container">
          <div className="profile__section">
            <button><img className="profile-img" src={profileIcon} alt="profile-icon"
                         onClick={() => navigate('/')}/></button>
            <div className="profile-user__container">
              <h2 className="profile-username">THOMAS</h2>
              <p className="profile-status">{isVerified ? "Verified" : "Not verified"}</p>
            </div>
          </div>
          <BurgerMenu/>
        </footer>
      </div>
  );

  const renderVerificationContent = () => (
      <div className="drop-phase verification">
        <AirdropTimer/>
        <div className="drop-phase_wallet">
          <div className="wallet-phase_text">
            <p className="wallet-phase_title"><span>step 1 /</span> Wallets Connecting</p>
            <p className="wallet-phase_subtitle">Status: Done</p>
          </div>
          <button className="wallet-phase_btn connected"
                  disabled={true}
        >
          Wallet connected (TWe8...sA5g)
          </button>
        </div>
        <div className="drop-phase_verification shadow">
          <div className="wallet-phase_text">
            <p className="wallet-phase_title"><span>step 2 /</span> Verifying Participants</p>
            <p className="wallet-phase_subtitle">Status: {isVerified ? "Done" : "In Progress"}</p>
            <button
                className="action-button primary"
                onClick={handleVerification}
                disabled={isVerified || isTransitioning}
            >
              {isTransitioning ? 'VERIFYING...' : (isVerified ? 'VERIFIED' : 'VERIFY ACCOUNT')}
            </button>
          </div>
        </div>
        <div className="disable-phase_container">
          <div className="disable-phase-text">step 3 / Reward distribution</div>
        </div>

        <footer className="footer__container">
          <div className="profile__section">
            <button><img className="profile-img" src={profileIcon} alt="profile-icon"
                         onClick={() => navigate('/')}/></button>
            <div className="profile-user__container">
              <h2 className="profile-username">THOMAS</h2>
              <p className="profile-status">{isVerified ? "Verified" : "Not verified"}</p>
            </div>
          </div>
          <BurgerMenu/>
        </footer>
      </div>
  );

  const renderRewardingContent = () => (
      <div className="drop-phase rewarding">
        <AirdropTimer/>
        <div className="drop-phase_wallet">
          <div className="wallet-phase_text">
            <p className="wallet-phase_title"><span>step 1 /</span> Wallets Connecting</p>
            <p className="wallet-phase_subtitle">Status: Done</p>
          </div>
          <button className="wallet-phase_btn">Wallet connected (TWe8...sA5g)</button>
        </div>
        <div className="drop-phase_verif">
          <div className="verif-phase_text">
            <p className="verif-phase_title"><span>step 2 /</span> Verifying Participants</p>
            <p className="verif-phase_subtitle">Status: {isVerified ? "Verified" : "Not verified"} </p>
          </div>
        </div>
        <div className="drop-phase_distr-rewards">
          <div className="distr-rewards-phase_text">
            <p className="distr-rewards-phase_title"><span>step 3 /</span> Distributing Rewards</p>
            <div className="rewards_container">
              <p className="rewards_title">Your reward</p>
              <p className="rewards_value">+{userRewards.trx} CON</p>
            </div>
            <Link to='/'>
              <button className="distr-rewards_btn">GO TO DASHBOARD</button>
            </Link>
            <p className="distr-rewards_comment">Airdrop complete – see your balance</p>
          </div>
        </div>
        <button
            className="action-button primary"
            onClick={handleClaimReward}
            disabled={auth.currentDrop.hasClaimedReward || isTransitioning}
        >
          {isTransitioning ? 'CLAIMING...' : (auth.currentDrop.hasClaimedReward ? 'REWARD CLAIMED' : 'CLAIM REWARD')}
        </button>

        <footer className="footer__container">
          <div className="profile__section">
            <button><img className="profile-img" src={profileIcon} alt="profile-icon"
                         onClick={() => navigate('/')}/></button>
            <div className="profile-user__container">
              <h2 className="profile-username">THOMAS</h2>
              <p className="profile-status">{isVerified ? "Verified" : "Not verified"}</p>
            </div>
          </div>
          <BurgerMenu/>
        </footer>
      </div>
  );

  const renderCompleteContent = () => (
      <div className="drop-phase complete">
        <AirdropTimer/>
        <div className="drop-reward_container">
          <div className="drop-status_container">
            <div className="drop-status_title">
              DROP COMPLETE
            </div>
            <div className="drop-status_subtitle">
              You successfully participated!
            </div>
          </div>
          <div className="reward-value_container">
            <div className="value_section">
              <p className="progress-value">+{userRewards.trx} CON</p>
              <p className="value-cell">Your reward</p>
            </div>
            <div className="value_section">
              <p className="progress-value">{userRewards.percentage}%</p>
              <p className="value-cell">Your progress to next level</p>
            </div>
            <div className="value_section">
              <p className="progress-value">18,302</p>
              <p className="value-cell">Total participants</p>
            </div>
          </div>
          <Link to="/referral">
            <button className="reward-btn">Share my referral link</button>
          </Link>
        </div>

        <div className="next-drop-info">
        <div className="next-drop-title">NEXT DROP:</div>
          <div className="next-drop-time">SATURDAY AT 21:00 UTC</div>
        </div>

        <button
            className="action-button success"
            onClick={handleRestartDrop}
            disabled={isTransitioning}
        >
          {isTransitioning ? 'RESTARTING...' : 'RESTART (Test)'}
        </button>

        <footer className="footer__container">
          <div className="profile__section">
            <button><img className="profile-img" src={profileIcon} alt="profile-icon"
                         onClick={() => navigate('/')}/></button>
            <div className="profile-user__container">
              <button className="profile-username">THOMAS</button>
              <p className="profile-status">{isVerified ? "Verified" : "Not verified"}</p>
            </div>
          </div>
          <BurgerMenu/>
        </footer>
      </div>
  );

  return (
      <div className="dropPage">
        <div className="drop-container">
          <div className="drop-content">
            {renderPhaseContent()}
          </div>
        </div>

        {/*Для тесту*/}
        <div className="debug-info" style={{display: 'none', padding: '10px', background: '#f0f0f0', margin: '10px', fontSize: '12px'}}>
          <p>Current Phase: {currentPhase}</p>
          <p>User: {auth.userName}</p>
          <p>Wallet Connected: {isWalletConnected ? 'Yes' : 'No'}</p>
          <p>Verified: {isVerified ? 'Yes' : 'No'}</p>
          <p>Has Claimed Reward: {auth.currentDrop.hasClaimedReward ? 'Yes' : 'No'}</p>
          <p>Has Participated: {hasParticipatedInDrops ? 'Yes' : 'No'}</p>
          <p>Drop UI Type: {dropUIType}</p>
          <p>Is Transitioning: {isTransitioning ? 'Yes' : 'No'}</p>
        </div>
      </div>
  );
});

export default Drop;