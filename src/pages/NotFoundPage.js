import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/NotFoundPage.scss';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-page">
            <h1>404 - Страница не найдена</h1>
            <p>К сожалению, страница, которую вы ищете, не существует.</p>
            <button onClick={() => navigate('/home')} className="go-home-button">
                Вернуться на главную
            </button>
        </div>
    );
};

export default NotFoundPage;
