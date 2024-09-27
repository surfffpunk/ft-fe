import './assets/HomePage.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import React, { useState } from 'react';
import RegistrationPage from './pages/RegistrationPage';


const App = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [userData, setUserData] = useState({}); // State to hold user data


    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/register" />}
                />
                <Route
                    path="/register"
                    element={
                        isRegistered ? <Navigate to="/profile" /> : <RegistrationPage setIsRegistered={setIsRegistered} setUserData={setUserData} />
                    }
                />
                <Route path="/profile" element={isRegistered ? <ProfilePage userData={userData} /> : <Navigate to="/register" />} />
                <Route path="/home" element={<HomePage />} /> {}
            </Routes>
        </Router>
    );
};

export default App;
