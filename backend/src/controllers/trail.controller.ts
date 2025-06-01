import express, { Request, Response } from 'express';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Aplicar middleware de autenticação em todas as rotas
router.use(authMiddleware);

// Obter todas as trilhas
router.get('/', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
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
      }
    ];
    
    res.json(trails);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar trilhas', error });
  }
});

// Registrar progresso na trilha
router.post('/:id/progress', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    const { id } = req.params;
    
    // Em um ambiente real, registraríamos o progresso no banco
    const trailProgress = {
      trailId: id,
      userId: req.user.id,
      progress: 35, // percentual
      completedModules: 3,
      totalModules: 8,
      lastAccessed: new Date().toISOString()
    };
    
    res.json({
      message: 'Progresso registrado com sucesso',
      trailProgress
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar progresso', error });
  }
});

export default router;
