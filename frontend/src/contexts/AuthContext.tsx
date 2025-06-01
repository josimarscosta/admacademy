import React, { useState } from 'react';
import axios from 'axios';

// Definição da URL base da API
const API_URL = 'http://localhost:5000/api';

// Configuração do cliente axios
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token de autenticação
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interface para o contexto de autenticação
interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

// Criação do contexto de autenticação
export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => {},
  logout: () => {},
  error: null
});

// Provider do contexto de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Verificar se o usuário já está autenticado ao carregar a página
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Função de login
  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Em um ambiente real, faríamos uma chamada à API
      // Como estamos em modo simulado, vamos simular um login bem-sucedido
      
      // Simulação de resposta da API
      const mockResponse = {
        token: 'mock-jwt-token',
        user: {
          id: '123',
          name: 'Usuário Teste',
          email: email,
          role: 'student'
        }
      };
      
      // Armazenar token e dados do usuário
      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      
      setUser(mockResponse.user);
      console.log(`Login realizado com sucesso para: ${email}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao realizar login');
      console.error('Erro de login:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Valor do contexto
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  return React.useContext(AuthContext);
};

export default apiClient;
