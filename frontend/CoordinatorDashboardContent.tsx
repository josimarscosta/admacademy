import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { UniformLogo } from '@/components/UniformLogo';

interface CoordinatorDashboardProps {
  courseStats: {
    name: string;
    studentsCount: number;
    averageScore: number;
    completionRate: number;
  }[];
  performanceByArea: {
    area: string;
    score: number;
    target: number;
  }[];
  participationData: {
    name: string;
    value: number;
  }[];
  topStudents: {
    id: string;
    name: string;
    avatar?: string;
    score: number;
    completedModules: number;
    level: number;
  }[];
  riskStudents: {
    id: string;
    name: string;
    avatar?: string;
    lastActivity: string;
    completionRate: number;
    riskLevel: 'baixo' | 'médio' | 'alto';
  }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

const CoordinatorDashboardContent: React.FC<CoordinatorDashboardProps> = ({
  courseStats,
  performanceByArea,
  participationData,
  topStudents,
  riskStudents
}) => {
  return (
    <div className="space-y-6">
      {/* Header com logo da Unifor */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard do Coordenador</h1>
        <UniformLogo className="h-10" />
      </div>
      
      {/* Estatísticas dos Cursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {courseStats.map((course, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{course.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Alunos</span>
                  <span className="font-medium">{course.studentsCount}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Média</span>
                    <span className="font-medium">{course.averageScore}%</span>
                  </div>
                  <Progress value={course.averageScore} className="h-1" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Conclusão</span>
                    <span className="font-medium">{course.completionRate}%</span>
                  </div>
                  <Progress value={course.completionRate} className="h-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Gráficos de Desempenho */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Análise de Desempenho por Área</CardTitle>
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
                  data={performanceByArea}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="area" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" name="Pontuação Atual" fill="#0088FE" />
                  <Bar dataKey="target" name="Meta" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="pizza" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={participationData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {participationData.map((entry, index) => (
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
      
      {/* Alunos Destaque e Alunos em Risco */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alunos Destaque */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Alunos Destaque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Nível {student.level} • {student.completedModules} módulos
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {student.score}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Alunos em Risco */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Alunos em Risco</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Última atividade: {student.lastActivity}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${student.riskLevel === 'alto' ? 'bg-red-100 text-red-800' : 
                        student.riskLevel === 'médio' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'}
                    `}
                  >
                    Risco {student.riskLevel}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoordinatorDashboardContent;
