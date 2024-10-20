import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import '../assets/BalanceAndTransaction.scss';

const BalanceAndTransaction = ({ onAddTransaction }) => {
    const [wallets, setWallets] = useState([]);
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [transactionDetails, setTransactionDetails] = useState({
        category: '',
        type: 'Доход',
        amount: '',
        date: new Date().toISOString().slice(0, 10),
        walletId: '',
    });

    useEffect(() => {
        const fetchWallets = async () => {
            const token = localStorage.getItem('jwt');

            if (!token) {
                alert('Ошибка: токен не найден.');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8081/users/find/wallets`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.length > 0) {
                    setWallets(response.data);
                } else {
                    alert('Кошельки не найдены.');
                }
            } catch (error) {
                console.error('Ошибка при получении кошельков:', error);
                alert('Не удалось получить информацию о кошельках.');
            }
        };

        fetchWallets();
    }, []);

    const handleAddTransaction = async () => {
        const token = localStorage.getItem('jwt');

        if (!token) {
            alert('Ошибка: токен не найден.');
            return;
        }

        try {
            const newTransaction = {
                amount: parseFloat(transactionDetails.amount),
                isIncome: transactionDetails.type === 'Доход',
                walletName: wallets.find(wallet => wallet.id === transactionDetails.walletId)?.name,
                categoryName: transactionDetails.category,
                description: '',
                createdAt: transactionDetails.date,
            };

            const response = await axios.post(
                `http://localhost:8081/operations/create?wallet_id=${transactionDetails.walletId}&category_id=${transactionDetails.category}`,
                newTransaction,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                onAddTransaction(response.data);
                alert('Транзакция успешно добавлена!');
                setShowTransactionModal(false);
                setTransactionDetails({ category: '', type: 'Доход', amount: '', date: new Date().toISOString().slice(0, 10), walletId: '' }); // Сброс значений формы
            }
        } catch (error) {
            console.error('Ошибка при добавлении транзакции:', error);
            alert('Не удалось добавить транзакцию.');
        }
    };

    return (
        <div className="balance-transaction-container">
            <div className="wallets-list">
                {wallets.length > 0 ? (
                    wallets.map((wallet) => (
                        <div key={wallet.id} className="wallet-info-section">
                            <h4 className="wallet-name">{wallet.name}</h4>
                            <div className="wallet-balance">Баланс: {wallet.balance} BYN</div>
                        </div>
                    ))
                ) : (
                    <p>Кошельки не найдены.</p>
                )}
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
                        <Form.Group controlId="formWallet">
                            <Form.Label>Кошелек</Form.Label>
                            <Form.Control
                                as="select"
                                value={transactionDetails.walletId}
                                onChange={(e) => setTransactionDetails({ ...transactionDetails, walletId: e.target.value })}
                            >
                                <option value="">Выберите кошелек</option>
                                {wallets.map((wallet) => (
                                    <option key={wallet.id} value={wallet.id}>
                                        {wallet.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Категория</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите категорию"
                                value={transactionDetails.category}
                                onChange={(e) => setTransactionDetails({ ...transactionDetails, category: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formType">
                            <Form.Label>Тип</Form.Label>
                            <Form.Control
                                as="select"
                                value={transactionDetails.type}
                                onChange={(e) => setTransactionDetails({ ...transactionDetails, type: e.target.value })}>
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
