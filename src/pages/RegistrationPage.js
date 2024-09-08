// src/components/RegistrationPage.js
import '../assets/RegistrationPage.css';
import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = ({ setIsRegistered }) => {
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

        // Имитация отправки данных на бэкэнд
        setIsLoading(true);
        setTimeout(() => {
            // Имитируем успешную регистрацию
            console.log('Регистрация успешна:', { username, email, password });
            // Устанавливаем состояние регистрации и перенаправляем на страницу профиля
            setIsRegistered(true);
            setIsLoading(false);
            navigate('/profile');
        }, 1000); // Задержка для имитации загрузки
    };

    return (
        <Container className="d-flex justify-content-center align-items-center my-5">
            <Card className="p-4 shadow-lg rounded w-100" style={{ maxWidth: '500px' }}>
                <Card.Body>
                    <h3 className="text-center mb-4">Регистрация</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Имя пользователя</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите имя пользователя"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
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
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-4 w-100" disabled={isLoading}>
                            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default RegistrationPage;
