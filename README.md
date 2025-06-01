# Guia de Instalação Manual - Adm Academy

Este guia contém instruções detalhadas para instalar e configurar a plataforma Adm Academy em seu ambiente local.

## Estrutura do Pacote

```
adm_academy_manual_completo/
├── README.md                 # Este arquivo com instruções gerais
├── backend/                  # Código-fonte do backend (Node.js/Express)
│   ├── src/                  # Código TypeScript do backend
│   ├── package.json          # Dependências do backend
│   ├── tsconfig.json         # Configuração do TypeScript
│   └── .env                  # Variáveis de ambiente
├── frontend/                 # Código-fonte do frontend (React)
│   ├── src/                  # Código TypeScript do frontend
│   ├── package.json          # Dependências do frontend
│   ├── tsconfig.json         # Configuração do TypeScript
│   ├── vite.config.ts        # Configuração do Vite
│   └── .env                  # Variáveis de ambiente
└── docs/                     # Documentação adicional
```

## Requisitos do Sistema

- Node.js 16+ 
- MongoDB 4.4+ (ou MongoDB Atlas)
- NPM ou Yarn

## Instalação do Backend

1. Navegue até o diretório do backend:
```bash
cd adm_academy_manual_completo/backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Verifique o arquivo `.env` e ajuste as configurações de conexão com o MongoDB Atlas
   - Exemplo de configuração:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://seu_usuario:sua_senha@cluster0.mongodb.net/adm_academy?retryWrites=true&w=majority
   JWT_SECRET=sua_chave_secreta
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   ```

4. Compile o TypeScript:
```bash
npm run build
```

5. Inicie o servidor:
```bash
npm start
```

O backend estará disponível em: http://localhost:5000

## Instalação do Frontend

1. Navegue até o diretório do frontend:
```bash
cd adm_academy_manual_completo/frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Verifique o arquivo `.env` e ajuste a URL da API para apontar para o backend
   - Exemplo de configuração:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Para build de produção:
```bash
npm run build
```

O frontend estará disponível em: http://localhost:3000

## Acessando a Plataforma

1. Abra o navegador e acesse http://localhost:3000
2. Faça login com as credenciais padrão:
   - Email: admin@admacademy.com
   - Senha: admin123

## Funcionalidades Implementadas

- Dashboard com gráficos de barras e pizza
- Sistema de gamificação com conquistas
- Assistente virtual de estudos
- Trilhas de aprendizado personalizadas
- Simulados interativos
- Integração com identidade visual da Unifor

## Solução de Problemas

### Erro de conexão com MongoDB
- Verifique se as credenciais no arquivo .env estão corretas
- Confirme se o IP está na lista de permissões do MongoDB Atlas

### Erro ao iniciar o frontend
- Verifique se todas as dependências foram instaladas
- Confirme se a URL da API está configurada corretamente

## Suporte

Para suporte adicional, entre em contato com a equipe de desenvolvimento.
