import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseCharts = ({ balance, expenses }) => {
    const filteredExpenses = expenses.filter(tx => tx.type === 'Расход');

    const categoryData = {};
    filteredExpenses.forEach(expense => {
        categoryData[expense.category] = (categoryData[expense.category] || 0) + expense.amount;
    });

    const data = {
        labels: Object.keys(categoryData),
        datasets: [
            {
                data: Object.values(categoryData),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    const totalExpenses = filteredExpenses.reduce((acc, tx) => acc + tx.amount, 0);

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: 'white', // Цвет текста легенды
                },
            },
        },
    };

    return (
        <div className="expense-charts-container">
            <div className="pie-chart">
                <h4>Распределение расходов по категориям</h4>
                <Pie data={data} options={options} />
            </div>
            <div className="pie-chart">
                <h4>Расходы относительно текущего баланса</h4>
                <Pie
                    data={{
                        labels: ['Расходы', 'Остаток'],
                        datasets: [
                            {
                                data: [totalExpenses, balance - totalExpenses],
                                backgroundColor: ['#FF6384', '#36A2EB'],
                                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
                            },
                        ],
                    }}
                    options={options}
                />
            </div>
        </div>
    );
};

export default ExpenseCharts;
