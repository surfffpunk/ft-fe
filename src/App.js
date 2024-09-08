// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TransactionsTable from './components/TransactionsTable';
import ExpensesChart from './components/ExpensesChart';
import IncomeChart from './components/IncomeChart';
import CombinedChart from './components/CombinedChart';
import AddTransactionForm from './components/AddTransactionForm';
import RegistrationPage from './pages/RegistrationPage';
import ProfilePage from './pages/ProfilePage';
import { getBalance, getTransactions, addTransaction as addTransactionAPI } from './services/api';

const App = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [expensesByCategory, setExpensesByCategory] = useState({});
    const [incomeByType, setIncomeByType] = useState({});
    const [showAddForm, setShowAddForm] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        if (isRegistered) {
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
        }
    }, [isRegistered]);

    const handleAddTransaction = (transaction) => {
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
        <Router>
            <div>
                {isRegistered && <Header onAddTransaction={() => setShowAddForm(true)} />}
                <Routes>
                    <Route
                        path="/"
                        element={isRegistered ? (
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
                                <AddTransactionForm
                                    show={showAddForm}
                                    onHide={() => setShowAddForm(false)}
                                    onAdd={handleAddTransaction}
                                />
                            </div>
                        ) : (
                            <Navigate to="/register" />
                        )}
                    />
                    <Route path="/register" element={<RegistrationPage setIsRegistered={setIsRegistered} />} />
                    <Route path="/profile" element={isRegistered ? <ProfilePage /> : <Navigate to="/register" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
