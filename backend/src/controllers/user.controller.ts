import express, { Request, Response } from 'express';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Aplicar middleware de autenticação em todas as rotas
router.use(authMiddleware);

// Obter perfil do usuário atual
router.get('/profile', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    // Em um ambiente real, buscaríamos dados completos do usuário no banco
    res.json({
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
      name: 'Usuário Exemplo',
      level: 3,
      points: 250,
      streak: 5,
      completedModules: 12,
      totalModules: 30,
      completedSimulations: 4,
      performanceData: [
        { area: 'Finanças', score: 85 },
        { area: 'Marketing', score: 70 },
        { area: 'Recursos Humanos', score: 90 },
        { area: 'Estratégia', score: 75 },
        { area: 'Produção', score: 65 }
      ],
      engagementData: [
        { date: new Date(Date.now() - 6 * 86400000), minutes: 45 },
        { date: new Date(Date.now() - 5 * 86400000), minutes: 30 },
        { date: new Date(Date.now() - 4 * 86400000), minutes: 60 },
        { date: new Date(Date.now() - 3 * 86400000), minutes: 20 },
        { date: new Date(Date.now() - 2 * 86400000), minutes: 40 },
        { date: new Date(Date.now() - 1 * 86400000), minutes: 50 },
        { date: new Date(), minutes: 35 }
      ]
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar perfil', error });
  }
});

// Atualizar perfil do usuário
router.patch('/profile', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    const { name, avatar } = req.body;
    
    // Em um ambiente real, atualizaríamos o usuário no banco
    
    res.json({
      message: 'Perfil atualizado com sucesso',
      user: {
        id: req.user.id,
        name: name || 'Usuário Exemplo',
        email: req.user.email,
        avatar: avatar || 'default-avatar.png'
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar perfil', error });
  }
});

// Obter usuário por ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    // Verificar permissões
    if (req.user.id !== req.params.id && !['admin', 'coordinator'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Acesso não autorizado' });
    }
    
    const { id } = req.params;
    
    // Em um ambiente real, buscaríamos o usuário no banco
    const user = {
      id,
      name: 'Usuário Exemplo',
      email: 'usuario@exemplo.com',
      role: 'student',
      level: 2,
      points: 150,
      course: 'Administração'
    };
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error });
  }
});

// Atualizar usuário
router.put('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    // Verificar permissões
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso não autorizado' });
    }
    
    // Verificar se está tentando alterar role sem ser admin
    if (req.body.role && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Não autorizado a alterar função de usuário' });
    }
    
    const { id } = req.params;
    const { name, email, role, avatar } = req.body;
    
    // Em um ambiente real, atualizaríamos o usuário no banco
    const updatedUser = {
      id,
      name: name || 'Usuário Exemplo',
      email: email || 'usuario@exemplo.com',
      role: role || 'student',
      avatar: avatar || 'default-avatar.png',
      updatedAt: new Date().toISOString()
    };
    
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error });
  }
});

// Excluir usuário
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    // Verificar permissões
    if (req.user.id !== req.params.id && !['admin', 'coordinator', 'teacher'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Acesso não autorizado' });
    }
    
    const { id } = req.params;
    
    // Em um ambiente real, excluiríamos o usuário do banco
    
    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir usuário', error });
  }
});

export default router;
