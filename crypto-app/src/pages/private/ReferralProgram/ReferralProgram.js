import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './ReferralProgram.scss';

// assets
import copyIcon from '../../../assets/icons/copy-red.svg';
import AirdropTimer from "../../../components/AirdropTimer";
import BurgerMenu from "../../../components/BurgerMenu/BurgerMenu";

import profileIcon from "../../../assets/icons/person-run.svg";
import settingsIcon from "../../../assets/icons/settings.svg";


const ReferralProgram = ({ referralCode = "TRON123761" }) => {
    const navigate = useNavigate();
    const [openSections, setOpenSections] = useState({
        viewDetails: true,
        howItWorks: false,
        faq: false
    });
    const [showCopiedMessage, setShowCopiedMessage] = useState(false);

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleParticipateClick = () => {
        navigate('/');
    };

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(referralCode);
            setShowCopiedMessage(true);
            setTimeout(() => {
                setShowCopiedMessage(false);
            }, 2000); // Hide message after 2 seconds
        } catch (err) {
            console.error('Failed to copy text: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = referralCode;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            setShowCopiedMessage(true);
            setTimeout(() => {
                setShowCopiedMessage(false);
            }, 2000);
        }
    };

    return (
        <main className="referralPage">
            {showCopiedMessage && (
                <div className="copied-message">
                    Copied!
                </div>
            )}

            <section className="header__container">
                <AirdropTimer/>
                <div className="header-title__container">
                    <span className="arrow-left" onClick={() => {navigate(-1)}}>←</span>
                    <h1 className="header-title">REFERRAL PROGRAM</h1>
                </div>
                <div className="header-description">Earn 5% from your friend's Airdrop rewards</div>
            </section>

            <section className="referral-code__container">
                <p className="referral-code--title">Your Referral Code</p>
                <div className="referral-code--input__container">
                    <input
                        className="referral-code--input"
                        type="text"
                        value={referralCode}
                        readOnly
                    />
                    <button className="referral-code--copy" onClick={handleCopyCode}>
                        <img src={copyIcon} alt="Copy"/>
                    </button>
                </div>
                <button className="share-link__button">SHARE LINK</button>
                <p className="referral-code--note">Your friend gets the full reward. You earn +5% extra</p>
            </section>
            <section className="earnings__container">
                <div className="earnings-item">
                    <div className="earnings-label">Total Referral Earnings:</div>
                    <div className="earnings-value earning">$218.00</div>
                </div>
                <div className="earnings-item">
                    <div className="earnings-label">Left Until Limit:</div>
                    <div className="earnings-value">$782 of $1000</div>
                </div>
                <div className="earnings-item">
                    <div className="earnings-label">Friends Invited:</div>
                    <div className="earnings-value">6</div>
                </div>

                <div className="accordion-section">
                    <button
                        className="view-details__button"
                        onClick={() => toggleSection('viewDetails')}
                    >
                        <span className="view-details__text">
                            {openSections.viewDetails ? "HIDE DETAILS" : "VIEW DETAILS"}
                        </span>
                        <span className="arrow-right">
                            {openSections.viewDetails ? "v" : ">"}
                        </span>
                    </button>

                    {openSections.viewDetails && (
                        <div className="details-content">
                            <div className="referral-table">
                                <div className="referral-table-header">
                                    <div className="referral-id">Friend ID</div>
                                    <div className="referral-status">Status</div>
                                    <div className="referral-bonus">Bonus to You</div>
                                </div>
                                <div className="referral-table-row">
                                    <div className="referral-id">@CryptoFan</div>
                                    <div className="referral-status verified">Verified</div>
                                    <div className="referral-bonus earning">$20.00</div>
                                </div>
                                <div className="referral-table-row">
                                    <div className="referral-id">@hodlee98</div>
                                    <div className="referral-status not-verified">Not Verified</div>
                                    <div className="referral-bonus none">-</div>
                                </div>
                                <div className="referral-table-row">
                                    <div className="referral-id">@isiklover</div>
                                    <div className="referral-status participated">Participated</div>
                                    <div className="referral-bonus none">-</div>
                                </div>
                                <div className="referral-table-row">
                                    <div className="referral-id">@isiklover</div>
                                    <div className="referral-status verified">Verified</div>
                                    <div className="referral-bonus earning">$16.50</div>
                                </div>
                            </div>
                            <div className="referral-summary">
                                <div className="summary-row">
                                    <div className="summary-label">Total Earned</div>
                                    <div className="summary-value earning">$36.50</div>
                                </div>
                                <div className="summary-row">
                                    <div className="summary-label">Active Referrals</div>
                                    <div className="summary-value">2</div>
                                </div>
                                <div className="summary-row">
                                    <div className="summary-label">Potential Income</div>
                                    <div className="summary-value">$17.10</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="warning__container">
                <div className="warning-message">
                    ONE WALLET = ONE USER. MULTI-ACCOUNT DETECTION IS ACTIVE.
                </div>
            </section>

            <section className="info-buttons__container">
                <div className="accordion-section">
                    <button
                        className="info-button"
                        onClick={() => toggleSection('howItWorks')}
                    >
                        <span className="info-button--text">HOW REFERRAL PROGRAM WORKS</span>
                        <span className="arrow-right">
                            {openSections.howItWorks ? "↑" : "→"}
                        </span>
                    </button>

                    {openSections.howItWorks && (
                        <div className="how-it-works-content">
                            <div className="step">
                                <div className="step-text">Step 1: Share your referral link</div>
                            </div>
                            <div className="step">
                                <div className="step-text">Step 2: Your friend signs up and verifies</div>
                            </div>
                            <div className="step">
                                <div className="step-text">Step 3: They participate in any Airdrop round</div>
                            </div>
                            <div className="step">
                                <div className="step-text">Step 4: You receive 5% of their bonus automatically</div>
                            </div>
                            <div className="note">
                                Note: You can earn up to $1000 per Airdrop cycle
                            </div>
                        </div>
                    )}
                </div>

                <div className="accordion-section">
                    <button
                        className="info-button"
                        onClick={() => toggleSection('faq')}
                    >
                        <span className="info-button--text">FAQ</span>
                        <span className="arrow-right">
                            {openSections.faq ? "↑" : "→"}
                        </span>
                    </button>

                    {openSections.faq && (
                        <div className="faq-content">
                            <div className="faq-item">
                                <div className="faq-question">When will I receive my referral bonus?</div>
                                <div className="faq-answer">
                                    You'll receive your 5% bonus right after your friend participates in their first
                                    airdrop.
                                </div>
                            </div>

                            <div className="faq-item">
                                <div className="faq-question">Do I need to do anything to activate the bonus?</div>
                                <div className="faq-answer">
                                    No. Once your friend is verified and participates, your bonus is credited
                                    automatically.
                                </div>
                            </div>

                            <div className="faq-item">
                                <div className="faq-question">What does "Participated" mean in referral status?</div>
                                <div className="faq-answer">
                                    It means the person you invited joined at least one airdrop.
                                </div>
                            </div>

                            <div className="faq-item">
                                <div className="faq-question">Can I invite users from any country?</div>
                                <div className="faq-answer">
                                    Yes, TRON Airdrop is open globally.
                                </div>
                            </div>

                            <div className="faq-item">
                                <div className="faq-question">Why didn't I get a bonus for my friend?</div>
                                <div className="faq-answer">
                                    Make sure they:
                                    <ul>
                                        <li>Used your referral code during sign-up</li>
                                        <li>Completed verification</li>
                                        <li>Took part in at least one airdrop</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="faq-item">
                                <div className="faq-question">How many people can I invite?</div>
                                <div className="faq-answer">
                                    Unlimited! But you can earn up to $1000 per cycle in referral bonuses.
                                </div>
                            </div>

                            <div className="faq-item">
                                <div className="faq-question">Can I refer myself using a second wallet?</div>
                                <div className="faq-answer">
                                    No. Our system automatically detects duplicate users and blocks fake activity.
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="footer__section">
                <button className="back-button" onClick={handleParticipateClick}>BACK TO DASHBOARD</button>
            </section>
            <footer className="footer__container">
                <div className="profile__section">
                    <img className="profile-img" src={profileIcon} alt="profile-icon" onClick={() => navigate('/')}/>
                    <div className="profile-user__container">
                        <h2 className="profile-username">THOMAS</h2>
                        <p className="profile-status">Verified</p>
                    </div>
                </div>
                <BurgerMenu />
            </footer>
        </main>
    );
};

export default ReferralProgram;