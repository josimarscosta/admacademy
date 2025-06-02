# Guia de Instalação e Uso - Adm Academy

## Requisitos do Sistema

- Node.js 16+ 
- MongoDB 4.4+ (ou MongoDB Atlas)
- NPM ou Yarn

## Instalação do Backend

1. Navegue até o diretório do backend:
```bash
cd adm_academy_full_app/backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Renomeie o arquivo `.env.example` para `.env` (ou use o existente)
   - Ajuste as configurações de conexão com o MongoDB Atlas

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
cd adm_academy_full_app/frontend_react
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Renomeie o arquivo `.env.example` para `.env` (ou use o existente)
   - Ajuste a URL da API para apontar para o backend

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
