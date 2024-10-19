import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import '../assets/BalanceAndTransaction.scss';
import { jwtDecode } from 'jwt-decode';

const BalanceAndTransaction = ({ onAddTransaction }) => {
    const [wallet, setWallet] = useState({ name: '', balance: 0 });
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [transactionDetails, setTransactionDetails] = useState({
        category_id: '',
        isIncome: true,
        amount: '',
        date: new Date().toISOString().slice(0, 10),
    });

    useEffect(() => {
        const fetchWallet = async () => {
            const token = localStorage.getItem('jwt');

            if (!token) {
                alert('Ошибка: токен не найден.');
                return;
            }

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;

            try {
                const response = await axios.get(`http://localhost:8081/wallets/all?user_id=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.length > 0) {
                    // Предполагаем, что первый кошелек - основной
                    setWallet(response.data[0]);
                }
            } catch (error) {
                console.error('Ошибка при получении кошельков:', error);
                alert('Не удалось получить информацию о кошельках.');
            }
        };

        fetchWallet();
    }, []);

    const handleAddTransaction = async () => {
        const token = localStorage.getItem('jwt');

        if (!token) {
            alert('Ошибка: токен не найден.');
            return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;

        try {
            const newTransaction = {
                wallet_id: wallet.id, // ID кошелька
                category_id: transactionDetails.category_id,
                amount: parseFloat(transactionDetails.amount),
                isIncome: transactionDetails.isIncome,
                description: transactionDetails.description || '',
                createdAt: transactionDetails.date,
            };

            const response = await axios.post(`http://localhost:8081/operations/create?user_id=${userId}`, newTransaction, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                onAddTransaction(response.data);
                alert('Транзакция успешно добавлена!');
                setShowTransactionModal(false);
            }
        } catch (error) {
            console.error('Ошибка при добавлении транзакции:', error);
            alert('Не удалось добавить транзакцию.');
        }
    };

    return (
        <div className="balance-transaction-container">
            <div className="wallet-info-section">
                <h4 className="wallet-name">{wallet.name}</h4>
                <div className="wallet-balance">Баланс: {wallet.balance}</div>
            </div>

            <div className="transaction-section">
                <button className="add-transaction-button" onClick={() => setShowTransactionModal(true)}>
                    Добавить транзакцию
                </button>
            </div>

            <Modal show={showTransactionModal} onHide={() => setShowTransactionModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить транзакцию</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Категория</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите ID категории"
                                value={transactionDetails.category_id}
                                onChange={(e) => setTransactionDetails({ ...transactionDetails, category_id: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formType">
                            <Form.Label>Тип</Form.Label>
                            <Form.Control
                                as="select"
                                value={transactionDetails.isIncome ? 'Доход' : 'Расход'}
                                onChange={(e) => setTransactionDetails({ ...transactionDetails, isIncome: e.target.value === 'Доход' })}>
                                <option>Доход</option>
                                <option>Расход</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formAmount">
                            <Form.Label>Сумма</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Введите сумму"
                                value={transactionDetails.amount}
                                onChange={(e) => setTransactionDetails({ ...transactionDetails, amount: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDate">
                            <Form.Label>Дата</Form.Label>
                            <Form.Control
                                type="date"
                                value={transactionDetails.date}
                                onChange={(e) => setTransactionDetails({ ...transactionDetails, date: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowTransactionModal(false)}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={handleAddTransaction}>
                        Добавить транзакцию
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BalanceAndTransaction;
