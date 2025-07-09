import { useState } from "react";
import { observer } from 'mobx-react-lite';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import AirdropTimer from "../../../components/AirdropTimer";

import './Balance.scss'
import questionMark from "../../../assets/icons/question-mark.svg";
import profileIcon from "../../../assets/icons/person-run.svg";
import settingsIcon from "../../../assets/icons/settings.svg";
import BurgerMenu from "../../../components/BurgerMenu/BurgerMenu";

const Balance = observer(() => {
  const auth = useAuth();
  const navigate = useNavigate()

  const [bonusProgress, setBonusProgress] = useState(15);
  const [bonusToNext, setBonusToNext] = useState(10);
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  // Extended transaction data
  const allTransactions = [
    { date: "10.04.25", amount: "750 CON", status: "Processing", statusClass: "processing" },
    { date: "01.04.25", amount: "350 CON", status: "Completed", statusClass: "completed" },
    { date: "28.03.25", amount: "35 CON", status: "Completed", statusClass: "completed" },
    { date: "10.02.25", amount: "120 CON", status: "Completed", statusClass: "completed" },
    { date: "25.01.25", amount: "890 CON", status: "Completed", statusClass: "completed" },
    { date: "15.01.25", amount: "200 CON", status: "Completed", statusClass: "completed" },
    { date: "05.01.25", amount: "450 CON", status: "Completed", statusClass: "completed" },
    { date: "20.12.24", amount: "300 CON", status: "Completed", statusClass: "completed" },
    { date: "10.12.24", amount: "150 CON", status: "Completed", statusClass: "completed" },
    { date: "01.12.24", amount: "600 CON", status: "Completed", statusClass: "completed" },
  ];

  // Show minimum 3 transactions by default, all when expanded
  const visibleTransactions = showAllTransactions ? allTransactions : allTransactions.slice(0, 3);

  const toggleTransactionView = () => {
    setShowAllTransactions(!showAllTransactions);
  };

  return (
      <div className="balancePage">
          <AirdropTimer/>
          <section className="bonus__section">
              <div className="bonus-balance__container">
                  <p className="balance-title">CURRENT BONUS REWARD</p>
                  <h2 className="balance-value">1,231 CON</h2>
                  <span className="balance-questionMark"><img src={questionMark} alt="question-mark-icon"/></span>
              </div>
              <div className="bonus-level__container-balance">
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
                      <div className="bonus-ranking_container">
                          <p className="ranking_title">COMMUNITY RANKING:</p>
                          <p className="ranking_value">🏆 Top 10% performer</p>
                      </div>
                  </div>
              </div>
          </section>
          <section className="info-box bonus-calculator">
              <h3 className="section-title">CALCULATE YOUR BONUS</h3>
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
          <section className="info-box bonus-calculator">
              <h3 className="section-title">TRANSACTIONS</h3>
              <div className="bonus-table">
                  <div className="table-header">
                      <div className="cell">DATE</div>
                      <div className="cell">AMOUNT</div>
                      <div className="cell">STATUS</div>
                  </div>

                  <div className={`transaction-list ${showAllTransactions ? 'expanded' : ''}`}>
                      {visibleTransactions.map((transaction, index) => (
                          <div key={index} className="table-row">
                              <div className="cell">{transaction.date}</div>
                              <div className="cell">{transaction.amount}</div>
                              <div className={`cell ${transaction.statusClass}`}>{transaction.status}</div>
                          </div>
                      ))}
                  </div>

                  <div className="view-details-container">
                      <button
                          className="view-details-btn"
                          onClick={toggleTransactionView}
                      >
                          {showAllTransactions ? 'Hide Details ▲' : 'View Details ▼'}
                      </button>
                  </div>
              </div>
          </section>

          <footer className="footer__container">
          <div className="profile__section">
                  <button><img className="profile-img" src={profileIcon} alt="profile-icon"
                               onClick={() => navigate('/')}/></button>
                  <div className="profile-user__container">
                      <h2 className="profile-username">THOMAS</h2>
                      <p className="profile-status">Verified</p>
                  </div>
              </div>
              <BurgerMenu/>
          </footer>
      </div>
  );
});

export default Balance;