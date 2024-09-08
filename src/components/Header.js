// src/components/Header.js
import React from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';

const Header = ({ onAddTransaction }) => {
    const handleRegisterClick = () => {
        window.location.href = '/register';
    };

    const handleAddTransactionClick = () => {
        onAddTransaction();
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Финансовый Трекер</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Button variant="outline-light" className="me-2" onClick={handleRegisterClick}>
                        Регистрация
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
