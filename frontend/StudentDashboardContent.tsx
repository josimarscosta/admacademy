import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface PerformanceData {
  area: string;
  pontuacao: number;
  media: number;
}

interface EngagementData {
  name: string;
  value: number;
}

interface StudentDashboardProps {
  studentName: string;
  level: number;
  points: number;
  nextLevelPoints: number;
  performanceData: PerformanceData[];
  engagementData: EngagementData[];
  streak: number;
  completedModules: number;
  totalModules: number;
  completedSimulations: number;
  achievements: {
    id: string;
    name: string;
    icon: string;
    earnedAt: string;
  }[];
  recommendations: {
    id: string;
    title: string;
    type: string;
    priority: number;
  }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

const StudentDashboardContent: React.FC<StudentDashboardProps> = ({
  studentName,
  level,
  points,
  nextLevelPoints,
  performanceData,
  engagementData,
  streak,
  completedModules,
  totalModules,
  completedSimulations,
  achievements,
  recommendations
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Cartão de Progresso */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-xl">Seu Progresso</CardTitle>
            <CardDescription>Acompanhe seu desenvolvimento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Nível</p>
                  <p className="text-2xl font-bold">{level}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pontos</p>
                  <p className="text-2xl font-bold">{points} / {nextLevelPoints}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sequência</p>
                  <p className="text-2xl font-bold">{streak} dias</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Módulos Concluídos</p>
                <div className="flex items-center">
                  <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${(completedModules / totalModules) * 100}%` }}
                    />
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {completedModules}/{totalModules}
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Simulados Realizados</p>
                <p className="text-xl font-semibold">{completedSimulations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Cartão de Conquistas Recentes */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-xl">Conquistas Recentes</CardTitle>
            <CardDescription>Suas últimas realizações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.length > 0 ? (
                achievements.slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg" role="img" aria-label={achievement.name}>
                        {achievement.icon}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{achievement.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Conquistado em {new Date(achievement.earnedAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Você ainda não conquistou nenhuma medalha. Continue estudando!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Gráficos de Desempenho */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Análise de Desempenho</CardTitle>
          <CardDescription>Visualize seu desempenho por área</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="barras">
            <TabsList className="mb-4">
              <TabsTrigger value="barras">Gráfico de Barras</TabsTrigger>
              <TabsTrigger value="pizza">Gráfico de Pizza</TabsTrigger>
            </TabsList>
            
            <TabsContent value="barras" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="area" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pontuacao" name="Sua pontuação" fill="#0088FE" />
                  <Bar dataKey="media" name="Média da turma" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="pizza" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={engagementData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Recomendações Personalizadas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recomendações Personalizadas</CardTitle>
          <CardDescription>Sugestões baseadas no seu desempenho</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.length > 0 ? (
              recommendations.map((rec) => (
                <div key={rec.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${rec.priority > 7 ? 'bg-red-500' : rec.priority > 4 ? 'bg-yellow-500' : 'bg-green-500'}`} />
                    <div>
                      <p className="font-medium">{rec.title}</p>
                      <p className="text-sm text-muted-foreground">{rec.type}</p>
                    </div>
                  </div>
                  <button className="text-primary hover:underline text-sm font-medium">
                    Ver detalhes
                  </button>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Nenhuma recomendação disponível no momento.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboardContent;
