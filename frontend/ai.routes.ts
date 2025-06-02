import express from 'express';
import { Request, Response } from 'express';
import Recommendation from '../models/Recommendation';
import UserActivity from '../models/UserActivity';
import Question from '../models/Question';
import Module from '../models/Module';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Obter recomendações personalizadas para o usuário
router.get('/recommendations', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    
    // Buscar recomendações ativas do usuário
    const recommendations = await Recommendation.find({
      userId,
      status: { $in: ['pendente', 'visualizada'] },
      expiresAt: { $gt: new Date() }
    }).sort({ priority: -1 }).limit(10);
    
    // Buscar detalhes dos conteúdos recomendados
    const populatedRecommendations = await Promise.all(
      recommendations.map(async (rec) => {
        let contentDetails = null;
        
        // Buscar detalhes do conteúdo baseado no tipo
        if (rec.contentType === 'Module') {
          contentDetails = await Module.findById(rec.contentId);
        } else if (rec.contentType === 'Question') {
          contentDetails = await Question.findById(rec.contentId);
        } else {
          // Outros tipos de conteúdo...
        }
        
        // Marcar como visualizada se estava pendente
        if (rec.status === 'pendente') {
          rec.status = 'visualizada';
          await rec.save();
        }
        
        return {
          ...rec.toObject(),
          contentDetails: contentDetails ? contentDetails.toObject() : null
        };
      })
    );
    
    res.status(200).json(populatedRecommendations);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar recomendações', error });
  }
});

// Gerar recomendações baseadas em IA
router.post('/generate-recommendations', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    
    // 1. Coletar dados de atividade do usuário
    const userActivities = await UserActivity.find({ userId })
      .sort({ timestamp: -1 })
      .limit(100);
    
    // 2. Analisar padrões de erro em simulados
    const simulationActivities = userActivities.filter(
      act => act.activityType === 'simulado' && act.action === 'errou'
    );
    
    // Agrupar por área de conhecimento
    const errorsByArea = {};
    for (const activity of simulationActivities) {
      const questionId = activity.entityId;
      const question = await Question.findById(questionId);
      
      if (question) {
        // Agrupar por área de conteúdo
        const area = question.contentArea;
        if (!errorsByArea[area]) {
          errorsByArea[area] = 0;
        }
        errorsByArea[area]++;
      }
    }
    
    // 3. Identificar áreas com mais dificuldade
    const weakAreas = Object.entries(errorsByArea)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]);
    
    // 4. Buscar módulos relacionados às áreas de dificuldade
    const recommendedModules = [];
    for (const area of weakAreas) {
      // Buscar módulos relacionados que o usuário ainda não completou
      const modules = await Module.find({
        contentArea: area,
        _id: {
          $nin: userActivities
            .filter(act => act.activityType === 'estudo' && act.action === 'completou')
            .map(act => act.entityId)
        }
      }).limit(2);
      
      recommendedModules.push(...modules);
    }
    
    // 5. Criar recomendações no sistema
    const newRecommendations = [];
    for (const module of recommendedModules) {
      // Verificar se já existe recomendação ativa para este módulo
      const existingRec = await Recommendation.findOne({
        userId,
        contentId: module._id,
        status: { $in: ['pendente', 'visualizada'] }
      });
      
      if (!existingRec) {
        const newRec = new Recommendation({
          userId,
          type: 'módulo',
          contentId: module._id,
          contentType: 'Module',
          reason: `Reforço em ${module.contentArea}`,
          priority: 8, // Alta prioridade para áreas de dificuldade
          status: 'pendente'
        });
        
        await newRec.save();
        newRecommendations.push(newRec);
      }
    }
    
    // 6. Adicionar recomendações de simulados para prática
    // Lógica similar para recomendar simulados...
    
    res.status(200).json({
      message: 'Recomendações geradas com sucesso',
      count: newRecommendations.length,
      recommendations: newRecommendations
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao gerar recomendações', error });
  }
});

// Atualizar status de uma recomendação
router.patch('/recommendations/:id/status', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const userId = req.user.id;
    
    // Verificar se o status é válido
    if (!['visualizada', 'aceita', 'concluída', 'ignorada'].includes(status)) {
      return res.status(400).json({ message: 'Status inválido' });
    }
    
    // Buscar a recomendação
    const recommendation = await Recommendation.findById(req.params.id);
    
    if (!recommendation) {
      return res.status(404).json({ message: 'Recomendação não encontrada' });
    }
    
    // Verificar se a recomendação pertence ao usuário
    if (recommendation.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    
    // Atualizar status
    recommendation.status = status;
    await recommendation.save();
    
    res.status(200).json(recommendation);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar status da recomendação', error });
  }
});

// Endpoint para o assistente virtual responder perguntas
router.post('/assistant/query', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    const userId = req.user.id;
    
    // Registrar a atividade do usuário
    const userActivity = new UserActivity({
      userId,
      activityType: 'interação',
      entityId: userId, // Neste caso, a entidade é o próprio usuário
      entityType: 'User',
      action: 'perguntou',
      details: { query },
      timestamp: new Date()
    });
    
    await userActivity.save();
    
    // Lógica para processar a pergunta e gerar resposta
    // Em uma implementação real, aqui seria integrado um serviço de IA
    // como GPT ou similar para processar a pergunta
    
    // Simulação de resposta do assistente
    const response = {
      answer: `Resposta para: "${query}"`,
      relatedContent: [],
      suggestions: []
    };
    
    // Baseado na pergunta, buscar conteúdo relacionado
    if (query.toLowerCase().includes('enade')) {
      response.relatedContent.push({
        type: 'módulo',
        title: 'Estrutura da Prova ENADE',
        id: '60f1a5b3e6b3f32a4c9b4567' // ID fictício
      });
    }
    
    // Sugestões de próximas perguntas
    response.suggestions = [
      'Como me preparar para questões discursivas?',
      'Quais são as competências mais avaliadas?',
      'Qual a melhor estratégia de estudo?'
    ];
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar pergunta', error });
  }
});

export default router;
