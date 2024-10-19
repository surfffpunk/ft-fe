import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../assets/HomePage.scss';
import TransactionsTable from '../components/TransactionsTable';
import BalanceAndTransaction from '../components/BalanceAndTransaction';
import ExpenseCharts from '../components/ExpenseCharts';
import SideMenu from '../components/SideMenu';
import { jwtDecode } from 'jwt-decode';

const HomePage = ({ isRegistered }) => {
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchTransactionsAndBalance = async () => {
            const token = localStorage.getItem('jwt');

            if (!token) {
                alert('Ошибка: токен не найден.');
                return;
            }

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;

            try {
                // Получение всех транзакций
                const transactionsResponse = await fetch(`http://localhost:8081/operations/all?user_id=${userId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!transactionsResponse.ok) {
                    throw new Error('Ошибка при получении транзакций');
                }

                const transactionsData = await transactionsResponse.json();
                setTransactions(transactionsData);

                const totalBalance = transactionsData.reduce((acc, transaction) => acc + transaction.amount, 0);
                setBalance(totalBalance);

            } catch (error) {
                console.error('Ошибка при получении данных:', error);
                alert(error.message);
            }
        };

        fetchTransactionsAndBalance();
    }, []);

    const handleAddTransaction = async (newTransaction) => {
        const token = localStorage.getItem('jwt');

        if (!token) {
            alert('Ошибка: токен не найден.');
            return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;

        try {
            const response = await fetch(`http://localhost:8081/operations/create?user_id=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newTransaction),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Ошибка при добавлении транзакции: ${errorMessage}`);
            }

            const addedTransaction = await response.json();
            setTransactions((prevTransactions) => [...prevTransactions, addedTransaction]);

            setBalance((prevBalance) => prevBalance + addedTransaction.amount);
            alert('Транзакция успешно добавлена!');
        } catch (error) {
            console.error('Ошибка при добавлении транзакции:', error);
            alert(error.message);
        }
    };

    return (
        <div className="homepage-container">
            <Header />

            <div className="main-content">
                <SideMenu />

                <div className="content">
                    <div id="current-balance" className="balance-transaction-wrapper">
                        <BalanceAndTransaction onAddTransaction={handleAddTransaction} />
                    </div>

                    <div id="transactions-table" className="table-container">
                        <TransactionsTable transactions={transactions} />
                    </div>

                    <div id="charts">
                        <ExpenseCharts balance={balance} expenses={transactions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
