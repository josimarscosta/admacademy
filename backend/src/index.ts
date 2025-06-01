import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

// Rotas
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import courseRoutes from './routes/course.routes';
import trailRoutes from './routes/trail.routes';
import moduleRoutes from './routes/module.routes';
import simulationRoutes from './routes/simulation.routes';
import analyticsRoutes from './routes/analytics.routes';
import achievementRoutes from './routes/achievement.routes';
import aiRoutes from './routes/ai.routes';

// Middleware
import { authMiddleware } from './middleware/auth.middleware';

// Configuração
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Configuração para usar MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adm_academy';

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Rotas públicas
app.use('/api/auth', authRoutes);

// Middleware de autenticação para rotas protegidas
app.use('/api', authMiddleware);

// Rotas protegidas
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/trails', trailRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/simulations', simulationRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/ai', aiRoutes);

// Rota de status
app.get('/api/status', (req, res) => {
  res.json({ status: 'online', version: '1.0.0', environment: process.env.NODE_ENV });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API da Adm Academy' });
});

// Tratamento de erros
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Erro interno do servidor',
      status: err.status || 500
    }
  });
});

// Inicialização do servidor com conexão ao MongoDB Atlas
console.log('Tentando conectar ao MongoDB Atlas...');
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB Atlas com sucesso');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB Atlas:', error);
    console.log('Iniciando servidor em modo simulado (sem MongoDB)');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT} em modo simulado`);
    });
  });

export default app;
