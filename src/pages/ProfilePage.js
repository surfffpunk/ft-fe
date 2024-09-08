import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [username, setUsername] = useState('User');
    const [email, setEmail] = useState('user@example.com');
    const [profilePicture, setProfilePicture] = useState(null);
    const [balance, setBalance] = useState(5000);
    const navigate = useNavigate();

    const handleProfilePictureChange = (e) => {
        setProfilePicture(URL.createObjectURL(e.target.files[0]));
    };

    const handleBalanceChange = () => {
        // Имитация изменения баланса
        const newBalance = prompt('Введите новый баланс:', balance);
        if (newBalance !== null) {
            setBalance(Number(newBalance));
        }
    };

    const handleAnalyticsClick = () => {
        navigate('/');
    };

    return (
        <Container className="d-flex justify-content-center align-items-center my-5">
            <Card className="p-4 shadow-lg rounded w-100" style={{ maxWidth: '600px' }}>
                <Card.Body>
                    <h3 className="text-center mb-4">Профиль</h3>
                    <div className="text-center mb-4">
                        {profilePicture ? (
                            <img src={profilePicture} alt="Profile" className="img-fluid rounded-circle" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                        ) : (
                            <div className="profile-placeholder" style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#ddd' }}></div>
                        )}
                        <Form.Group controlId="formProfilePicture" className="mt-3">
                            <Form.Label>Загрузите фото профиля</Form.Label>
                            <Form.Control type="file" onChange={handleProfilePictureChange} />
                        </Form.Group>
                    </div>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Имя пользователя</Form.Label>
                        <Form.Control type="text" value={username} readOnly />
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mt-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} readOnly />
                    </Form.Group>

                    <Form.Group controlId="formBalance" className="mt-3">
                        <Form.Label>Баланс</Form.Label>
                        <Form.Control type="text" value={`$${balance}`} readOnly />
                        <Button variant="primary" className="mt-2" onClick={handleBalanceChange}>Изменить баланс</Button>
                    </Form.Group>

                    <Button variant="success" className="mt-4 w-100" onClick={handleAnalyticsClick}>
                        Перейти к аналитике
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProfilePage;
