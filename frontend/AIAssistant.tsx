import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, ThumbsUp, Lightbulb } from 'lucide-react';

interface AIAssistantProps {
  userName: string;
  userAvatar?: string;
  onSendMessage: (message: string) => void;
  recommendations: {
    id: string;
    type: 'conteúdo' | 'exercício' | 'dica' | 'motivação';
    content: string;
  }[];
  recentMessages: {
    id: string;
    sender: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({
  userName,
  userAvatar,
  onSendMessage,
  recommendations,
  recentMessages
}) => {
  const [message, setMessage] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      // Simular resposta do assistente
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Renderizar ícone baseado no tipo de recomendação
  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'conteúdo':
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'exercício':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'dica':
        return <Lightbulb className="h-4 w-4 text-yellow-500" />;
      case 'motivação':
        return <ThumbsUp className="h-4 w-4 text-purple-500" />;
      default:
        return <Lightbulb className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-xl flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/assets/assistant-avatar.png" alt="Assistente" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          Assistente de Estudos
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Área de mensagens */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {recentMessages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs text-right mt-1 opacity-70">
                  {new Date(msg.timestamp).toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></div>
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-100"></div>
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Recomendações */}
        {recommendations.length > 0 && (
          <div className="p-4 border-t">
            <h4 className="text-sm font-medium mb-2">Recomendações Personalizadas</h4>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {recommendations.map((rec) => (
                <Button 
                  key={rec.id} 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 whitespace-nowrap"
                  onClick={() => onSendMessage(`Quero saber mais sobre: ${rec.content}`)}
                >
                  {getRecommendationIcon(rec.type)}
                  <span>{rec.content}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Área de input */}
        <div className="p-4 border-t mt-auto">
          <div className="flex gap-2">
            <textarea
              className="flex-1 min-h-[40px] max-h-[120px] resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Digite sua pergunta..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              rows={1}
            />
            <Button 
              variant="default" 
              size="icon" 
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Importações adicionais necessárias
import { BookOpen, FileText } from 'lucide-react';

export default AIAssistant;
