import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/TransactionsTable.scss';

const TransactionsTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [wallets, setWallets] = useState([]);
    const [selectedWalletId, setSelectedWalletId] = useState(null);
    const [filterType, setFilterType] = useState('Все');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

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

                setWallets(response.data);
                if (response.data.length > 0) {
                    setSelectedWalletId(response.data[0].id);
                }
            } catch (error) {
                console.error('Ошибка при получении кошельков:', error);
                alert('Не удалось загрузить кошельки.');
            }
        };

        fetchWallets();
    }, []);

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!selectedWalletId) return;

            const token = localStorage.getItem('jwt');

            if (!token) {
                alert('Ошибка: токен не найден.');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8081/wallets/find/${selectedWalletId}/operations`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setTransactions(response.data);
            } catch (error) {
                console.error('Ошибка при получении транзакций:', error);
                alert('Не удалось загрузить транзакции.');
            }
        };

        fetchTransactions();
    }, [selectedWalletId]);

    const filteredTransactions = transactions.filter((tx) => {
        const txDate = new Date(tx.createdAt); // Используем правильное поле даты
        const inDateRange = (!startDate || txDate >= new Date(startDate)) && (!endDate || txDate <= new Date(endDate));
        const matchesType = filterType === 'Все' || (tx.isIncome ? 'Доход' : 'Расход') === filterType;
        return inDateRange && matchesType;
    });

    return (
        <div className="transactions-table-container">
            <h2 className="transactions-table-title">Таблица транзакций</h2>

            <div className="filters">
                <label>
                    Кошелек:
                    <select value={selectedWalletId || ''} onChange={(e) => setSelectedWalletId(e.target.value)} className="filter-select">
                        {wallets.map(wallet => (
                            <option key={wallet.id} value={wallet.id}>{wallet.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Тип:
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-select">
                        <option value="Все">Все</option>
                        <option value="Доход">Доход</option>
                        <option value="Расход">Расход</option>
                    </select>
                </label>
                <label>
                    С:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="filter-input"
                    />
                </label>
                <label>
                    По:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="filter-input"
                    />
                </label>
            </div>

            <table className="transactions-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Категория</th>
                    <th>Тип</th>
                    <th>Сумма</th>
                    <th>Дата</th>
                </tr>
                </thead>
                <tbody>
                {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((tx, index) => (
                        <tr key={tx.id}>
                            <td>{index + 1}</td>
                            <td>{tx.categoryName}</td>
                            <td>{tx.isIncome ? 'Доход' : 'Расход'}</td>
                            <td>{tx.amount > 0 ? `+${tx.amount}` : `${tx.amount}`}</td>
                            <td>{new Date(tx.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="no-transactions">
                            Нет транзакций за выбранный период и тип.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionsTable;
