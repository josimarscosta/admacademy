import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  title: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor?: string;
    borderWidth?: number;
  }[];
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({ 
  title, 
  labels, 
  datasets, 
  height = 300 
}) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
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
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    labels,
    datasets: datasets.map(dataset => ({
      ...dataset,
      borderWidth: dataset.borderWidth || 1,
      borderColor: dataset.borderColor || dataset.backgroundColor,
    })),
  };

  return (
    <div style={{ height: `${height}px`, width: '100%' }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
