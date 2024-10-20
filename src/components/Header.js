import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Header.scss';
import logo from '../resources/logo.png';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <h1 className="header-title">
                Финансовый<span className="tracker-highlight">Трекер</span>
            </h1>

            <div className="header-logo">
                <img src={logo} alt="Логотип" />
            </div>

            <button className="header-button" onClick={() => navigate('/profile')}>
                Профиль
            </button>
        </header>
    );
};

export default Header;
