// src/components/AddTransactionForm.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddTransactionForm = ({ show, onHide, onAdd }) => {
    const [description, setDescription] = useState('');
    const [type, setType] = useState('Доход');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTransaction = {
            description,
            type,
            category,
            amount: parseFloat(amount),
            date: new Date().toISOString().split('T')[0],
        };
        // Обработка добавления транзакции через API
        onAdd(newTransaction);
        // Очистка формы
        setDescription('');
        setType('Доход');
        setCategory('');
        setAmount('');
        // Закрытие модального окна
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить транзакцию</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formType">
                        <Form.Label>Тип</Form.Label>
                        <Form.Control
                            as="select"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        >
                            <option>Доход</option>
                            <option>Расход</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formCategory">
                        <Form.Label>Категория</Form.Label>
                        <Form.Control
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formAmount">
                        <Form.Label>Сумма</Form.Label>
                        <Form.Control
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Добавить
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddTransactionForm;
