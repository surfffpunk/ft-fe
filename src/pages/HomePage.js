import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../assets/HomePage.css';
import TransactionsTable from '../components/TransactionsTable';
import BalanceAndTransaction from '../components/BalanceAndTransaction';
import ExpenseCharts from '../components/ExpenseCharts';
import SideMenu from '../components/SideMenu'; // Импортируем боковое меню
import { getTransactions, addTransaction as addTransactionAPI, getBalance, updateBalance, mockTransactions } from '../services/api';

const HomePage = ({ isRegistered }) => {
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if (isRegistered) {
            getTransactions().then(response => {
                setTransactions(response.data);
            });

            getBalance().then(currentBalance => {
                setBalance(currentBalance);
            });
        } else {
            setTransactions(mockTransactions);
            setBalance(5000);
        }
    }, [isRegistered]);

    const handleAddTransaction = (newTransaction) => {
        const transactionWithId = { id: transactions.length + 1, ...newTransaction, date: new Date(newTransaction.date) };
        setTransactions([...transactions, transactionWithId]);
        addTransactionAPI(transactionWithId);

        const updatedBalance = balance + newTransaction.amount;
        updateBalance(updatedBalance).then(newBalance => {
            setBalance(newBalance);
        });
    };

    return (
        <div className="homepage-container">
            <Header />

            <div className="main-content">
                <SideMenu /> {}

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
