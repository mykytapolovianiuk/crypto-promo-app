import { observer } from 'mobx-react-lite';
import { useAuth } from '../../../context/AuthContext';
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';

import AirdropTimer from "../../../components/AirdropTimer";
import BurgerMenu from "../../../components/BurgerMenu/BurgerMenu";

import questionMark from "../../../assets/icons/question-mark.svg"
import settingsIcon from "../../../assets/icons/settings.svg"
import profileIcon from "../../../assets/icons/person-run.svg"

import './Main.scss'

const Main = observer(() => {
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [bonusProgress, setBonusProgress] = useState(15);
    const [bonusToNext, setBonusToNext] = useState(10);
    const menuRef = useRef(null);

    // Закриття меню при кліку поза ним
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        // Логіка виходу
        console.log('Logging out...');
        setIsMenuOpen(false);
        // navigate('/login'); // або інша логіка виходу
    };

    return (
        <main className="mainPage">
            <AirdropTimer/>
            <section className="bonus__section">
                <div className="bonus-balance__container">
                    <p className="balance-title">CURRENT BONUS REWARD</p>
                    <h2 className="balance-value">1,231 CON</h2>
                    <span className="balance-questionMark"><img src={questionMark} alt="question-mark-icon"/></span>
                </div>
                <div className="bonus-level__container">
                    <p className="level-title">CURRENT BONUS / LEVEL</p>
                    <div className="progress-bar__container">
                        <div className="progress-bar__track">
                            <div
                                className="progress-bar__fill"
                                style={{width: `${bonusProgress}%`}}
                            />
                        </div>
                        <p className="bonus-text">
                            +{bonusToNext} BONUS TO NEXT LEVEL
                        </p>
                        <Link to="/balance">
                            <button className="bonus-details__button">VIEW DETAILS <span>></span></button>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="airdrop-section">
                <div className="airdrop-card">
                    <div className="live-badge">
                        <span className="live-badge__text">LIVE AIRDROP</span>
                        <div className="live-indicator"></div>
                    </div>
                    <div className="airdrop-content">
                        <h2 className="step-title">
                            <span className="step-number">STEP 2 /</span>
                            <span className="step-description">  VERIFYING PARTICIPANTS</span>
                        </h2>
                        <div className="participation-status">
                            <span className="participation-label">Participation:</span>
                            <div className="status-indicator">
                                <span className="status-icon">❌</span>
                                <span className="status-text">Not Participating</span>
                            </div>
                        </div>
                        <Link to="/drop">
                            <button className="bonus-details__button">VIEW DETAILS <span>></span></button>
                        </Link>
                        <p className="airdrop-info">
                            TRON is launching a monthly airdrop of $10,000,000
                        </p>
                    </div>
                </div>
            </section>
            <footer className="footer__container">
                <div className="profile__section">
                    <img
                        className="profile-img"
                        src={profileIcon}
                        alt="profile-icon"
                        onClick={() => navigate('/')}
                    />
                    <div className="profile-user__container">
                        <h2 className="profile-username">THOMAS</h2>
                        <p className="profile-status">Verified</p>
                    </div>
                </div>
                <BurgerMenu onLogout={handleLogout} />
            </footer>
        </main>
    );
});

export default Main;