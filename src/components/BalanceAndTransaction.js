import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import '../assets/BalanceAndTransaction.scss';

const BalanceAndTransaction = ({ onAddTransaction }) => {
    const [wallet, setWallet] = useState({ name: '', balance: 0 });
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [transactionDetails, setTransactionDetails] = useState({
        category: '',
        type: 'Доход',
        amount: '',
        date: new Date().toISOString().slice(0, 10),
    });


    useEffect(() => {
        axios.get('/wallet/balance')
            .then(response => setWallet(response.data))
            .catch(error => console.error('Ошибка при получении данных кошелька:', error));
    }, []);

    const handleAddTransaction = () => {
        axios.post('/operations/all', {
            ...transactionDetails,
            walletId: wallet.id,
        })
            .then(() => {
                onAddTransaction(transactionDetails);
                setShowTransactionModal(false);
                setTransactionDetails({ category: '', type: 'Доход', amount: '', date: new Date().toISOString().slice(0, 10) });
            })
            .catch(error => console.error('Ошибка при добавлении транзакции:', error));
    };

    return (
        <div className="balance-transaction-container">
            <div className="wallet-info-section">
                <h4 className="wallet-name">{wallet.name}</h4>
                <div className="wallet-balance">Баланс: ${wallet.balance}</div>
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
