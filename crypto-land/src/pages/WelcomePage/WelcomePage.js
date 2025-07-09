import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import './WelcomePage.scss';

import WelcomePageTimer from "../components/WelcomePageTimer";
import AirdropScheduleSlider from "../components/AirdropScheduleSlider";

import welcomeCoin from '../../assets/video/crypto_coin.mp4'
import inviteImg from '../../assets/images/Frame 142@2x.png'
import scrollToTopImg from '../../assets/icons/scrollToTop.svg'
const WelcomePage = () => {
    const navigate = useNavigate();

    const [openSections, setOpenSections] = useState({
        faq1: false,
        faq2: false,
        faq3: false,
        faq4: false
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleParticipateClick = () => {
        navigate('/');
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
  });
};

    return (
        <main className="welcome-page">
            <section className="hero-section">
                <div className="countdown-banner">
                    <div className="countdown-text">
                        NEXT DROP STARTS IN
                    </div>
                    <WelcomePageTimer/>
                </div>

                <div className="crypto-image">

                    <div className="placeholder-coin">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto">
                            <source src={welcomeCoin} type="video/mp4"/>
                        </video>
                    </div>
                </div>

                <div className="header_text-section">
                    <h1 className="title">CRYPTO (CON) <span>AIRDROP</span></h1>
                    <p className="subtitle">Reward for Supporting the Network During Market Instability</p>
                </div>

                <a className="participate-button" onClick={handleParticipateClick}>PARTICIPATE NOW</a>
            </section>

            <section className="info-box monthly-airdrop">
                <h2 className="box-title">CRYPTO IS LAUNCHING A MONTHLY AIRDROP OF</h2>
                <p className="amount">$10,000,000</p>
                <p className="description">FOR USERS WHO SUPPORT THE NETWORK DURING PERIODS OF MARKET
                    INSTABILITY.</p>
            </section>

            <section className="info-box how-it-works">
                <h2 className="section-title">HOW TRON AIRDROP WORKS</h2>

                <div className="steps">
                    <div className="step-item">
                        <div className="step-number">step 1</div>
                        <div className="step-content">
                            CONNECT YOUR VERIFIED WALLET
                        </div>
                    </div>

                    <div className="step-item">
                        <div className="step-number">step 2</div>
                        <div className="step-content_section">
                            <div className="step-content">
                                VERIFY YOUR IDENTITY AND BE ONLINE AT DROP TIME
                            </div>
                        </div>
                    </div>

                    <div className="step-item">
                        <div className="step-number">step 3</div>
                        <div className="step-content">
                            GET REWARDED BASED ON YOUR TRX ACTIVITY
                        </div>
                    </div>
                </div>
            </section>

            <section className="info-box bonus-calculator">
                <h2 className="section-title">CALCULATE YOUR BONUS</h2>
                <p className="box-description">Get more rewards the more CON you hold or use</p>

                <div className="bonus-table">
                    <div className="table-header">
                        <div className="cell">CON VOLUME ($)</div>
                        <div className="cell">BONUS <span>%</span></div>
                        <div className="cell">MAX <span>REWARD</span></div>
                    </div>

                    <div className="table-row">
                        <div className="cell">$50-250</div>
                        <div className="cell">3%</div>
                        <div className="cell">$75</div>
                    </div>

                    <div className="table-row">
                        <div className="cell">$500-2,000</div>
                        <div className="cell">5%</div>
                        <div className="cell">$100</div>
                    </div>

                    <div className="table-row">
                        <div className="cell">$10,000+</div>
                        <div className="cell">10%</div>
                        <div className="cell">$10,000</div>
                    </div>
                </div>
            </section>
            <section className="info-box invite-earn">
                <h2 className="section-title">INVITE & EARN MORE</h2>
                <p className="box-description">Earn 5% from your friends' bonuses. Min. 3 friends to qualify. Share
                    your
                    profile to invite them & increase your profile.</p>
            </section>
            <img className="invite-img" src={inviteImg} alt='inviteImg'/>
            <section className="info-box track-bonuses">
                <h2 className="section-title">TAKE PART IN THE TRON AIRDROP AND TRACK YOUR BONUSES IN REAL
                    TIME.</h2>
                <button className="participate-button">PARTICIPATE NOW</button>
            </section>

            <section className="info-box airdrop-schedule">
                <h2 className="section-title">AIRDROP SCHEDULE – CLAIM YOUR REWARDS</h2>
                <p className="box-description">Join 3 times a week: Monday, Wednesday, and Saturday at 21:00 UTC for
                    global airdrops.</p>

                <AirdropScheduleSlider/>
            </section>

            <section className="info-box safe-transparent">
                <h2 className="section-title">SAFE, TRANSPARENT, VERIFIED</h2>
                <div className="features">
                    <div className="feature-item">
                        <div className="feature-title">One user = one wallet</div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-title">Phone number & anti-fraud verification</div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-title">View all transactions via CRYPTOSCAN</div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-title">Protected against bots & abusers</div>
                    </div>
                </div>
            </section>

            <section className="info-box faq">
                <h2 className="section-title">FAQ</h2>
                <div className="features">
                    <button className="feature-item"
                            onClick={() => toggleSection('faq1')}
                    >
                        <div className="feature-title">When will I receive my referral bonus?</div>
                        <span className="arrow">
                            {openSections.faq1 ? "↓" : "→"}
                        </span>
                    </button>
                    {openSections.faq1 && (
                        <button className='hide-item'>
                            <div className='hide-title'>You'll receive your 5% bonus right after your friend
                                participates in their first airdrop.
                            </div>
                        </button>
                    )}
                    <button className="feature-item"
                            onClick={() => toggleSection('faq2')}
                    >
                        <div className="feature-title">Do I need to do anything to activate the bonus?</div>
                        <span className="arrow">
                            {openSections.faq2 ? "↓" : "→"}
                        </span>
                    </button>
                    {openSections.faq2 && (
                        <button className='hide-item'>
                            <div className='hide-title'>You'll receive your 5% bonus right after your friend
                                participates in their first airdrop.
                            </div>
                        </button>
                    )}
                    <button className="feature-item"
                            onClick={() => toggleSection('faq3')}
                    >
                        <div className="feature-title">When will I receive my referral bonus?</div>
                        <span className="arrow">
                            {openSections.faq3 ? "↓" : "→"}
                        </span>
                    </button>
                    {openSections.faq3 && (
                        <button className='hide-item'>
                            <div className='hide-title'>You'll receive your 5% bonus right after your friend
                                participates in their first airdrop.
                            </div>
                        </button>
                    )}
                    <button className="feature-item"
                            onClick={() => toggleSection('faq4')}
                    >
                        <div className="feature-title">When will I receive my referral bonus?</div>
                        <span className="arrow">
                            {openSections.faq4 ? "↓" : "→"}
                        </span>
                    </button>
                    {openSections.faq4 && (
                        <button className='hide-item'>
                            <div className='hide-title'>You'll receive your 5% bonus right after your friend
                                participates in their first airdrop.
                            </div>
                        </button>
                    )}
                </div>
            </section>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-text_container">
                        <h3 className="footer-title">CRYPTO (CON) AIRDROP</h3>
                        <div className="footer-links">
                            <a href="#" className="footer-link">TERMS OF USE</a>
                            <a href="#" className="footer-link">PRIVACY POLICY</a>
                        </div>
                        <div className="footer-copyright">
                            © 2025 Tempo Airdrop. All rights reserved. Not financial advice. Participation subject to terms.
                        </div>
                    </div>
                    <button className="scroll-to-top" onClick={scrollToTop}>
                        <img className="scroll-to-top" src={scrollToTopImg} alt="scrollButton"/>
                    </button>
                </div>
            </footer>
        </main>
    );
};
export default WelcomePage
