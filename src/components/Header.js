
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Header.css';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <h1 className="header-title">Финансовый Трекер</h1>
            <button className="header-button" onClick={() => navigate('/profile')}>
                Профиль
            </button>
        </header>
    );
};

export default Header;
