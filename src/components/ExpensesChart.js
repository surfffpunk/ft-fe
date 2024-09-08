// src/components/ExpensesChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesChart = ({ data }) => {
    const colors = {
        'Продукты': '#FF6384',
        'Аренда': '#36A2EB',
        'Коммунальные услуги': '#FFCE56',
        'Прочее': '#4BC0C0',
    };

    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                data: Object.values(data),
                backgroundColor: Object.keys(data).map(category => colors[category] || '#CCCCCC'),
                hoverBackgroundColor: Object.keys(data).map(category => colors[category] || '#CCCCCC'),
            },
        ],
    };

    return (
        <div className="chart-container mt-4">
            <h3>Структура расходов</h3>
            <Doughnut data={chartData} width={300} height={300} />
        </div>
    );
};

export default ExpensesChart;
