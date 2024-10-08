import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../assets/HomePage.css';
import TransactionsTable from '../components/TransactionsTable';
import BalanceAndTransaction from '../components/BalanceAndTransaction';
import ExpenseCharts from '../components/ExpenseCharts';
import SideMenu from '../components/SideMenu';
import { getTransactions, addTransaction as addTransactionAPI, getBalance, updateBalance } from '../services/api';

const HomePage = ({ isRegistered }) => {
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if (isRegistered) {
            const fetchData = async () => {
                try {
                    const responseTransactions = await getTransactions();
                    setTransactions(responseTransactions.data);

                    const currentBalance = await getBalance();
                    setBalance(currentBalance);
                } catch (error) {
                    console.error("Ошибка при получении данных:", error);
                }
            };
            fetchData();
        }
    }, [isRegistered]);

    const handleAddTransaction = async (newTransaction) => {
        const transactionWithId = { ...newTransaction, date: new Date(newTransaction.date) };

        try {
            await addTransactionAPI(transactionWithId);
            setTransactions(prevTransactions => [...prevTransactions, transactionWithId]);

            const updatedBalance = balance + newTransaction.amount;
            await updateBalance(updatedBalance);
            setBalance(updatedBalance);
        } catch (error) {
            console.error("Ошибка при добавлении транзакции:", error);
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
