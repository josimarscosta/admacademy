# Documentação Técnica - Adm Academy

## 1. Visão Geral da Plataforma

### 1.1 Introdução

A Adm Academy é uma plataforma educacional desenvolvida para preparação de estudantes para o ENADE 2025, com foco no curso de Administração. A plataforma integra tecnologias de IA, gamificação e análise de dados para oferecer uma experiência de aprendizado personalizada e engajadora.

### 1.2 Arquitetura do Sistema

A plataforma segue uma arquitetura cliente-servidor moderna:

- **Frontend**: Desenvolvido em React com TypeScript, utilizando componentes reutilizáveis e design responsivo
- **Backend**: API RESTful em Node.js/Express com MongoDB como banco de dados
- **Integrações**: Sistema de recomendação adaptativa, assistente virtual e analytics

### 1.3 Principais Funcionalidades

- Trilhas de aprendizado adaptativas
- Simulados interativos com banco de questões inteligente
- Sistema de gamificação (pontos, níveis, conquistas)
- Assistente virtual de estudos
- Dashboards personalizados por perfil de usuário
- Analytics educacional avançado

## 2. Especificações Técnicas

### 2.1 Tecnologias Utilizadas

#### Frontend
- React 18.x
- TypeScript 5.x
- TailwindCSS
- Shadcn/UI (componentes)
- Recharts (visualização de dados)
- React Router (navegação)

#### Backend
- Node.js 20.x
- Express 4.x
- MongoDB (banco de dados)
- Mongoose (ODM)
- JWT (autenticação)

### 2.2 Requisitos de Sistema

#### Servidor
- Node.js 18.x ou superior
- MongoDB 5.x ou superior
- 2GB RAM mínimo (4GB recomendado)
- 10GB de espaço em disco

#### Cliente (navegador)
- Chrome 90+, Firefox 90+, Safari 15+, Edge 90+
- JavaScript habilitado
- Cookies habilitados
- Resolução mínima: 320px (mobile) a 1920px (desktop)

### 2.3 Segurança

- Autenticação via JWT (JSON Web Tokens)
- Senhas armazenadas com hash bcrypt
- HTTPS obrigatório em produção
- Validação de entrada em todas as APIs
- Proteção contra ataques comuns (XSS, CSRF, injeção)

## 3. Estrutura do Código

### 3.1 Organização de Diretórios

```
adm_academy_app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
└── docs/
    ├── modulos_funcionalidades.md
    └── ...
```

### 3.2 Modelos de Dados

#### User
Representa usuários da plataforma com diferentes perfis (estudante, professor, coordenador, admin).

#### Course, Trail, Module
Estrutura hierárquica de conteúdo educacional.

#### Simulation, Question
Sistema de avaliação e banco de questões.

#### Achievement, UserPoints, UserAchievement
Sistema de gamificação e recompensas.

#### Recommendation, Analytics, UserActivity
Sistema de recomendação adaptativa e análise de dados.

### 3.3 Endpoints da API

#### Autenticação
- `POST /api/auth/login`: Autenticação de usuário
- `POST /api/auth/register`: Registro de novo usuário
- `POST /api/auth/forgot-password`: Recuperação de senha

#### Usuários
- `GET /api/users/profile`: Perfil do usuário atual
- `PATCH /api/users/profile`: Atualização de perfil

#### Trilhas e Módulos
- `GET /api/trails`: Lista de trilhas disponíveis
- `GET /api/trails/recommended`: Trilhas recomendadas
- `GET /api/trails/:id`: Detalhes de uma trilha
- `GET /api/modules/:id`: Conteúdo de um módulo

#### Simulados
- `GET /api/simulations`: Lista de simulados
- `GET /api/simulations/:id`: Detalhes de um simulado
- `POST /api/simulations/:id/start`: Iniciar simulado
- `POST /api/simulations/:id/submit`: Enviar respostas

#### Gamificação
- `GET /api/achievements/user`: Conquistas do usuário
- `POST /api/achievements/:id/progress`: Atualizar progresso

#### IA e Recomendações
- `GET /api/ai/recommendations`: Recomendações personalizadas
- `POST /api/ai/generate-recommendations`: Gerar novas recomendações
- `POST /api/ai/assistant/query`: Consultar assistente virtual

## 4. Guia de Instalação

### 4.1 Pré-requisitos

- Node.js 18.x ou superior
- MongoDB 5.x ou superior
- npm ou yarn

### 4.2 Configuração do Backend

1. Clone o repositório
   ```bash
   git clone https://github.com/unifor/adm-academy.git
   cd adm-academy/backend
   ```

2. Instale as dependências
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. Inicie o servidor de desenvolvimento
   ```bash
   npm run dev
   ```

### 4.3 Configuração do Frontend

1. Navegue até o diretório do frontend
   ```bash
   cd ../frontend
   ```

2. Instale as dependências
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. Inicie o servidor de desenvolvimento
   ```bash
   npm run dev
   ```

### 4.4 Implantação em Produção

1. Construa o frontend
   ```bash
   cd frontend
   npm run build
   ```

2. Configure o servidor de produção
   ```bash
   cd ../backend
   npm run build
   ```

3. Inicie o servidor em modo produção
   ```bash
   npm start
   ```

## 5. Manutenção e Suporte

### 5.1 Monitoramento

- Logs do sistema são armazenados em `/var/log/adm-academy/`
- Métricas de performance são coletadas via Prometheus
- Alertas são configurados para notificar administradores em caso de problemas

### 5.2 Backup e Recuperação

- Backups automáticos do banco de dados são realizados diariamente
- Procedimento de restauração:
  ```bash
  mongorestore --db adm_academy backup/adm_academy
  ```

### 5.3 Atualizações

- Atualizações de segurança devem ser aplicadas imediatamente
- Atualizações de funcionalidades devem ser testadas em ambiente de homologação
- Procedimento de atualização:
  ```bash
  git pull
  npm install
  npm run build
  npm start
  ```

## 6. Extensibilidade

### 6.1 Adição de Novos Cursos

Para adicionar novos cursos à plataforma:

1. Adicione o curso no painel administrativo
2. Configure as competências específicas do curso
3. Crie trilhas de aprendizado relacionadas
4. Adicione módulos de conteúdo
5. Configure simulados específicos

### 6.2 Integração com Outros Sistemas

A plataforma oferece uma API RESTful que pode ser integrada com:

- Sistemas acadêmicos institucionais
- Ambientes virtuais de aprendizagem (AVA)
- Sistemas de gestão de conteúdo (CMS)
- Ferramentas de análise de dados

### 6.3 Personalização Visual

A identidade visual pode ser personalizada através de:

- Configuração de temas no arquivo `frontend/src/theme/index.ts`
- Substituição do logo em `frontend/src/components/UniformLogo.tsx`
- Ajuste de cores e estilos em `frontend/src/styles/globals.css`

## 7. Solução de Problemas

### 7.1 Problemas Comuns

#### Erro de conexão com o banco de dados
- Verifique se o MongoDB está em execução
- Confirme as credenciais no arquivo `.env`
- Verifique as regras de firewall

#### Lentidão no carregamento de páginas
- Verifique a conexão de rede
- Monitore o uso de recursos do servidor
- Verifique se há consultas ineficientes no banco de dados

#### Erros de autenticação
- Verifique se o token JWT está sendo gerado corretamente
- Confirme se as rotas protegidas estão utilizando o middleware de autenticação
- Verifique se o tempo de expiração do token está configurado corretamente

### 7.2 Suporte Técnico

Para obter suporte técnico:

- Email: suporte@admacademy.unifor.br
- Telefone: (85) 3477-XXXX
- Portal de suporte: https://suporte.admacademy.unifor.br

## 8. Referências

- [Documentação do React](https://reactjs.org/docs/getting-started.html)
- [Documentação do Node.js](https://nodejs.org/en/docs/)
- [Documentação do MongoDB](https://docs.mongodb.com/)
- [Documentação do Express](https://expressjs.com/en/api.html)
- [Documentação do Mongoose](https://mongoosejs.com/docs/guide.html)
