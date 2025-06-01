import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Função para gerar token JWT
export const generateToken = (user: any) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role
  };
  
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'adm_academy_secret_key_2025',
    { expiresIn: '7d' }
  );
};

const router = express.Router();

// Registro de usuário
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Verificar se usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }
    
    // Em um ambiente real, faríamos hash da senha
    // const hashedPassword = await bcrypt.hash(password, 10);
    
    // Criar novo usuário
    const user = new User({
      name,
      email,
      password, // Em produção: hashedPassword
      role: role || 'student'
    });
    
    await user.save();
    
    // Gerar token JWT
    const token = generateToken(user);
    
    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error });
  }
});

// Login de usuário
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuário
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    
    // Verificar senha
    // Em um ambiente real, usaríamos bcrypt.compare
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    
    // Atualizar último login
    // Em um ambiente real, atualizaríamos no banco
    
    // Gerar token JWT
    const token = generateToken(user);
    
    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao realizar login', error });
  }
});

// Obter perfil do usuário atual
router.get('/profile', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      level: user.level || 1,
      points: user.points || 0,
      streak: user.streak || 0,
      completedModules: user.completedModules || 0,
      totalModules: user.totalModules || 0,
      performanceData: user.performanceData || [],
      engagementData: user.engagementData || []
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar perfil', error });
  }
});

// Alterar senha
router.post('/change-password', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Dados incompletos' });
    }
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    // Verificar senha atual
    // Em um ambiente real, usaríamos bcrypt.compare
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha atual incorreta' });
    }
    
    // Atualizar senha
    // Em um ambiente real, faríamos hash da nova senha
    user.password = newPassword;
    await user.save();
    
    res.json({ message: 'Senha alterada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao alterar senha', error });
  }
});

export default router;
