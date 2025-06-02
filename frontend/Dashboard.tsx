import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

// Componentes
import TrailCard from '@/components/TrailCard';
import SimulationCard from '@/components/SimulationCard';
import StudentDashboardContent from '@/components/StudentDashboardContent';
import AchievementCard from '@/components/AchievementCard';
import AIAssistant from '@/components/AIAssistant';

// UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UniformLogo } from '@/components/UniformLogo';

const StudentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [trails, setTrails] = useState([]);
  const [simulations, setSimulations] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [assistantMessages, setAssistantMessages] = useState([]);
  const [assistantRecommendations, setAssistantRecommendations] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Buscar dados do usuário
        const userResponse = await axios.get('/api/users/profile');
        setUserData(userResponse.data);
        
        // Buscar trilhas recomendadas
        const trailsResponse = await axios.get('/api/trails/recommended');
        setTrails(trailsResponse.data);
        
        // Buscar simulados disponíveis
        const simulationsResponse = await axios.get('/api/simulations/available');
        setSimulations(simulationsResponse.data);
        
        // Buscar conquistas do usuário
        const achievementsResponse = await axios.get('/api/achievements/user');
        setAchievements(achievementsResponse.data);
        
        // Buscar recomendações personalizadas
        const recommendationsResponse = await axios.get('/api/ai/recommendations');
        setRecommendations(recommendationsResponse.data);
        
        // Buscar histórico de mensagens do assistente
        const messagesResponse = await axios.get('/api/ai/assistant/history');
        setAssistantMessages(messagesResponse.data.messages || []);
        setAssistantRecommendations(messagesResponse.data.suggestions || []);
        
        // Gerar novas recomendações baseadas em IA
        await axios.post('/api/ai/generate-recommendations');
        
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
        toast.error('Não foi possível carregar todos os dados. Tente novamente.');
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  const handleSendMessage = async (message) => {
    try {
      // Adicionar mensagem do usuário ao estado local
      const userMessage = {
        id: Date.now().toString(),
        sender: 'user',
        content: message,
        timestamp: new Date().toISOString()
      };
      
      setAssistantMessages(prev => [...prev, userMessage]);
      
      // Enviar mensagem para o backend
      const response = await axios.post('/api/ai/assistant/query', { query: message });
      
      // Adicionar resposta do assistente ao estado local
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        content: response.data.answer,
        timestamp: new Date().toISOString()
      };
      
      setAssistantMessages(prev => [...prev, assistantMessage]);
      
      // Atualizar sugestões
      if (response.data.suggestions) {
        setAssistantRecommendations(response.data.suggestions.map((content, i) => ({
          id: `sugg-${i}`,
          type: 'dica',
          content
        })));
      }
      
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast.error('Não foi possível processar sua mensagem. Tente novamente.');
    }
  };
  
  // Preparar dados para os componentes
  const dashboardData = userData ? {
    studentName: userData.name,
    level: userData.level || 1,
    points: userData.points || 0,
    nextLevelPoints: ((userData.level || 1) + 1) * 100,
    performanceData: userData.performanceData || [],
    engagementData: userData.engagementData || [],
    streak: userData.streak || 0,
    completedModules: userData.completedModules || 0,
    totalModules: userData.totalModules || 0,
    completedSimulations: userData.completedSimulations || 0,
    achievements: achievements.filter(a => a.completed).slice(0, 3).map(a => ({
      id: a._id,
      name: a.name,
      icon: a.icon,
      earnedAt: a.earnedAt
    })),
    recommendations: recommendations.slice(0, 3).map(r => ({
      id: r._id,
      title: r.contentDetails?.title || 'Conteúdo recomendado',
      type: r.type,
      priority: r.priority
    }))
  } : null;

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header com logo da Unifor */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard do Estudante</h1>
        <UniformLogo className="h-10" />
      </div>
      
      {loading ? (
        // Esqueleto de carregamento
        <div className="space-y-6">
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-[200px] rounded-lg" />
            <Skeleton className="h-[200px] rounded-lg" />
            <Skeleton className="h-[200px] rounded-lg" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna principal (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dashboard do estudante */}
            {dashboardData && (
              <StudentDashboardContent {...dashboardData} />
            )}
            
            {/* Tabs para Trilhas e Simulados */}
            <Tabs defaultValue="trilhas">
              <TabsList className="mb-4">
                <TabsTrigger value="trilhas">Trilhas de Aprendizado</TabsTrigger>
                <TabsTrigger value="simulados">Simulados</TabsTrigger>
                <TabsTrigger value="conquistas">Conquistas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="trilhas">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trails.map(trail => (
                    <TrailCard 
                      key={trail._id}
                      id={trail._id}
                      title={trail.title}
                      description={trail.description}
                      progress={trail.progress || 0}
                      modules={trail.moduleCount || 0}
                      estimatedTime={trail.estimatedTime || '2h'}
                      difficulty={trail.difficulty || 'intermediário'}
                      tags={trail.tags || []}
                      imageUrl={trail.imageUrl}
                      isRecommended={trail.isRecommended}
                    />
                  ))}
                </div>
                
                <div className="mt-4 flex justify-center">
                  <Button onClick={() => navigate('/student/trails')}>
                    Ver todas as trilhas
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="simulados">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {simulations.map(sim => (
                    <SimulationCard 
                      key={sim._id}
                      id={sim._id}
                      title={sim.title}
                      description={sim.description}
                      questionCount={sim.questionCount || 0}
                      timeLimit={sim.timeLimit || 60}
                      difficulty={sim.difficulty || 'médio'}
                      categories={sim.categories || []}
                      completed={sim.completed}
                      score={sim.score}
                      isRecommended={sim.isRecommended}
                      dueDate={sim.dueDate}
                    />
                  ))}
                </div>
                
                <div className="mt-4 flex justify-center">
                  <Button onClick={() => navigate('/student/simulations')}>
                    Ver todos os simulados
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="conquistas">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map(achievement => (
                    <AchievementCard 
                      key={achievement._id}
                      id={achievement._id}
                      name={achievement.name}
                      description={achievement.description}
                      icon={achievement.icon}
                      category={achievement.category}
                      points={achievement.points}
                      progress={achievement.progress || 0}
                      completed={achievement.completed || false}
                      earnedAt={achievement.earnedAt}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Coluna lateral (1/3) */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardContent className="p-0 h-full">
                <AIAssistant 
                  userName={userData?.name || 'Estudante'}
                  userAvatar={userData?.avatar}
                  onSendMessage={handleSendMessage}
                  recommendations={assistantRecommendations.map((rec, i) => ({
                    id: typeof rec === 'string' ? `rec-${i}` : rec.id,
                    type: typeof rec === 'string' ? 'dica' : rec.type,
                    content: typeof rec === 'string' ? rec : rec.content
                  }))}
                  recentMessages={assistantMessages}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
