// Chart.jsx
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler, // <-- Add this line
} from 'chart.js';

import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler // <-- Add this line
);

// Enhanced chart components with better styling
export const BarChart = ({ data, className = "", height = 300 }) => {
    const chartData = {
        labels: data.map(d => d.label),
        datasets: [
            {
                label: "Clicks",
                data: data.map(d => d.value),
                backgroundColor: (ctx) => {
                    const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, '#3b82f6');
                    gradient.addColorStop(1, '#1e40af');
                    return gradient;
                },
                borderColor: '#3b82f6',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
                hoverBackgroundColor: '#2563eb',
                hoverBorderColor: '#1d4ed8',
                hoverBorderWidth: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                titleColor: '#f9fafb',
                bodyColor: '#f9fafb',
                borderColor: '#374151',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: false,
                titleFont: {
                    size: 14,
                    weight: 'bold',
                },
                bodyFont: {
                    size: 13,
                },
                padding: 12,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#9ca3af',
                    font: {
                        size: 12,
                    },
                },
                border: {
                    display: false,
                },
            },
            y: {
                grid: {
                    color: 'rgba(156, 163, 175, 0.1)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#9ca3af',
                    font: {
                        size: 12,
                    },
                },
                border: {
                    display: false,
                },
            },
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuart',
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
    };

    return <Bar data={chartData} options={options} className={className} height={height} />;
};

export const LineChart = ({ data, className = "", height = 300 }) => {
    const chartData = {
        labels: data.map(d => d.label),
        datasets: [
            {
                label: "Clicks",
                data: data.map(d => d.value),
                borderColor: '#10b981',
                backgroundColor: (ctx) => {
                    const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
                    gradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)');
                    return gradient;
                },
                tension: 0.4,
                fill: true,
                borderWidth: 3,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#059669',
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                titleColor: '#f9fafb',
                bodyColor: '#f9fafb',
                borderColor: '#374151',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: false,
                titleFont: {
                    size: 14,
                    weight: 'bold',
                },
                bodyFont: {
                    size: 13,
                },
                padding: 12,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#9ca3af',
                    font: {
                        size: 12,
                    },
                },
                border: {
                    display: false,
                },
            },
            y: {
                grid: {
                    color: 'rgba(156, 163, 175, 0.1)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#9ca3af',
                    font: {
                        size: 12,
                    },
                },
                border: {
                    display: false,
                },
            },
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutQuart',
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
    };

    return <Line data={chartData} options={options} className={className} height={height} />;
};

export const DonutChart = ({ data, className = "", size = 250 }) => {
    const chartData = {
        labels: data.map(d => d.label),
        datasets: [
            {
                data: data.map(d => d.value),
                backgroundColor: [
                    '#3b82f6', // Blue
                    '#10b981', // Green
                    '#f59e0b', // Yellow
                    '#ef4444', // Red
                    '#8b5cf6', // Purple
                    '#f97316', // Orange
                    '#06b6d4', // Cyan
                    '#84cc16', // Lime
                    '#ec4899', // Pink
                    '#6366f1', // Indigo
                ],
                borderColor: '#1f2937',
                borderWidth: 2,
                hoverBorderColor: '#ffffff',
                hoverBorderWidth: 3,
                hoverOffset: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#9ca3af',
                    font: {
                        size: 12,
                    },
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle',
                },
            },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                titleColor: '#f9fafb',
                bodyColor: '#f9fafb',
                borderColor: '#374151',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: true,
                titleFont: {
                    size: 14,
                    weight: 'bold',
                },
                bodyFont: {
                    size: 13,
                },
                padding: 12,
                callbacks: {
                    label: function (context) {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((context.parsed / total) * 100).toFixed(1);
                        return `${context.label}: ${context.parsed} (${percentage}%)`;
                    }
                }
            },
        },
        animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1200,
            easing: 'easeInOutQuart',
        },
        cutout: '60%',
        radius: '90%',
        interaction: {
            intersect: false,
        },
    };

    return <Doughnut data={chartData} options={options} className={className} width={size} height={size} />;
};
