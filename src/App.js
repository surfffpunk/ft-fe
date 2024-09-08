// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TransactionsTable from './components/TransactionsTable';
import ExpensesChart from './components/ExpensesChart';
import IncomeChart from './components/IncomeChart';
import CombinedChart from './components/CombinedChart';
import AddTransactionForm from './components/AddTransactionForm';
import { getBalance, getTransactions, addTransaction as addTransactionAPI } from './services/api';

const App = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [expensesByCategory, setExpensesByCategory] = useState({});
    const [incomeByType, setIncomeByType] = useState({});
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        getBalance().then(response => setBalance(response.data));
        getTransactions().then(response => {
            setTransactions(response.data);

            const expenseCategories = [...new Set(response.data.filter(tx => tx.amount < 0).map(tx => tx.category))];
            const expenses = {};

            expenseCategories.forEach(category => {
                expenses[category] = response.data
                    .filter(tx => tx.category === category && tx.amount < 0)
                    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
            });

            setExpensesByCategory(expenses);

            const incomeTypes = [...new Set(response.data.filter(tx => tx.amount > 0).map(tx => tx.category))];
            const income = {};

            incomeTypes.forEach(category => {
                income[category] = response.data
                    .filter(tx => tx.category === category)
                    .reduce((sum, tx) => sum + tx.amount, 0);
            });

            setIncomeByType(income);
        });
    }, []);

    const handleAddTransaction = (transaction) => {
        // Отправка новой транзакции на бэкэнд
        addTransactionAPI(transaction).then(() => {
            getTransactions().then(response => {
                setTransactions(response.data);

                const expenseCategories = [...new Set(response.data.filter(tx => tx.amount < 0).map(tx => tx.category))];
                const expenses = {};

                expenseCategories.forEach(category => {
                    expenses[category] = response.data
                        .filter(tx => tx.category === category && tx.amount < 0)
                        .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
                });

                setExpensesByCategory(expenses);

                const incomeTypes = [...new Set(response.data.filter(tx => tx.amount > 0).map(tx => tx.category))];
                const income = {};

                incomeTypes.forEach(category => {
                    income[category] = response.data
                        .filter(tx => tx.category === category)
                        .reduce((sum, tx) => sum + tx.amount, 0);
                });

                setIncomeByType(income);
            });
        });
    };

    return (
        <div>
            <Header onAddTransaction={() => setShowAddForm(true)} />
            <div className="container">
                <Dashboard balance={balance} transactions={transactions} />
                <div className="charts-container">
                    <div className="chart-container">
                        <ExpensesChart data={expensesByCategory} />
                    </div>
                    <div className="chart-container">
                        <IncomeChart data={incomeByType} />
                    </div>
                </div>
                <div className="combined-chart-container">
                    <CombinedChart expensesData={expensesByCategory} incomeData={incomeByType} />
                </div>
                <div className="table-container">
                    <TransactionsTable transactions={transactions} />
                </div>
            </div>
            <AddTransactionForm
                show={showAddForm}
                onHide={() => setShowAddForm(false)}
                onAdd={handleAddTransaction}
            />
        </div>
    );
};

export default App;
