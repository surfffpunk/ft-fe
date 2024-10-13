import React, { useState } from 'react';
import { Form, Container, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../services/api';
import '../assets/RegistrationPage.scss';

const LoginPage = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await getUserById({
                username,
                password
            });

            console.log('Вход успешен:', response.data);
            setIsAuthenticated(true);
            navigate('/profile');
        } catch (error) {
            console.error('Ошибка входа:', error);
            alert('Ошибка входа, попробуйте еще раз');
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
                        </Form>
                    </Card.Body>
                </div>
            </Container>
        </div>
    );
};

export default LoginPage;
