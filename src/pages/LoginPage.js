import React, { useState } from 'react';
import { Form, Container, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../assets/RegistrationPage.scss';

const LoginPage = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const loginData = {
            username,
            password,
        };

        try {
            const response = await fetch('http://localhost:8081/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });


            const data = await response.json();
            setIsAuthenticated(true);
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
                        <h3 className="registration-title">Вход</h3>
                        <Form onSubmit={handleLogin}>
                            <Form.Group controlId="formUsername" className="mt-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Введите имя пользователя"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
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

                            <button className="registration-btn mt-4 w-100" disabled={isLoading}>
                                {isLoading ? <Spinner animation="border" size="sm" /> : 'Войти'}
                            </button>
                            <button
                                className="registration-btn mt-4 w-100"
                                onClick={() => navigate('/registration')}
                            >Зарегистрироваться</button>
                        </Form>
                    </Card.Body>
                </div>
            </Container>
        </div>
    );
};

export default LoginPage;
