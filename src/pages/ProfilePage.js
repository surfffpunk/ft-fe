import React, { useEffect, useState } from 'react';
import { Card, Form, OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/ProfilePage.css';

const ProfilePage = () => {
    const [userData, setUserData] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);
    const [showWalletModal, setShowWalletModal] = useState(false);
    const [walletName, setWalletName] = useState('');
    const [walletBalance, setWalletBalance] = useState('');
    const [wallets, setWallets] = useState([]); // Состояние для хранения кошельков
    const navigate = useNavigate();

    // Получение данных профиля
    useEffect(() => {
        axios.get('/api/profile')
            .then(response => {
                setUserData(response.data);
                return axios.get('/api/wallets');
            })
            .then(response => {
                setWallets(response.data);
            })
            .catch(error => console.error('Ошибка при загрузке профиля:', error));
    }, []);

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(URL.createObjectURL(file));

        // Отправка фото профиля на сервер
        const formData = new FormData();
        formData.append('profilePicture', file);

        axios.post('/api/profile/upload-photo', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(() => console.log('Фото профиля обновлено'))
            .catch(error => console.error('Ошибка при обновлении фото профиля:', error));
    };

    const handleWalletSubmit = () => {
        axios.post('/api/wallet', { walletName, walletBalance })
            .then(response => {
                setWallets([...wallets, response.data]); // Обновляем состояние кошельков
                setShowWalletModal(false);
            })
            .catch(error => console.error('Ошибка при добавлении кошелька:', error));
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
                        disabled={wallets.length === 0}
                    >
                        Перейти к аналитике
                    </button>
                </Card.Body>
            </div>

            {/* Модальное окно для добавления кошелька */}
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
