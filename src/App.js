import './assets/HomePage.scss';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import RegistrationPage from './pages/RegistrationPage';
import NotFoundPage from './pages/NotFoundPage';
import React, { useState, useEffect } from 'react';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/registration" />} />
                <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/registration" />} />
                <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/registration" />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;
