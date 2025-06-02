import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Award, BookOpen, Clock, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TrailCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  modules: number;
  estimatedTime: string;
  difficulty: 'iniciante' | 'intermediário' | 'avançado';
  tags: string[];
  imageUrl?: string;
  isRecommended?: boolean;
}

const TrailCard: React.FC<TrailCardProps> = ({
  id,
  title,
  description,
  progress,
  modules,
  estimatedTime,
  difficulty,
  tags,
  imageUrl,
  isRecommended = false,
}) => {
  // Mapear dificuldade para cores
  const difficultyColor = {
    'iniciante': 'bg-green-100 text-green-800',
    'intermediário': 'bg-yellow-100 text-yellow-800',
    'avançado': 'bg-red-100 text-red-800',
  }[difficulty];

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${isRecommended ? 'border-primary border-2' : ''}`}>
      {imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {isRecommended && (
            <div className="absolute top-2 right-2">
              <Badge variant="default" className="bg-primary text-white">
                <Award className="h-3 w-3 mr-1" /> Recomendado
              </Badge>
            </div>
          )}
        </div>
      )}
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <Badge className={difficultyColor}>{difficulty}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progresso</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-muted/50">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{modules} módulos</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{estimatedTime}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2">
        {progress > 0 && progress < 100 ? (
          <Button asChild variant="default">
            <Link to={`/student/trails/${id}`}>
              Continuar <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        ) : progress === 100 ? (
          <Button asChild variant="outline">
            <Link to={`/student/trails/${id}`}>
              Revisar <BarChart2 className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        ) : (
          <Button asChild variant="default">
            <Link to={`/student/trails/${id}`}>
              Iniciar <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TrailCard;
