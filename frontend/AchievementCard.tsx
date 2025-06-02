import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, Trophy, Star, Target, Zap } from 'lucide-react';

interface AchievementCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  points: number;
  progress: number;
  completed: boolean;
  earnedAt?: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  id,
  name,
  description,
  icon,
  category,
  points,
  progress,
  completed,
  earnedAt,
}) => {
  // Mapear categoria para ícones e cores
  const categoryConfig = {
    'conhecimento': {
      icon: <Book className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-800',
    },
    'participação': {
      icon: <Users className="h-5 w-5" />,
      color: 'bg-green-100 text-green-800',
    },
    'desempenho': {
      icon: <Target className="h-5 w-5" />,
      color: 'bg-purple-100 text-purple-800',
    },
    'colaboração': {
      icon: <Heart className="h-5 w-5" />,
      color: 'bg-pink-100 text-pink-800',
    },
    'consistência': {
      icon: <Zap className="h-5 w-5" />,
      color: 'bg-yellow-100 text-yellow-800',
    },
  }[category] || {
    icon: <Award className="h-5 w-5" />,
    color: 'bg-gray-100 text-gray-800',
  };

  // Renderizar ícone dinâmico baseado na string
  const renderIcon = () => {
    switch (icon) {
      case 'trophy':
        return <Trophy className="h-10 w-10" />;
      case 'star':
        return <Star className="h-10 w-10" />;
      case 'target':
        return <Target className="h-10 w-10" />;
      case 'zap':
        return <Zap className="h-10 w-10" />;
      default:
        return <Award className="h-10 w-10" />;
    }
  };

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${completed ? 'border-primary' : 'opacity-75'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{name}</CardTitle>
          <Badge className={categoryConfig.color}>
            {categoryConfig.icon}
            <span className="ml-1">{category}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-center py-2">
            <div className={`rounded-full p-4 ${completed ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
              {renderIcon()}
            </div>
          </div>
          
          <p className="text-sm text-center">{description}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Award className="h-4 w-4 text-primary mr-1" />
              <span className="text-sm font-medium">{points} pontos</span>
            </div>
            
            {completed && earnedAt && (
              <span className="text-xs text-muted-foreground">
                Conquistado em {new Date(earnedAt).toLocaleDateString('pt-BR')}
              </span>
            )}
          </div>
          
          {!completed && progress > 0 && (
            <Button variant="outline" size="sm" className="w-full">
              Ver detalhes
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Importações adicionais necessárias
import { Book, Users, Heart } from 'lucide-react';

export default AchievementCard;
