import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './BurgerMenu.scss';
import userStore from '../../../src/context/UseStore';

const BurgerMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { logout } = useAuth();

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

    const handleLogout = async () => {
        try {
            await userStore.logout();
            navigate('/auth', { replace: true });
            window.location.reload(); // Примусове оновлення для скидання стану
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="burger-menu__container" ref={menuRef}>
            <button
                className={`burger-menu__button ${isMenuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Menu"
                aria-expanded={isMenuOpen}
            >
                <span className="burger-line"></span>
                <span className="burger-line"></span>
                <span className="burger-line"></span>
            </button>

            {isMenuOpen && (
                <div className="dropdown-menu">
                    <Link to="/" className="menu-item" onClick={() => setIsMenuOpen(false)}>
                        Main
                    </Link>
                    <Link to="/balance" className="menu-item" onClick={() => setIsMenuOpen(false)}>
                        Balance
                    </Link>
                    <Link to="/drop" className="menu-item" onClick={() => setIsMenuOpen(false)}>
                        Drop
                    </Link>
                    <Link to="/referral" className="menu-item" onClick={() => setIsMenuOpen(false)}>
                        Referral
                    </Link>
                    <button className="logout-button" onClick={handleLogout}>
                        Log Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default BurgerMenu;