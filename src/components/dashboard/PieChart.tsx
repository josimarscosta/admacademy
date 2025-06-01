import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// Registrar componentes do Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

interface PieChartProps {
  title: string;
  labels: string[];
  data: number[];
  backgroundColor?: string[];
  borderColor?: string[];
  height?: number;
}

const PieChart: React.FC<PieChartProps> = ({ 
  title, 
  labels, 
  data, 
  backgroundColor = [
    '#1e40af', // Azul Unifor
    '#3b82f6',
    '#60a5fa',
    '#93c5fd',
    '#bfdbfe',
    '#f59e0b', // Laranja Unifor
    '#fbbf24',
    '#fcd34d'
  ],
  borderColor = ['#ffffff'],
  height = 300 
}) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        color: '#1e40af',
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height: `${height}px`, width: '100%' }}>
      <Pie options={options} data={chartData} />
    </div>
  );
};

export default PieChart;
