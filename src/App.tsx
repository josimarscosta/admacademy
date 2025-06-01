import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './components/styles.css';
import Dashboard from './pages/Dashboard';

// Componentes de autenticação
const Login = () => (
  <div className="login-container">
    <div className="login-form">
      <img 
        src="https://www.unifor.br/documents/20143/3597199/logo-unifor-azul.png" 
        alt="Logo Unifor" 
        style={{ maxWidth: '200px', marginBottom: '20px' }}
      />
      <h1>Adm Academy</h1>
      <h2>Preparação para o ENADE 2025</h2>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Seu email institucional" />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input type="password" placeholder="Sua senha" />
        </div>
        <button type="button" className="btn-primary" onClick={() => window.location.href = '/dashboard'}>Entrar</button>
      </form>
      <div className="login-footer">
        <p>Esqueceu sua senha? <a href="#">Recuperar</a></p>
      </div>
    </div>
  </div>
);

// Componente de proteção de rotas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Aqui seria implementada a lógica real de autenticação
  const isAuthenticated = true; // Simulando autenticação para demonstração
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          {/* Redirecionar rotas desconhecidas para o login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
