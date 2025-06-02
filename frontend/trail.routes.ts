import express, { Request, Response } from 'express';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Aplicar middleware de autenticação em todas as rotas
router.use(authMiddleware);

// Obter todas as trilhas
router.get('/', async (req: Request, res: Response) => {
  try {
    // Em um ambiente real, buscaríamos trilhas no banco
    const trails = [
      {
        _id: '1',
        title: 'Gestão Estratégica',
        description: 'Desenvolva competências em planejamento estratégico, análise de cenários e tomada de decisão.',
        moduleCount: 8,
        estimatedTime: 240,
        difficulty: 'intermediate',
        tags: ['estratégia', 'planejamento', 'gestão'],
        imageUrl: 'https://example.com/images/strategic.jpg',
        progress: 0
      },
      {
        _id: '2',
        title: 'Finanças Corporativas',
        description: 'Aprenda sobre análise financeira, investimentos, gestão de riscos e avaliação de empresas.',
        moduleCount: 10,
        estimatedTime: 360,
        difficulty: 'advanced',
        tags: ['finanças', 'investimentos', 'riscos'],
        imageUrl: 'https://example.com/images/finance.jpg',
        progress: 0
      },
      {
        _id: '3',
        title: 'Gestão de Pessoas',
        description: 'Estude recrutamento e seleção, desenvolvimento de talentos, cultura organizacional e liderança.',
        moduleCount: 7,
        estimatedTime: 180,
        difficulty: 'beginner',
        tags: ['rh', 'liderança', 'talentos'],
        imageUrl: 'https://example.com/images/hr.jpg',
        progress: 0
      }
    ];
    
    res.json(trails);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar trilhas', error });
  }
});

// Obter trilhas recomendadas
router.get('/recommended', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    // Em um ambiente real, buscaríamos recomendações personalizadas
    const recommendedTrails = [
      {
        _id: '1',
        title: 'Gestão Estratégica',
        description: 'Desenvolva competências em planejamento estratégico, análise de cenários e tomada de decisão.',
        moduleCount: 8,
        estimatedTime: 240,
        difficulty: 'intermediate',
        tags: ['estratégia', 'planejamento', 'gestão'],
        imageUrl: 'https://example.com/images/strategic.jpg',
        progress: 0,
        isRecommended: true
      },
      {
        _id: '4',
        title: 'Marketing Digital',
        description: 'Explore estratégias de marketing digital, mídias sociais, SEO e análise de dados.',
        moduleCount: 6,
        estimatedTime: 180,
        difficulty: 'intermediate',
        tags: ['marketing', 'digital', 'mídias sociais'],
        imageUrl: 'https://example.com/images/marketing.jpg',
        progress: 0,
        isRecommended: true
      }
    ];
    
    res.json(recommendedTrails);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar trilhas recomendadas', error });
  }
});

// Obter trilha por ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Em um ambiente real, buscaríamos a trilha no banco
    const trail = {
      _id: id,
      title: 'Gestão Estratégica',
      description: 'Desenvolva competências em planejamento estratégico, análise de cenários e tomada de decisão.',
      longDescription: 'Esta trilha aborda os principais conceitos e ferramentas de gestão estratégica, preparando você para analisar cenários, desenvolver planos estratégicos e tomar decisões fundamentadas. Você aprenderá sobre análise SWOT, balanced scorecard, gestão de portfólio e muito mais.',
      moduleCount: 8,
      estimatedTime: 240,
      difficulty: 'intermediate',
      tags: ['estratégia', 'planejamento', 'gestão'],
      imageUrl: 'https://example.com/images/strategic.jpg',
      modules: [
        {
          _id: '101',
          title: 'Introdução à Gestão Estratégica',
          description: 'Conceitos fundamentais e evolução histórica',
          contentType: 'text',
          estimatedTime: 30,
          order: 1
        },
        {
          _id: '102',
          title: 'Análise de Ambiente',
          description: 'Ferramentas para análise interna e externa',
          contentType: 'text',
          estimatedTime: 30,
          order: 2
        }
      ],
      progress: 0,
      userCount: 120,
      rating: 4.7,
      reviews: [
        {
          userId: '501',
          userName: 'Maria Silva',
          rating: 5,
          comment: 'Excelente trilha, conteúdo muito bem estruturado.',
          date: new Date().toISOString()
        }
      ]
    };
    
    res.json(trail);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar trilha', error });
  }
});

// Criar nova trilha (apenas admin ou professor)
router.post('/', roleMiddleware(['admin', 'teacher']), async (req: Request, res: Response) => {
  try {
    const { title, description, difficulty, tags } = req.body;
    
    // Validar dados
    if (!title || !description) {
      return res.status(400).json({ message: 'Título e descrição são obrigatórios' });
    }
    
    // Em um ambiente real, criaríamos a trilha no banco
    const newTrail = {
      _id: Date.now().toString(),
      title,
      description,
      moduleCount: 0,
      estimatedTime: 0,
      difficulty: difficulty || 'intermediate',
      tags: tags || [],
      imageUrl: 'https://example.com/images/default.jpg',
      createdAt: new Date().toISOString()
    };
    
    res.status(201).json(newTrail);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar trilha', error });
  }
});

// Atualizar trilha (apenas admin ou professor)
router.put('/:id', roleMiddleware(['admin', 'teacher']), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, difficulty, tags } = req.body;
    
    // Em um ambiente real, atualizaríamos a trilha no banco
    const updatedTrail = {
      _id: id,
      title: title || 'Gestão Estratégica',
      description: description || 'Desenvolva competências em planejamento estratégico',
      moduleCount: 8,
      estimatedTime: 240,
      difficulty: difficulty || 'intermediate',
      tags: tags || ['estratégia', 'planejamento', 'gestão'],
      imageUrl: 'https://example.com/images/strategic.jpg',
      updatedAt: new Date().toISOString()
    };
    
    res.json(updatedTrail);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar trilha', error });
  }
});

// Excluir trilha (apenas admin)
router.delete('/:id', roleMiddleware(['admin']), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Em um ambiente real, excluiríamos a trilha do banco
    
    res.json({ message: 'Trilha excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir trilha', error });
  }
});

export default router;
