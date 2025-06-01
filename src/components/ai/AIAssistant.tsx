import React, { useState } from 'react';

interface AIAssistantProps {
  initialMessage?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ 
  initialMessage = "Olá! Sou seu assistente virtual de estudos. Como posso ajudar na sua preparação para o ENADE?"
}) => {
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    { text: initialMessage, isUser: false }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Respostas pré-definidas para simulação
  const predefinedResponses: Record<string, string> = {
    "enade": "O ENADE (Exame Nacional de Desempenho dos Estudantes) avalia o rendimento dos concluintes dos cursos de graduação em relação aos conteúdos programáticos previstos nas diretrizes curriculares.",
    "simulado": "Temos diversos simulados disponíveis na plataforma. Recomendo começar pelo 'Simulado Completo ENADE' que simula o formato oficial da prova.",
    "trilha": "As trilhas de aprendizado são percursos personalizados que guiam seu estudo. Cada trilha contém módulos específicos para diferentes áreas do conhecimento avaliadas no ENADE.",
    "pontos": "Você ganha pontos ao completar módulos, simulados e atividades. Esses pontos contribuem para seu nível e desbloqueiam conquistas.",
    "ajuda": "Posso ajudar com informações sobre o ENADE, recomendações de estudo, explicações sobre conteúdos e dicas para melhorar seu desempenho.",
    "default": "Entendi sua dúvida. Vou analisar os conteúdos relacionados e trazer as melhores recomendações para você. Continue explorando as trilhas de aprendizado enquanto isso."
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Adicionar mensagem do usuário
    const newMessages = [...messages, { text: inputText, isUser: true }];
    setMessages(newMessages);
    setInputText('');
    
    // Simular assistente digitando
    setIsTyping(true);
    
    // Processar resposta (simulada)
    setTimeout(() => {
      let response = predefinedResponses.default;
      
      // Verificar palavras-chave para respostas pré-definidas
      Object.keys(predefinedResponses).forEach(keyword => {
        if (inputText.toLowerCase().includes(keyword)) {
          response = predefinedResponses[keyword];
        }
      });
      
      setMessages([...newMessages, { text: response, isUser: false }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="ai-assistant-container">
      <div className="ai-assistant-header">
        <h3>Assistente Virtual</h3>
      </div>
      
      <div className="ai-assistant-messages">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.isUser ? 'user-message' : 'assistant-message'}`}
          >
            {message.text}
          </div>
        ))}
        
        {isTyping && (
          <div className="assistant-message typing">
            <span className="typing-indicator">...</span>
          </div>
        )}
      </div>
      
      <div className="ai-assistant-input">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Digite sua pergunta..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default AIAssistant;
