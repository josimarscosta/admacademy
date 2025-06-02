import express, { Request, Response } from 'express';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Aplicar middleware de autenticação em todas as rotas
router.use(authMiddleware);

// Obter todos os cursos
router.get('/', async (req: Request, res: Response) => {
  try {
    // Em um ambiente real, buscaríamos cursos no banco
    const courses = [
      {
        _id: '1',
        title: 'Administração',
        description: 'Curso de Bacharelado em Administração',
        coordinator: 'Dr. João Silva',
        students: 120,
        trails: 8,
        modules: 45,
        simulations: 12
      },
      {
        _id: '2',
        title: 'Ciências Contábeis',
        description: 'Curso de Bacharelado em Ciências Contábeis',
        coordinator: 'Dra. Maria Santos',
        students: 95,
        trails: 6,
        modules: 38,
        simulations: 10
      }
    ];
    
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cursos', error });
  }
});

// Obter curso por ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Em um ambiente real, buscaríamos o curso no banco
    const course = {
      _id: id,
      title: 'Administração',
      description: 'Curso de Bacharelado em Administração',
      coordinator: 'Dr. João Silva',
      students: 120,
      trails: 8,
      modules: 45,
      simulations: 12,
      performanceData: [
        { area: 'Formação Geral', averageScore: 75 },
        { area: 'Específica', averageScore: 68 }
      ],
      engagementData: [
        { month: 'Janeiro', activeStudents: 98 },
        { month: 'Fevereiro', activeStudents: 105 },
        { month: 'Março', activeStudents: 112 }
      ]
    };
    
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar curso', error });
  }
});

// Criar novo curso (apenas admin)
router.post('/', roleMiddleware(['admin']), async (req: Request, res: Response) => {
  try {
    const { title, description, coordinator } = req.body;
    
    // Validar dados
    if (!title || !description) {
      return res.status(400).json({ message: 'Título e descrição são obrigatórios' });
    }
    
    // Em um ambiente real, criaríamos o curso no banco
    const newCourse = {
      _id: Date.now().toString(),
      title,
      description,
      coordinator: coordinator || 'A definir',
      students: 0,
      trails: 0,
      modules: 0,
      simulations: 0,
      createdAt: new Date().toISOString()
    };
    
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar curso', error });
  }
});

// Atualizar curso (apenas admin)
router.put('/:id', roleMiddleware(['admin']), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, coordinator } = req.body;
    
    // Em um ambiente real, atualizaríamos o curso no banco
    const updatedCourse = {
      _id: id,
      title: title || 'Administração',
      description: description || 'Curso de Bacharelado em Administração',
      coordinator: coordinator || 'Dr. João Silva',
      students: 120,
      trails: 8,
      modules: 45,
      simulations: 12,
      updatedAt: new Date().toISOString()
    };
    
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar curso', error });
  }
});

// Excluir curso (apenas admin)
router.delete('/:id', roleMiddleware(['admin']), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Em um ambiente real, excluiríamos o curso do banco
    
    res.json({ message: 'Curso excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir curso', error });
  }
});

export default router;
