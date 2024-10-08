import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/TransactionsTable.css';

const TransactionsTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [filterType, setFilterType] = useState('Все');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Получаем транзакции с бэкэнда
    useEffect(() => {
        axios.get('/api/transactions') // Замените на реальный URL вашего бэкэнда
            .then(response => setTransactions(response.data))
            .catch(error => console.error('Ошибка при получении транзакций:', error));
    }, []);

    // Фильтруем транзакции
    const filteredTransactions = transactions.filter((tx) => {
        const txDate = new Date(tx.date);
        const inDateRange = (!startDate || txDate >= new Date(startDate)) && (!endDate || txDate <= new Date(endDate));
        const matchesType = filterType === 'Все' || tx.type === filterType;
        return inDateRange && matchesType;
    });

    return (
        <div className="transactions-table-container">
            <h2 className="transactions-table-title">Таблица транзакций</h2>

            <div className="filters">
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
                            <td>{tx.category}</td>
                            <td>{tx.type}</td>
                            <td>{tx.amount > 0 ? `+${tx.amount}` : `${tx.amount}`}</td>
                            <td>{new Date(tx.date).toLocaleDateString()}</td>
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
