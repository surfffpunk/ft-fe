import '../assets/RegistrationPage.css';
import React, { useState } from 'react';
import { Form, Container, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const RegistrationPage = ({ setIsRegistered, setUserData }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }

        setIsLoading(true);

        registerUser({ username, email, password }).then(userData => {
            console.log('Регистрация успешна:', userData);
            setUserData(userData);
            setIsRegistered(true);
            setIsLoading(false);
            navigate('/profile');
        });
    };

    return (
        <div className="registration-container">
            <Container className="d-flex justify-content-center align-items-center my-5">
                <div className="registration-card">
                    <Card.Body>
                        <h3 className="registration-title">Регистрация</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Имя пользователя</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Введите имя пользователя"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="registration-input"
                                />
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="mt-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Введите email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="registration-input"
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mt-3">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Введите пароль"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="registration-input"
                                />
                            </Form.Group>

                            <Form.Group controlId="formConfirmPassword" className="mt-3">
                                <Form.Label>Подтвердите пароль</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Подтвердите пароль"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="registration-input"
                                />
                            </Form.Group>

                            <button
                                className="registration-btn mt-4 w-100 "
                                disabled={isLoading}
                            >
                                {isLoading ? <Spinner animation="border" size="sm" /> : 'Зарегистрироваться'}
                            </button>

                        </Form>
                    </Card.Body>
                </div>
            </Container>
        </div>
    );
};

export default RegistrationPage;
