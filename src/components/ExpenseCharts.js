import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseCharts = () => {
    const [expenses, setExpenses] = useState([]);
    const [balance, setBalance] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExpenseData = async () => {
            const token = localStorage.getItem('jwt');

            if (!token) {
                setError('Ошибка: токен не найден.');
                setIsLoading(false);
                return;
            }

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;

            try {
                const expensesResponse = await axios.get(`http://localhost:8081/operations/all?user_id=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setExpenses(expensesResponse.data);

                const balanceResponse = await axios.get(`http://localhost:8081/wallets/find/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBalance(balanceResponse.data.balance);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
                setError('Не удалось загрузить данные.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchExpenseData();
    }, []);

    const categoryData = {};
    expenses.forEach(expense => {
        categoryData[expense.category] = (categoryData[expense.category] || 0) + expense.amount;
    });

    const totalExpenses = expenses.reduce((acc, tx) => acc + tx.amount, 0);

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

    const balanceChartData = {
        labels: ['Расходы', 'Остаток'],
        datasets: [
            {
                data: [totalExpenses, balance - totalExpenses],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
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
            <div className="pie-chart">
                <h4>Распределение расходов по категориям</h4>
                <Pie data={categoryChartData} options={options} />
            </div>
            <div className="pie-chart">
                <h4>Расходы относительно текущего баланса</h4>
                <Pie data={balanceChartData} options={options} />
            </div>
        </div>
    );
};

export default ExpenseCharts;
