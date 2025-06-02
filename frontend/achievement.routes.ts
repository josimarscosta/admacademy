import express from 'express';
import { Request, Response } from 'express';
import Achievement from '../models/Achievement';
import UserAchievement from '../models/UserAchievement';
import UserPoints from '../models/UserPoints';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Obter todas as conquistas
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const achievements = await Achievement.find();
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar conquistas', error });
  }
});

// Obter conquistas do usuário
router.get('/user', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    
    // Buscar todas as conquistas
    const allAchievements = await Achievement.find();
    
    // Buscar progresso do usuário
    const userAchievements = await UserAchievement.find({ userId });
    
    // Mapear conquistas com progresso
    const achievementsWithProgress = allAchievements.map(achievement => {
      const userProgress = userAchievements.find(
        ua => ua.achievementId.toString() === achievement._id.toString()
      );
      
      return {
        ...achievement.toObject(),
        progress: userProgress ? userProgress.progress : 0,
        completed: userProgress ? userProgress.completed : false,
        earnedAt: userProgress ? userProgress.earnedAt : null
      };
    });
    
    res.status(200).json(achievementsWithProgress);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar conquistas do usuário', error });
  }
});

// Obter detalhes de uma conquista específica
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    
    if (!achievement) {
      return res.status(404).json({ message: 'Conquista não encontrada' });
    }
    
    // Se o usuário estiver autenticado, buscar progresso
    if (req.user) {
      const userAchievement = await UserAchievement.findOne({
        userId: req.user.id,
        achievementId: req.params.id
      });
      
      const achievementWithProgress = {
        ...achievement.toObject(),
        progress: userAchievement ? userAchievement.progress : 0,
        completed: userAchievement ? userAchievement.completed : false,
        earnedAt: userAchievement ? userAchievement.earnedAt : null
      };
      
      return res.status(200).json(achievementWithProgress);
    }
    
    res.status(200).json(achievement);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar detalhes da conquista', error });
  }
});

// Criar nova conquista (apenas admin)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    // Verificar se o usuário é admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    
    const newAchievement = new Achievement(req.body);
    const savedAchievement = await newAchievement.save();
    
    res.status(201).json(savedAchievement);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar conquista', error });
  }
});

// Atualizar progresso de conquista
router.post('/:id/progress', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { progress } = req.body;
    const userId = req.user.id;
    const achievementId = req.params.id;
    
    // Verificar se a conquista existe
    const achievement = await Achievement.findById(achievementId);
    if (!achievement) {
      return res.status(404).json({ message: 'Conquista não encontrada' });
    }
    
    // Buscar ou criar registro de progresso
    let userAchievement = await UserAchievement.findOne({ userId, achievementId });
    
    if (!userAchievement) {
      userAchievement = new UserAchievement({
        userId,
        achievementId,
        progress: 0,
        completed: false
      });
    }
    
    // Atualizar progresso
    userAchievement.progress = Math.min(100, Math.max(0, progress));
    
    // Verificar se completou
    const wasCompleted = userAchievement.completed;
    const isNowCompleted = userAchievement.progress === 100;
    
    // Se completou agora e não estava completo antes
    if (isNowCompleted && !wasCompleted) {
      userAchievement.completed = true;
      userAchievement.earnedAt = new Date();
      
      // Adicionar pontos ao usuário
      let userPoints = await UserPoints.findOne({ userId });
      
      if (!userPoints) {
        userPoints = new UserPoints({ userId });
      }
      
      await userPoints.addPoints(
        achievement.points,
        `Conquista: ${achievement.name}`,
        'conquista',
        achievement._id
      );
    }
    
    await userAchievement.save();
    
    res.status(200).json(userAchievement);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar progresso', error });
  }
});

export default router;
