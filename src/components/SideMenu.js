import React from 'react';
import '../assets/SideMenu.css';

const SideMenu = () => {
    return (
        <div className="side-menu">
            <ul className="menu-list">
                <li className="menu-item">
                    <a href="#current-balance">Текущий баланс</a>
                </li>
                <li className="menu-item">
                    <a href="#transactions-table">Таблица транзакций</a>
                </li>
                <li className="menu-item">
                    <a href="#charts">Графики</a>
                </li>
            </ul>
        </div>
    );
};

export default SideMenu;
