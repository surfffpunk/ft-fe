// src/components/Header.js
import React from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = ({ onAddTransaction }) => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile'); // Перенаправление на страницу профиля
    };

    const handleAddTransactionClick = () => {
        onAddTransaction();
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Финансовый Трекер</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Button variant="outline-light" className="me-2" onClick={handleProfileClick}>
                        Профиль
                    </Button>
                    <Button variant="success" onClick={handleAddTransactionClick}>
                        Добавить транзакцию
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
