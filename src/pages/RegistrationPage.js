import React, { useState } from 'react';
import { Form, Container, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../assets/RegistrationPage.scss';
import '../App.js';
const RegistrationPage = ({ setIsAuthenticated, setUserData }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }

        setIsLoading(true);

        const registrationData = { username, email, password };

        try {
            const response = await fetch('http://localhost:8081/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Ошибка регистрации: ${errorMessage}`);
            }

            const data = await response.json();
            setIsAuthenticated(true);
            setUserData(data);
            localStorage.setItem('jwt', data.jwt);
            navigate('/profile');

        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="registration-container">
            <Container className="d-flex justify-content-center align-items-center my-5">
                <div className="registration-card">
                    <Card.Body>
                        <h3 className="registration-title">Регистрация</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUsername">
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
                                <Form.Control
                                    type="password"
                                    placeholder="Подтвердите пароль"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="registration-input"
                                />
                            </Form.Group>

                            <button className="registration-btn mt-4 w-100" disabled={isLoading}>
                                {isLoading ? <Spinner animation="border" size="sm" /> : 'Зарегистрироваться'}
                            </button>
                        </Form>
                        <button
                            className="registration-btn mt-4 w-100"
                            onClick={() => navigate('/login')}
                        >
                            Я уже зарегистрирован, войти
                        </button>
                    </Card.Body>
                </div>
            </Container>
        </div>
    );
};

export default RegistrationPage;
