import express, { Request, Response } from 'express';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Aplicar middleware de autenticação em todas as rotas
router.use(authMiddleware);

// Obter todos os simulados
router.get('/', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    const isTeacher = req.user && ['teacher', 'coordinator', 'admin'].includes(req.user.role);
    
    // Em um ambiente real, buscaríamos simulados no banco
    const simulations = [
      {
        _id: '201',
        title: 'Simulado Diagnóstico',
        description: 'Avalie seu conhecimento atual e identifique áreas que precisam de mais atenção.',
        questionCount: 30,
        timeLimit: 60,
        difficulty: 'intermediate',
        categories: ['Formação Geral', 'Específica'],
        dueDate: new Date(Date.now() + 7 * 86400000).toISOString()
      },
      {
        _id: '202',
        title: 'Simulado Completo',
        description: 'Experimente uma prova completa no formato oficial do ENADE, com tempo controlado.',
        questionCount: 40,
        timeLimit: 240,
        difficulty: 'advanced',
        categories: ['Formação Geral', 'Específica'],
        dueDate: new Date(Date.now() + 14 * 86400000).toISOString()
      }
    ];
    
    res.json(simulations);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar simulados', error });
  }
});

// Obter simulado por ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    const { id } = req.params;
    
    // Em um ambiente real, buscaríamos o simulado no banco
    const simulation = {
      _id: id,
      title: 'Simulado Diagnóstico',
      description: 'Avalie seu conhecimento atual e identifique áreas que precisam de mais atenção.',
      instructions: 'Leia atentamente cada questão. Você terá 60 minutos para completar o simulado.',
      questionCount: 30,
      timeLimit: 60,
      difficulty: 'intermediate',
      categories: ['Formação Geral', 'Específica'],
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString(),
      questions: [
        {
          _id: '301',
          questionText: 'Qual das seguintes alternativas melhor descreve o conceito de planejamento estratégico?',
          options: [
            'Processo de definição de metas de curto prazo',
            'Análise detalhada de operações diárias',
            'Processo sistemático de definir objetivos de longo prazo e estratégias para alcançá-los',
            'Técnica para resolver problemas operacionais imediatos',
            'Método de controle financeiro mensal'
          ],
          correctOption: 2,
          explanation: 'O planejamento estratégico é um processo sistemático que envolve a definição de objetivos de longo prazo e o desenvolvimento de estratégias para alcançá-los, considerando fatores internos e externos à organização.',
          competency: 'Estratégia',
          difficulty: 'medium',
          type: 'multiple_choice',
          points: 10
        },
        {
          _id: '302',
          questionText: 'Em um cenário de alta inflação, qual das seguintes estratégias financeiras seria mais adequada para uma empresa?',
          options: [
            'Aumentar o volume de empréstimos de longo prazo a taxas fixas',
            'Manter altos níveis de caixa em moeda local',
            'Reduzir preços para ganhar participação de mercado',
            'Postergar investimentos em ativos fixos',
            'Aumentar o prazo de pagamento a fornecedores'
          ],
          correctOption: 0,
          explanation: 'Em cenários inflacionários, empréstimos de longo prazo a taxas fixas tendem a se desvalorizar em termos reais, beneficiando o devedor. Manter caixa em moeda local resultaria em perda de valor, enquanto reduzir preços afetaria as margens já pressionadas pela inflação.',
          competency: 'Finanças',
          difficulty: 'hard',
          type: 'multiple_choice',
          points: 15
        }
      ]
    };
    
    res.json(simulation);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar simulado', error });
  }
});

// Iniciar simulado
router.post('/:id/start', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    const { id } = req.params;
    
    // Em um ambiente real, registraríamos o início do simulado
    const simulationSession = {
      simulationId: id,
      userId: req.user.id,
      startTime: new Date().toISOString(),
      status: 'in_progress'
    };
    
    res.json({
      message: 'Simulado iniciado com sucesso',
      simulationId: id,
      startTime: simulationSession.startTime,
      timeLimit: 60, // minutos
      questionCount: 30
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao iniciar simulado', error });
  }
});

// Enviar respostas do simulado
router.post('/:id/submit', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    const { id } = req.params;
    const { answers, timeSpent } = req.body;
    
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Formato de respostas inválido' });
    }
    
    // Em um ambiente real, processaríamos as respostas e calcularíamos o resultado
    
    // Simulando resultado
    const result = {
      simulationId: id,
      userId: req.user.id,
      score: 75,
      timeSpent: timeSpent || 45, // minutos
      submittedAt: new Date().toISOString(),
      correctAnswers: 22,
      totalQuestions: 30,
      performanceByArea: [
        { area: 'Formação Geral', score: 80, correctAnswers: 6, totalQuestions: 8 },
        { area: 'Estratégia', score: 70, correctAnswers: 7, totalQuestions: 10 },
        { area: 'Finanças', score: 75, correctAnswers: 6, totalQuestions: 8 },
        { area: 'Marketing', score: 100, correctAnswers: 4, totalQuestions: 4 }
      ],
      feedback: 'Bom desempenho! Recomendamos revisar os conceitos de Estratégia para melhorar ainda mais.'
    };
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar respostas', error });
  }
});

// Obter histórico de simulados do usuário
router.get('/user/history', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    // Em um ambiente real, buscaríamos o histórico no banco
    const history = [
      {
        simulationId: '201',
        title: 'Simulado Diagnóstico',
        completedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
        score: 75,
        timeSpent: 45,
        correctAnswers: 22,
        totalQuestions: 30
      },
      {
        simulationId: '202',
        title: 'Simulado Completo',
        completedAt: new Date(Date.now() - 14 * 86400000).toISOString(),
        score: 82,
        timeSpent: 210,
        correctAnswers: 33,
        totalQuestions: 40
      }
    ];
    
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar histórico', error });
  }
});

// Criar novo simulado (apenas admin ou professor)
router.post('/', roleMiddleware(['admin', 'teacher']), async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    const { title, description, questionCount, timeLimit, difficulty, categories, questions } = req.body;
    
    // Validar dados
    if (!title || !description || !questionCount || !timeLimit) {
      return res.status(400).json({ message: 'Dados incompletos' });
    }
    
    // Em um ambiente real, criaríamos o simulado no banco
    const newSimulation = {
      _id: Date.now().toString(),
      title,
      description,
      questionCount,
      timeLimit,
      difficulty: difficulty || 'intermediate',
      categories: categories || ['Geral'],
      questions: questions || [],
      createdBy: req.user.id,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 30 * 86400000).toISOString()
    };
    
    res.status(201).json(newSimulation);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar simulado', error });
  }
});

export default router;
