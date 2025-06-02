import express, { Request, Response } from 'express';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Aplicar middleware de autenticação em todas as rotas
router.use(authMiddleware);

// Obter analytics gerais
router.get('/', roleMiddleware(['admin', 'coordinator']), async (req: Request, res: Response) => {
  try {
    // Em um ambiente real, buscaríamos dados analíticos no banco
    const analytics = {
      totalStudents: 215,
      activeStudents: 187,
      completedModules: 1245,
      completedSimulations: 432,
      averageScore: 72,
      engagementRate: 78,
      performanceByArea: [
        { area: 'Formação Geral', averageScore: 75 },
        { area: 'Estratégia', averageScore: 68 },
        { area: 'Finanças', averageScore: 70 },
        { area: 'Marketing', averageScore: 80 },
        { area: 'Recursos Humanos', averageScore: 73 }
      ],
      engagementTrend: [
        { week: '01/05', activeUsers: 165 },
        { week: '08/05', activeUsers: 172 },
        { week: '15/05', activeUsers: 180 },
        { week: '22/05', activeUsers: 187 }
      ]
    };
    
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar analytics', error });
  }
});

// Obter analytics por curso
router.get('/course/:id', roleMiddleware(['admin', 'coordinator', 'teacher']), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Em um ambiente real, buscaríamos dados analíticos do curso no banco
    const courseAnalytics = {
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
      engagementTrend: [
        { week: '01/05', activeUsers: 92 },
        { week: '08/05', activeUsers: 98 },
        { week: '15/05', activeUsers: 102 },
        { week: '22/05', activeUsers: 105 }
      ],
      topPerformingStudents: [
        { id: '101', name: 'Ana Silva', averageScore: 92 },
        { id: '102', name: 'Carlos Santos', averageScore: 88 },
        { id: '103', name: 'Mariana Costa', averageScore: 85 }
      ],
      studentsAtRisk: [
        { id: '201', name: 'Pedro Oliveira', averageScore: 45, lastActive: '2025-05-20' },
        { id: '202', name: 'Juliana Lima', averageScore: 52, lastActive: '2025-05-15' }
      ]
    };
    
    res.json(courseAnalytics);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar analytics do curso', error });
  }
});

// Obter analytics do usuário
router.get('/user', async (req: Request, res: Response) => {
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

// Gerar relatório personalizado
router.post('/report', roleMiddleware(['admin', 'coordinator']), async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, courseId, metrics } = req.body;
    
    // Validar dados
    if (!startDate || !endDate || !metrics || !metrics.length) {
      return res.status(400).json({ message: 'Dados incompletos para geração do relatório' });
    }
    
    // Em um ambiente real, geraríamos o relatório com base nos parâmetros
    const report = {
      id: Date.now().toString(),
      title: `Relatório ${courseId ? 'do Curso' : 'Geral'} - ${startDate} a ${endDate}`,
      generatedAt: new Date().toISOString(),
      courseId: courseId || 'all',
      metrics,
      data: {
        studentEngagement: {
          activeUsers: 187,
          averageTimeSpent: 42, // minutos por dia
          completionRate: 68 // porcentagem
        },
        performance: {
          averageScore: 74,
          improvementRate: 12, // porcentagem de melhoria
          topAreas: ['Marketing', 'Recursos Humanos'],
          challengingAreas: ['Finanças', 'Estratégia']
        }
      },
      downloadUrl: '/api/analytics/report/download/' + Date.now().toString()
    };
    
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao gerar relatório', error });
  }
});

export default router;
