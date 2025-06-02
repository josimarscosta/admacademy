# Configuração do Backend para Serviços de Hospedagem

Este documento apresenta as opções e configurações para hospedar o backend da plataforma Adm Academy em diferentes serviços de hospedagem.

## Opções de Hospedagem

### 1. Render

**Vantagens:**
- Tier gratuito generoso
- Suporte nativo para Node.js
- Integração com MongoDB Atlas
- Deploy automático via GitHub
- SSL gratuito

**Configuração necessária:**
- Arquivo `render.yaml` na raiz do projeto
- Variáveis de ambiente configuradas no dashboard

### 2. Railway

**Vantagens:**
- Interface moderna e intuitiva
- Bom desempenho
- Suporte para Node.js e MongoDB
- Deploy automático via GitHub
- Monitoramento integrado

**Configuração necessária:**
- Arquivo `railway.json` na raiz do projeto
- Variáveis de ambiente configuradas no dashboard

### 3. Heroku

**Vantagens:**
- Plataforma estabelecida e confiável
- Bom suporte para Node.js
- Integração com add-ons (MongoDB Atlas)
- Escalabilidade

**Configuração necessária:**
- Arquivo `Procfile` na raiz do projeto
- Variáveis de ambiente configuradas no dashboard

## Preparação do Backend

Para garantir compatibilidade com qualquer um desses serviços, as seguintes adaptações são necessárias:

### 1. Configuração de Porta Dinâmica

```javascript
const PORT = process.env.PORT || 5000;
```

### 2. Configuração de CORS para Frontend no GitHub Pages

```javascript
app.use(cors({
  origin: ['https://seu-usuario.github.io', 'http://localhost:3000'],
  credentials: true
}));
```

### 3. Conexão com MongoDB Atlas

```javascript
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

### 4. Scripts de Inicialização

```json
"scripts": {
  "start": "node dist/index.js",
  "build": "tsc",
  "dev": "nodemon --exec ts-node src/index.ts"
}
```

## Arquivos de Configuração

### render.yaml

```yaml
services:
  - type: web
    name: adm-academy-backend
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        sync: false
```

### railway.json

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Procfile (Heroku)

```
web: npm start
```

## Integração com Frontend no GitHub Pages

Para que o frontend no GitHub Pages possa se comunicar com o backend hospedado, é necessário:

1. Atualizar a URL da API no frontend:

```typescript
// src/contexts/AuthContext.tsx
const API_URL = 'https://seu-backend-url.com/api';
```

2. Garantir que o CORS esteja configurado corretamente no backend para permitir requisições do domínio do GitHub Pages.

3. Utilizar variáveis de ambiente no frontend para alternar entre ambientes de desenvolvimento e produção:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'https://seu-backend-url.com/api';
```

## Próximos Passos

1. Escolher o serviço de hospedagem preferido
2. Configurar o MongoDB Atlas
3. Implantar o backend no serviço escolhido
4. Atualizar a URL da API no frontend
5. Reimplantar o frontend no GitHub Pages
