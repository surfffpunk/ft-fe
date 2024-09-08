// src/components/CombinedChart.js
import React from 'react';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const CombinedChart = ({ expensesData, incomeData }) => {
    const labels = [...new Set([...Object.keys(expensesData), ...Object.keys(incomeData)])];

    const combinedData = {
        labels: labels,
        datasets: [
            {
                label: 'Расходы',
                data: labels.map(label => expensesData[label] || 0),
                borderColor: '#FF6384',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                pointBorderColor: '#FF6384',
                pointBackgroundColor: '#FF6384',
            },
            {
                label: 'Доходы',
                data: labels.map(label => incomeData[label] || 0),
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
                pointBorderColor: '#36A2EB',
                pointBackgroundColor: '#36A2EB',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Категории',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Сумма',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="chart-container mt-4">
            <h3>Объединенная статистика по доходам и расходам</h3>
            <Line data={combinedData} options={options} />
        </div>
    );
};

export default CombinedChart;
