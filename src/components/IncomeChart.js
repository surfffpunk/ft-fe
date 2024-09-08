// src/components/IncomeChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeChart = ({ data }) => {
    const colors = {
        'Зарплата': '#4BC0C0',
        'Дополнительный доход': '#FFCE56',
        'Инвестиции': '#FF6384',
    };

    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                data: Object.values(data),
                backgroundColor: Object.keys(data).map(type => colors[type] || '#CCCCCC'),
                hoverBackgroundColor: Object.keys(data).map(type => colors[type] || '#CCCCCC'),
            },
        ],
    };

    return (
        <div className="chart-container mt-4">
            <h3>Структура доходов</h3>
            <Doughnut data={chartData} width={300} height={300} />
        </div>
    );
};

export default IncomeChart;
