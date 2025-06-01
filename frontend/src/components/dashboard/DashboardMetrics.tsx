import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: string;
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon,
  color = '#1e40af' 
}) => {
  return (
    <div className="metric-card" style={{ borderTop: `4px solid ${color}` }}>
      <div className="metric-icon">{icon}</div>
      <div className="metric-content">
        <h3>{title}</h3>
        <div className="metric-value">{value}</div>
      </div>
    </div>
  );
};

interface DashboardMetricsProps {
  metrics: {
    title: string;
    value: string | number;
    icon: string;
    color?: string;
  }[];
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ metrics }) => {
  return (
    <div className="dashboard-metrics">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
          color={metric.color}
        />
      ))}
    </div>
  );
};

export default DashboardMetrics;
