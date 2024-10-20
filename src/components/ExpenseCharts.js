import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import '../assets/ExpenseCharts.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseCharts = () => {
    const [expenses, setExpenses] = useState([]);
    const [balance, setBalance] = useState(0);
    const [wallets, setWallets] = useState([]);
    const [selectedWalletId, setSelectedWalletId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUserIdFromToken = () => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            setError('Ошибка: токен не найден.');
            return null;
        }
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.sub;
        } catch (error) {
            setError('Ошибка при декодировании токена.');
            return null;
        }
    };

    useEffect(() => {
        const fetchWallets = async () => {
            const userId = getUserIdFromToken();
            if (!userId) return;

            try {
                const walletsResponse = await axios.get(`http://localhost:8081/users/find/wallets`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    },
                });

                if (walletsResponse.data.length > 0) {
                    setWallets(walletsResponse.data);
                    setSelectedWalletId(walletsResponse.data[0].id);
                } else {
                    setError('Не удалось загрузить данные о кошельках.');
                }
            } catch (error) {
                console.error('Ошибка при получении кошельков:', error);
                setError('Не удалось загрузить данные о кошельках.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchWallets();
    }, []);

    useEffect(() => {
        const fetchExpensesAndBalance = async (walletId) => {
            if (!walletId) {
                setError('Кошелек не выбран.');
                return;
            }

            try {
                const expensesResponse = await axios.get(`http://localhost:8081/wallets/find/${walletId}/operations`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    },
                });

                const expensesData = expensesResponse.data.filter(operation => !operation.isIncome);
                setExpenses(expensesData);

                const walletResponse = await axios.get(`http://localhost:8081/wallets/find/${walletId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    },
                });

                if (walletResponse.data) {
                    setBalance(walletResponse.data.balance);
                }

            } catch (error) {
                setError('Не удалось загрузить данные о кошельке.');
            }
        };

        if (selectedWalletId) {
            fetchExpensesAndBalance(selectedWalletId);
        }
    }, [selectedWalletId]);

    const categoryData = {};
    expenses.forEach(expense => {
        categoryData[expense.categoryName] = (categoryData[expense.categoryName] || 0) + expense.amount;
    });

    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const remainingBalance = balance;

    const balanceChartData = {
        labels: ['Расходы', 'Остаток'],
        datasets: [
            {
                data: [totalExpenses, remainingBalance >= 0 ? remainingBalance : 0],
                backgroundColor: ['#1a1a1a', '#4caf50'],
                hoverBackgroundColor: ['#1a1a1a', '#4caf50'],
            },
        ],
    };

    const categoryChartData = {
        labels: Object.keys(categoryData),
        datasets: [
            {
                data: Object.values(categoryData),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                },
            },
        },
    };

    if (isLoading) return <div>Загрузка данных...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="expense-charts-container">
            <div className="wallet-select">
                <label>
                    Кошелек:
                    <select
                        value={selectedWalletId || ''}
                        onChange={(e) => setSelectedWalletId(e.target.value)} // Важный момент: сохраняем ID кошелька
                    >
                        {wallets.map(wallet => (
                            <option key={wallet.id} value={wallet.id}>
                                {wallet.name} {}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="charts-wrapper">
                <div className="pie-chart">
                    <h4>Распределение расходов по категориям</h4>
                    <Pie data={categoryChartData} options={options}/>
                </div>
                <div className="pie-chart">
                    <h4>Расходы относительно текущего баланса</h4>
                    <Pie data={balanceChartData} options={options}/>
                </div>
            </div>
        </div>
    );
};

export default ExpenseCharts;
