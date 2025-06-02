# Guia de Instalação Manual - Adm Academy

Este guia fornece instruções detalhadas para instalar e configurar a plataforma Adm Academy em seu ambiente local ou servidor.

## Requisitos do Sistema

- Node.js 16+ (recomendado 18+)
- MongoDB 4.4+
- NPM 7+ ou PNPM 7+
- Git (opcional)

## Estrutura do Projeto

```
adm_academy/
├── backend/         # API e serviços
├── frontend/        # Interface de usuário
└── docs/            # Documentação
```

## 1. Instalação do Backend

### 1.1. Configuração do MongoDB

1. Instale o MongoDB seguindo as instruções oficiais para seu sistema operacional:
   - [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

2. Crie um banco de dados para a aplicação:
   ```bash
   mongosh
   > use adm_academy
   > exit
   ```

### 1.2. Configuração do Backend

1. Clone ou extraia os arquivos do backend para uma pasta local:
   ```bash
   mkdir -p adm_academy/backend
   # Copie os arquivos do backend para esta pasta
   cd adm_academy/backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   pnpm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. Principais configurações no arquivo `.env`:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/adm_academy
   JWT_SECRET=sua_chave_secreta_aqui
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   ```

5. Compile o TypeScript:
   ```bash
   npm run build
   # ou
   pnpm run build
   ```

6. Inicie o servidor:
   ```bash
   npm start
   # ou
   pnpm start
   ```

7. O backend estará disponível em `http://localhost:5000`

## 2. Instalação do Frontend

1. Clone ou extraia os arquivos do frontend para uma pasta local:
   ```bash
   mkdir -p adm_academy/frontend
   # Copie os arquivos do frontend para esta pasta
   cd adm_academy/frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   pnpm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. Principais configurações no arquivo `.env`:
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=Adm Academy
   VITE_APP_VERSION=1.0.0
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   pnpm run dev
   ```

6. Para build de produção:
   ```bash
   npm run build
   # ou
   pnpm run build
   ```

7. O frontend estará disponível em `http://localhost:5173` (desenvolvimento) ou pode ser servido a partir da pasta `dist` após o build.

## 3. Configuração Inicial

### 3.1. Criação de Usuário Administrador

1. Acesse o MongoDB e crie um usuário administrador:
   ```bash
   mongosh
   > use adm_academy
   > db.users.insertOne({
     name: "Administrador",
     email: "admin@exemplo.com",
     password: "$2b$10$X7o4cQPUdlBPJ.VjPtGw8.Y3FKh.KZYmhFGl9YAP4YIz0FBmjjUq6", // senha123
     role: "admin",
     createdAt: new Date(),
     updatedAt: new Date()
   })
   > exit
   ```

2. Faça login na plataforma com as credenciais:
   - Email: admin@exemplo.com
   - Senha: senha123

### 3.2. Importação de Dados Iniciais (Opcional)

1. Para importar dados de exemplo (trilhas, módulos, simulados):
   ```bash
   cd adm_academy/backend
   npm run seed
   # ou
   pnpm run seed
   ```

## 4. Personalização

### 4.1. Identidade Visual

1. Para personalizar a identidade visual, edite os arquivos:
   - `frontend/src/styles/variables.css` - Cores e estilos
   - `frontend/public/logo.svg` - Logo da plataforma
   - `frontend/public/favicon.ico` - Favicon

### 4.2. Configurações Avançadas

1. Configuração de email (para recuperação de senha):
   - Edite `backend/.env` e configure as variáveis SMTP

2. Integração com serviços externos:
   - Edite `backend/src/config/services.ts`

## 5. Implantação em Produção

### 5.1. Backend

1. Para implantação em produção, recomendamos:
   - Usar PM2 para gerenciamento de processos
   - Configurar NGINX como proxy reverso
   - Habilitar HTTPS com certificados SSL

2. Exemplo de configuração PM2:
   ```bash
   npm install -g pm2
   cd adm_academy/backend
   pm2 start dist/index.js --name adm-academy-backend
   ```

### 5.2. Frontend

1. Para implantação do frontend:
   - Gere o build de produção: `npm run build`
   - Sirva os arquivos estáticos com NGINX ou similar

2. Exemplo de configuração NGINX:
   ```nginx
   server {
     listen 80;
     server_name seu-dominio.com;
     
     location / {
       root /caminho/para/adm_academy/frontend/dist;
       try_files $uri $uri/ /index.html;
     }
     
     location /api {
       proxy_pass http://localhost:5000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

## 6. Solução de Problemas

### 6.1. Backend

- **Erro de conexão com MongoDB**: Verifique se o MongoDB está em execução e se a URI está correta
- **Erro de JWT**: Verifique se a chave secreta está configurada corretamente
- **Erro de CORS**: Verifique as configurações de CORS no arquivo `backend/src/index.ts`

### 6.2. Frontend

- **Erro de API não encontrada**: Verifique se a URL da API está configurada corretamente no arquivo `.env`
- **Erro de build**: Verifique se todas as dependências estão instaladas corretamente

## 7. Suporte

Para suporte adicional, consulte a documentação completa na pasta `docs/` ou entre em contato com nossa equipe de suporte.

---

© 2025 Adm Academy - Todos os direitos reservados
