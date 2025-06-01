import express, { Request, Response } from 'express';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Aplicar middleware de autenticação em todas as rotas
router.use(authMiddleware);

// Obter analytics do usuário
router.get('/user-performance', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    // Em um ambiente real, buscaríamos dados analíticos do usuário no banco
    const userAnalytics = {
      userId: req.user.id,
      completedModules: 24,
      totalModules: 45,
      completedSimulations: 8,
      averageScore: 78,
      streak: 5, // dias consecutivos de estudo
      timeSpent: 1845, // minutos
      performanceByArea: [
        { area: 'Formação Geral', averageScore: 80 },
        { area: 'Estratégia', averageScore: 75 },
        { area: 'Finanças', averageScore: 65 },
        { area: 'Marketing', averageScore: 85 },
        { area: 'Recursos Humanos', averageScore: 82 }
      ],
      activityTrend: [
        { date: '2025-05-25', timeSpent: 45 },
        { date: '2025-05-26', timeSpent: 30 },
        { date: '2025-05-27', timeSpent: 60 },
        { date: '2025-05-28', timeSpent: 25 },
        { date: '2025-05-29', timeSpent: 40 },
        { date: '2025-05-30', timeSpent: 50 },
        { date: '2025-05-31', timeSpent: 35 }
      ],
      recommendations: [
        { area: 'Finanças', reason: 'Área com menor desempenho' },
        { area: 'Estratégia', reason: 'Conteúdo recentemente atualizado' }
      ]
    };
    
    res.json(userAnalytics);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar analytics do usuário', error });
  }
});

// Obter estatísticas do curso
router.get('/course-stats/:id', roleMiddleware(['admin', 'coordinator', 'teacher']), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Em um ambiente real, buscaríamos estatísticas do curso no banco
    const courseStats = {
      courseId: id,
      courseName: 'Administração',
      totalStudents: 120,
      activeStudents: 105,
      completedModules: 845,
      completedSimulations: 287,
      averageScore: 74,
      engagementRate: 82,
      performanceByArea: [
        { area: 'Formação Geral', averageScore: 77 },
        { area: 'Estratégia', averageScore: 70 },
        { area: 'Finanças', averageScore: 72 },
        { area: 'Marketing', averageScore: 82 },
        { area: 'Recursos Humanos', averageScore: 75 }
      ],
      // Utilizando a carga horária padrão conforme orientação
      creditStats: {
        totalCredits: 3024,
        averageCompletedCredits: 2150,
        percentageCompleted: 71
      }
    };
    
    res.json(courseStats);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar estatísticas do curso', error });
  }
});

// Obter dashboard geral
router.get('/dashboard', roleMiddleware(['admin', 'coordinator']), async (req: Request, res: Response) => {
  try {
    // Em um ambiente real, buscaríamos dados para o dashboard no banco
    const dashboard = {
      summary: {
        totalStudents: 215,
        activeStudents: 187,
        totalCourses: 3,
        totalModules: 120,
        totalSimulations: 25
      },
      performanceOverview: {
        averageScore: 72,
        improvementTrend: 8, // percentual de melhoria
        topPerformingAreas: ['Marketing', 'Recursos Humanos'],
        challengingAreas: ['Finanças', 'Estratégia']
      },
      engagementMetrics: {
        dailyActiveUsers: 145,
        weeklyActiveUsers: 187,
        averageSessionTime: 42, // minutos
        completionRate: 68 // percentual
      },
      recentActivity: [
        { type: 'module_completion', count: 87, trend: 'up' },
        { type: 'simulation_completion', count: 32, trend: 'up' },
        { type: 'new_registrations', count: 15, trend: 'stable' }
      ]
    };
    
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar dados do dashboard', error });
  }
});

export default router;
