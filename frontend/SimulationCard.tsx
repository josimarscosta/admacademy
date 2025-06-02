import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, BarChart2, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SimulationCardProps {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  timeLimit: number; // em minutos
  difficulty: 'fácil' | 'médio' | 'difícil';
  categories: string[];
  completed?: boolean;
  score?: number;
  isRecommended?: boolean;
  dueDate?: string;
}

const SimulationCard: React.FC<SimulationCardProps> = ({
  id,
  title,
  description,
  questionCount,
  timeLimit,
  difficulty,
  categories,
  completed = false,
  score,
  isRecommended = false,
  dueDate,
}) => {
  // Mapear dificuldade para cores
  const difficultyColor = {
    'fácil': 'bg-green-100 text-green-800',
    'médio': 'bg-yellow-100 text-yellow-800',
    'difícil': 'bg-red-100 text-red-800',
  }[difficulty];

  // Verificar se está próximo da data limite
  const isUrgent = dueDate ? new Date(dueDate).getTime() - new Date().getTime() < 3 * 24 * 60 * 60 * 1000 : false;

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${isRecommended ? 'border-primary border-2' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge className={difficultyColor}>{difficulty}</Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              <span>{questionCount} questões</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{timeLimit} minutos</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {categories.map((category, index) => (
              <Badge key={index} variant="outline" className="bg-muted/50">
                {category}
              </Badge>
            ))}
          </div>
          
          {completed && score !== undefined && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground mb-1">Pontuação</p>
              <div className="flex items-center">
                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${score >= 70 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${score}%` }}
                  />
                </div>
                <span className="ml-2 text-sm font-medium">
                  {score}%
                </span>
              </div>
            </div>
          )}
          
          {dueDate && !completed && (
            <div className="flex items-center mt-2">
              {isUrgent && <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />}
              <span className={`text-sm ${isUrgent ? 'text-yellow-500 font-medium' : 'text-muted-foreground'}`}>
                {isUrgent ? 'Prazo próximo: ' : 'Prazo: '}
                {new Date(dueDate).toLocaleDateString('pt-BR')}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2">
        {completed ? (
          <div className="flex gap-2 w-full">
            <Button asChild variant="outline" className="flex-1">
              <Link to={`/student/simulations/${id}/results`}>
                Ver Resultados <BarChart2 className="h-4 w-4 ml-1" />
              </Link>
            </Button>
            <Button asChild variant="default" className="flex-1">
              <Link to={`/student/simulations/${id}/start`}>
                Refazer
              </Link>
            </Button>
          </div>
        ) : (
          <Button asChild variant="default" className="w-full">
            <Link to={`/student/simulations/${id}/start`}>
              Iniciar Simulado
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SimulationCard;
