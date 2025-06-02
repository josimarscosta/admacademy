import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';

const router = express.Router();

// Registro de usuário
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Verificar se usuário já existe
    // Em um ambiente real, buscaríamos no banco
    const existingUser = false;
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }
    
    // Em um ambiente real, faríamos hash da senha
    // const hashedPassword = await bcrypt.hash(password, 10);
    
    // Criar novo usuário
    const user = {
      _id: Date.now().toString(),
      name,
      email,
      password, // Em produção: hashedPassword
      role: role || 'student'
    };
    
    // Gerar token JWT
    const payload = { 
      id: user._id, 
      email: user.email, 
      role: user.role 
    };
    
    const secret = process.env.JWT_SECRET || 'adm_academy_secret_key_2025';
    const options: SignOptions = { 
      expiresIn: 604800 // 7 dias em segundos
    };
    
    const token = jwt.sign(payload, secret, options);
    
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
    // Em um ambiente real, buscaríamos no banco
    const user = {
      _id: '123456',
      name: 'Usuário Teste',
      email: email,
      password: password,
      role: 'student'
    };
    
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    
    // Verificar senha
    // Em um ambiente real, usaríamos bcrypt.compare
    const isPasswordValid = user.password === password;
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    
    // Gerar token JWT
    const payload = { 
      id: user._id, 
      email: user.email, 
      role: user.role 
    };
    
    const secret = process.env.JWT_SECRET || 'adm_academy_secret_key_2025';
    const options: SignOptions = { 
      expiresIn: 604800 // 7 dias em segundos
    };
    
    const token = jwt.sign(payload, secret, options);
    
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

// Recuperação de senha
router.post('/forgot-password', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    // Verificar se usuário existe
    // Em um ambiente real, buscaríamos no banco
    
    // Por segurança, não informamos que o email não existe
    res.json({ message: 'Se o email estiver cadastrado, você receberá instruções para redefinir sua senha.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar solicitação', error });
  }
});

// Verificar token
router.get('/verify-token', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ valid: false });
    }
    
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET || 'adm_academy_secret_key_2025');
    
    res.json({ valid: true });
  } catch (error) {
    res.status(401).json({ valid: false });
  }
});

export default router;
