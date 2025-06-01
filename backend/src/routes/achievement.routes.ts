import express, { Request, Response } from 'express';
import Achievement from '../models/Achievement';
import UserAchievement from '../models/UserAchievement';

// Interface para tipagem de áreas de erro
interface ErrorsByArea {
  [key: string]: number;
}

const router = express.Router();

// Obter todas as conquistas
router.get('/', async (req: Request, res: Response) => {
  try {
    const achievements = await Achievement.find();
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar conquistas', error });
  }
});

// Obter conquistas do usuário
router.get('/user', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    const userId = req.user.id;
    const userAchievements = await UserAchievement.find({ userId })
      .populate('achievementId');
    
    // Formatar resposta
    const formattedAchievements = userAchievements.map(ua => {
      const achievement = ua.achievementId as any;
      return {
        _id: achievement._id,
        name: achievement.name,
        description: achievement.description,
        icon: achievement.icon,
        category: achievement.category,
        points: achievement.points,
        progress: ua.progress,
        completed: ua.completed,
        earnedAt: ua.completedAt
      };
    });
    
    res.json(formattedAchievements);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar conquistas do usuário', error });
  }
});

// Atualizar progresso de conquista
router.post('/:id/progress', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    const userId = req.user.id;
    const achievementId = req.params.id;
    const { progress } = req.body;
    
    // Buscar a conquista
    const achievement = await Achievement.findById(achievementId);
    if (!achievement) {
      return res.status(404).json({ message: 'Conquista não encontrada' });
    }
    
    // Buscar ou criar registro de progresso do usuário
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
    userAchievement.progress = progress;
    
    // Verificar se completou
    if (progress >= 100 && !userAchievement.completed) {
      userAchievement.completed = true;
      userAchievement.completedAt = new Date();
      
      // Aqui poderia adicionar pontos ao usuário
    }
    
    await userAchievement.save();
    
    res.json(userAchievement);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar progresso', error });
  }
});

export default router;
