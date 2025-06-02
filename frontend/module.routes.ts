import express, { Request, Response } from 'express';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Aplicar middleware de autenticação em todas as rotas
router.use(authMiddleware);

// Obter todos os módulos
router.get('/', async (req: Request, res: Response) => {
  try {
    // Em um ambiente real, buscaríamos módulos no banco
    const modules = [
      {
        _id: '101',
        title: 'Introdução à Gestão Estratégica',
        description: 'Conceitos fundamentais e evolução histórica',
        contentType: 'text',
        contentArea: 'Estratégia',
        estimatedTime: 30,
        difficulty: 'beginner',
        trailId: '1',
        order: 1,
        tags: ['estratégia', 'introdução']
      },
      {
        _id: '102',
        title: 'Análise de Ambiente',
        description: 'Ferramentas para análise interna e externa',
        contentType: 'text',
        contentArea: 'Estratégia',
        estimatedTime: 30,
        difficulty: 'intermediate',
        trailId: '1',
        order: 2,
        tags: ['estratégia', 'análise', 'SWOT']
      }
    ];
    
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar módulos', error });
  }
});

// Obter módulo por ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Em um ambiente real, buscaríamos o módulo no banco
    const module = {
      _id: id,
      title: 'Introdução à Gestão Estratégica',
      description: 'Conceitos fundamentais e evolução histórica',
      content: `
        <h1>Introdução à Gestão Estratégica</h1>
        <p>A gestão estratégica é um processo contínuo de planejamento, implementação e avaliação de decisões que permitem à organização atingir seus objetivos de longo prazo.</p>
        <h2>Conceitos Fundamentais</h2>
        <ul>
          <li>Estratégia: plano de ação para alcançar objetivos</li>
          <li>Missão: propósito fundamental da organização</li>
          <li>Visão: onde a organização deseja chegar</li>
          <li>Valores: princípios que guiam as ações</li>
        </ul>
        <h2>Evolução Histórica</h2>
        <p>A gestão estratégica evoluiu significativamente desde os anos 1950, quando o planejamento estratégico formal começou a ser adotado por grandes empresas.</p>
      `,
      contentType: 'text',
      contentArea: 'Estratégia',
      estimatedTime: 30,
      difficulty: 'beginner',
      trailId: '1',
      order: 1,
      tags: ['estratégia', 'introdução'],
      resources: [
        {
          type: 'pdf',
          url: 'https://example.com/files/estrategia_intro.pdf',
          title: 'Material Complementar'
        },
        {
          type: 'video',
          url: 'https://example.com/videos/estrategia_intro.mp4',
          title: 'Vídeo Explicativo'
        }
      ]
    };
    
    res.json(module);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar módulo', error });
  }
});

// Criar novo módulo (apenas admin ou professor)
router.post('/', roleMiddleware(['admin', 'teacher']), async (req: Request, res: Response) => {
  try {
    const { title, description, content, contentType, contentArea, estimatedTime, difficulty, trailId, order, tags, resources } = req.body;
    
    // Validar dados
    if (!title || !description || !content || !trailId) {
      return res.status(400).json({ message: 'Dados incompletos' });
    }
    
    // Em um ambiente real, criaríamos o módulo no banco
    const newModule = {
      _id: Date.now().toString(),
      title,
      description,
      content,
      contentType: contentType || 'text',
      contentArea: contentArea || 'Geral',
      estimatedTime: estimatedTime || 30,
      difficulty: difficulty || 'intermediate',
      trailId,
      order: order || 1,
      tags: tags || [],
      resources: resources || [],
      createdAt: new Date().toISOString()
    };
    
    res.status(201).json(newModule);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar módulo', error });
  }
});

// Atualizar módulo (apenas admin ou professor)
router.put('/:id', roleMiddleware(['admin', 'teacher']), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, content, contentType, contentArea, estimatedTime, difficulty, order, tags, resources } = req.body;
    
    // Em um ambiente real, atualizaríamos o módulo no banco
    const updatedModule = {
      _id: id,
      title: title || 'Introdução à Gestão Estratégica',
      description: description || 'Conceitos fundamentais e evolução histórica',
      content: content || '<h1>Conteúdo atualizado</h1>',
      contentType: contentType || 'text',
      contentArea: contentArea || 'Estratégia',
      estimatedTime: estimatedTime || 30,
      difficulty: difficulty || 'beginner',
      order: order || 1,
      tags: tags || ['estratégia', 'introdução'],
      resources: resources || [],
      updatedAt: new Date().toISOString()
    };
    
    res.json(updatedModule);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar módulo', error });
  }
});

// Excluir módulo (apenas admin)
router.delete('/:id', roleMiddleware(['admin']), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Em um ambiente real, excluiríamos o módulo do banco
    
    res.json({ message: 'Módulo excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir módulo', error });
  }
});

export default router;
