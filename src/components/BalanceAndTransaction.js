import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../assets/BalanceAndTransaction.css';

const BalanceAndTransaction = ({ onAddTransaction }) => {
    const [balance, setBalance] = useState('');
    const [showBalanceModal, setShowBalanceModal] = useState(false);
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [transactionDetails, setTransactionDetails] = useState({
        category: '',
        type: 'Доход',
        amount: '',
        date: new Date().toISOString().slice(0, 10),
    });

    const handleSetBalance = () => {
        setShowBalanceModal(true); // Открываем модальное окно для ввода баланса
    };

    const handleAddTransaction = () => {
        onAddTransaction(transactionDetails);
        setShowTransactionModal(false);
        setTransactionDetails({ category: '', type: 'Доход', amount: '', date: new Date().toISOString().slice(0, 10) }); // Сбросить поля формы
    };

    const handleSaveBalance = () => {
        if (balance && !isNaN(balance)) {
            setBalance(Number(balance));
            setShowBalanceModal(false); // Закрываем модальное окно
        }
    };

    return (
        <div className="balance-transaction-container">
            <div className="balance-section">
                <h4 className="balance-title">Текущий баланс</h4>
                {!balance ? (
                    <button className="set-balance-button" onClick={handleSetBalance}>
                        Установить баланс
                    </button>
                ) : (
                    <div className="balance-display">Баланс: ${balance}</div>
                )}
            </div>

            <div className="transaction-section">
                <button className="add-transaction-button" onClick={() => setShowTransactionModal(true)}>
                    Добавить транзакцию
                </button>
            </div>

            {/* Модальное окно для установки баланса */}
            <Modal show={showBalanceModal} onHide={() => setShowBalanceModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Установить начальный баланс</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBalance">
                            <Form.Label>Начальный баланс</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Введите начальный баланс"
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowBalanceModal(false)}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={handleSaveBalance}>
                        Установить баланс
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Модальное окно для добавления транзакции */}
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
