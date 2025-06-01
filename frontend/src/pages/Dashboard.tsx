import React, { useState, useEffect } from 'react';
import '../components/styles.css';
import BarChart from '../components/dashboard/BarChart';
import PieChart from '../components/dashboard/PieChart';
import DashboardMetrics from '../components/dashboard/DashboardMetrics';
import Achievements from '../components/gamification/Achievements';
import AIAssistant from '../components/ai/AIAssistant';
import ProgressBar from '../components/ui/ProgressBar';

const Dashboard: React.FC = () => {
  const [showAssistant, setShowAssistant] = useState(false);
  
  // Dados simulados para o dashboard
  const metrics = [
    { title: 'Trilhas Concluídas', value: '3/8', icon: '🎯', color: '#1e40af' },
    { title: 'Simulados Realizados', value: '12', icon: '📝', color: '#3b82f6' },
    { title: 'Pontuação Total', value: '1.250', icon: '⭐', color: '#f59e0b' },
    { title: 'Nível Atual', value: '4', icon: '🏆', color: '#10b981' }
  ];
  
  const achievements = [
    {
      id: '1',
      title: 'Primeiro Login',
      description: 'Bem-vindo à plataforma!',
      icon: '🎉',
      unlocked: true,
      date: '15/05/2025'
    },
    {
      id: '2',
      title: 'Maratonista',
      description: 'Complete 5 simulados',
      icon: '🏃',
      unlocked: true,
      date: '20/05/2025'
    },
    {
      id: '3',
      title: 'Nota Máxima',
      description: 'Obtenha 100% em um simulado',
      icon: '🏆',
      unlocked: false
    },
    {
      id: '4',
      title: 'Explorador',
      description: 'Acesse todas as trilhas',
      icon: '🧭',
      unlocked: true,
      date: '18/05/2025'
    }
  ];
  
  // Dados para os gráficos
  const barChartData = {
    labels: ['Formação Geral', 'Adm. Estratégica', 'Finanças', 'Marketing', 'Gestão de Pessoas'],
    datasets: [
      {
        label: 'Progresso (%)',
        data: [85, 65, 45, 30, 15],
        backgroundColor: '#3b82f6'
      }
    ]
  };
  
  const pieChartData = {
    title: 'Desempenho por Área',
    labels: ['Formação Geral', 'Adm. Estratégica', 'Finanças', 'Marketing', 'Gestão de Pessoas'],
    data: [85, 65, 45, 30, 15]
  };
  
  // Simular carregamento de dados
  useEffect(() => {
    // Aqui seria feita a chamada à API para buscar os dados reais
    console.log('Carregando dados do dashboard...');
  }, []);
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard Adm Academy</h1>
        <img 
          src="https://www.unifor.br/documents/20143/3597199/logo-unifor-azul.png" 
          alt="Logo Unifor" 
          className="dashboard-logo" 
        />
      </div>
      
      <DashboardMetrics metrics={metrics} />
      
      <div className="dashboard-section">
        <h2>Seu Progresso Geral</h2>
        <ProgressBar progress={65} height={20} />
      </div>
      
      <div className="dashboard-charts">
        <div className="chart-container">
          <BarChart 
            title="Progresso nas Trilhas" 
            labels={barChartData.labels} 
            datasets={barChartData.datasets} 
          />
        </div>
        <div className="chart-container">
          <PieChart 
            title={pieChartData.title}
            labels={pieChartData.labels}
            data={pieChartData.data}
          />
        </div>
      </div>
      
      <Achievements achievements={achievements} />
      
      <div className="dashboard-actions">
        <button 
          className="btn-primary"
          onClick={() => setShowAssistant(!showAssistant)}
        >
          {showAssistant ? 'Fechar Assistente' : 'Abrir Assistente Virtual'}
        </button>
      </div>
      
      {showAssistant && <AIAssistant />}
    </div>
  );
};

export default Dashboard;
