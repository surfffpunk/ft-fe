import React, { useEffect, useState } from 'react';
import { Card, Form, OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import '../assets/ProfilePage.scss';

const ProfilePage = () => {
    const [userData, setUserData] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);
    const navigate = useNavigate();
    const [showWalletModal, setShowWalletModal] = useState(false);
    const [walletName, setWalletName] = useState('');
    const [walletBalance, setWalletBalance] = useState('');
    const [wallets, setWallets] = useState([]);

    useEffect(() => {
        const fetchUserData = () => {
            const token = localStorage.getItem('jwt');
            if (token) {
                const decodedToken = jwtDecode(token);
                setUserData({
                    id: decodedToken.sub,
                    username: decodedToken.username,
                    email: decodedToken.email,
                });
            }
        };

        fetchUserData();
    }, []);

    const handleProfilePictureChange = async (e) => {
    };

    const handleWalletSubmit = async () => {
        const token = localStorage.getItem('jwt');

        if (!token) {
            alert('Ошибка: токен не найден.');
            return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;

        const walletData = {
            name: walletName,
            balance: parseFloat(walletBalance),
            expenses: 0,
            countOfOperation: 0
        };

        try {
            const response = await fetch(`http://localhost:8081/wallets/create?user_id=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(walletData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Ошибка при добавлении кошелька: ${errorMessage}`);
            }

            const newWallet = await response.json();
            setWallets((prevWallets) => [...prevWallets, newWallet]);
            setShowWalletModal(false);
            setWalletName('');
            setWalletBalance('');

        } catch (error) {
            console.error('Ошибка при добавлении кошелька:', error);
            alert(error.message);
        }
    };


    return (
        <div className="profile-page-container">
            <div className="profile-card p-4">
                <Card.Body>
                    <h3 className="text-center mb-4 profile-title">Профиль</h3>
                    <div className="text-center mb-4">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-top">Нажмите, чтобы загрузить новое фото профиля</Tooltip>}
                        >
                            <div className="profile-picture-container" onClick={() => document.getElementById('profilePictureInput').click()}>
                                {profilePicture ? (
                                    <img src={profilePicture} alt="Profile" className="profile-picture" />
                                ) : (
                                    <div className="profile-placeholder"></div>
                                )}
                                <input
                                    type="file"
                                    id="profilePictureInput"
                                    onChange={handleProfilePictureChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </OverlayTrigger>
                    </div>
                    <Form.Group controlId="formUsername">
                        <Form.Label className="form-label">Имя пользователя</Form.Label>
                        <Form.Control type="text" value={userData.username || ''} readOnly className="form-control" />
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mt-3">
                        <Form.Label className="form-label">Email</Form.Label>
                        <Form.Control type="email" value={userData.email || ''} readOnly className="form-control" />
                    </Form.Group>

                    <button className="add-wallet-button mt-4 w-100" onClick={() => setShowWalletModal(true)}>Добавить кошелек</button>

                    <button
                        className="analytics-button mt-4 w-100"
                        onClick={() => navigate('/home')}
                    >
                        Перейти к аналитике
                    </button>
                </Card.Body>
            </div>

            {}
            <Modal show={showWalletModal} onHide={() => setShowWalletModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить кошелек</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formWalletName">
                        <Form.Label>Имя кошелька</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите имя кошелька"
                            value={walletName}
                            onChange={(e) => setWalletName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formWalletBalance" className="mt-3">
                        <Form.Label>Баланс</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введите баланс"
                            value={walletBalance}
                            onChange={(e) => setWalletBalance(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowWalletModal(false)}>Отмена</Button>
                    <Button variant="primary" onClick={handleWalletSubmit}>Добавить</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProfilePage;
