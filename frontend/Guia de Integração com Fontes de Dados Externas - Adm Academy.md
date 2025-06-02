# Guia de Integração com Fontes de Dados Externas - Adm Academy

Este guia explica como configurar e utilizar as novas funcionalidades de integração com fontes de dados externas na plataforma Adm Academy.

## 1. Visão Geral

A plataforma Adm Academy agora suporta três fontes de dados diferentes:

1. **Local** - Dados armazenados localmente no servidor Streamlit (padrão)
2. **GitHub** - Dados carregados diretamente de um repositório GitHub
3. **Nuvem** - Dados carregados de serviços de armazenamento em nuvem (Google Drive, Dropbox, Amazon S3)

## 2. Configuração do GitHub

### Requisitos
- Um repositório GitHub público ou privado
- Arquivos de dados no formato JSON, CSV ou Excel

### Estrutura de Diretórios Recomendada
```
seu-repositorio/
├── data/
│   ├── users.json
│   ├── trails.json
│   ├── simulations.json
│   ├── achievements.json
│   └── outros_arquivos.json
└── README.md
```

### Como Configurar
1. Faça login na plataforma como Coordenador
2. No menu lateral, selecione a fonte de dados "GitHub"
3. Insira o nome do repositório no formato `usuario/repositorio`
4. Especifique o branch (geralmente `main` ou `master`)
5. Clique em "Salvar Configurações GitHub"

### Observações
- Os arquivos devem estar na pasta `data/` do repositório
- Os nomes dos arquivos devem corresponder aos esperados pela aplicação
- Para repositórios privados, será necessário configurar tokens de acesso

## 3. Configuração de Serviços de Nuvem

A plataforma suporta três serviços de armazenamento em nuvem:

### Google Drive
1. Faça login na plataforma como Coordenador
2. No menu lateral, selecione a fonte de dados "Nuvem"
3. Escolha "Google Drive" no seletor de serviço
4. Clique em "Configurar Serviço de Nuvem"
5. Siga as instruções de autenticação

### Dropbox
1. Faça login na plataforma como Coordenador
2. No menu lateral, selecione a fonte de dados "Nuvem"
3. Escolha "Dropbox" no seletor de serviço
4. Clique em "Configurar Serviço de Nuvem"
5. Siga as instruções de autenticação

### Amazon S3
1. Faça login na plataforma como Coordenador
2. No menu lateral, selecione a fonte de dados "Nuvem"
3. Escolha "Amazon S3" no seletor de serviço
4. Clique em "Configurar Serviço de Nuvem"
5. Siga as instruções de autenticação

## 4. Formatos de Arquivo Suportados

A plataforma suporta os seguintes formatos de arquivo:

- **JSON** - Para estruturas de dados complexas (usuários, trilhas, conquistas)
- **CSV** - Para dados tabulares (resultados de simulados, estatísticas)
- **Excel** - Para planilhas com múltiplas abas (relatórios complexos)

## 5. Exemplos de Uso

### Exemplo de arquivo users.json
```json
[
  {
    "id": "1",
    "name": "Estudante Teste",
    "email": "estudante@unifor.br",
    "password": "senha123",
    "role": "student",
    "progress": {
      "trails_completed": 2,
      "trails_in_progress": 3,
      "simulations_completed": 5,
      "points": 1250,
      "level": 3
    }
  },
  {
    "id": "2",
    "name": "Professor Teste",
    "email": "professor@unifor.br",
    "password": "senha123",
    "role": "teacher",
    "progress": {
      "trails_completed": 0,
      "trails_in_progress": 0,
      "simulations_completed": 0,
      "points": 0,
      "level": 1
    }
  }
]
```

### Exemplo de arquivo trails.json
```json
[
  {
    "id": "1",
    "title": "Formação Geral",
    "description": "Conteúdos gerais para todos os cursos",
    "modules": [
      {"id": "1-1", "title": "Ética e Cidadania", "completed": true},
      {"id": "1-2", "title": "Diversidade Cultural", "completed": true},
      {"id": "1-3", "title": "Meio Ambiente e Sustentabilidade", "completed": false}
    ],
    "progress": 66,
    "image": "🌎"
  }
]
```

## 6. Limitações e Considerações

### GitHub
- Repositórios privados requerem configuração adicional de autenticação
- Atualizações no repositório podem levar alguns minutos para refletir na aplicação
- Limite de requisições por hora para a API do GitHub

### Google Drive
- Requer autenticação OAuth
- Melhor para arquivos que são atualizados frequentemente
- Suporta controle de acesso granular

### Dropbox
- Requer autenticação OAuth
- Bom para compartilhamento de arquivos entre equipes
- Interface familiar para usuários não técnicos

### Amazon S3
- Requer credenciais AWS
- Melhor para grandes volumes de dados
- Oferece maior controle sobre custos e desempenho

## 7. Solução de Problemas

### Erro ao carregar dados do GitHub
- Verifique se o repositório e o branch estão corretos
- Confirme que os arquivos estão na pasta `data/`
- Verifique se o formato dos arquivos está correto

### Erro ao conectar com serviços de nuvem
- Verifique as credenciais de autenticação
- Confirme que os arquivos têm permissões de acesso corretas
- Tente reautenticar o serviço

### Dados não atualizados
- A aplicação pode estar usando cache
- Tente mudar a fonte de dados e voltar
- Reinicie a aplicação Streamlit

## 8. Próximos Passos

Para utilizar plenamente estas funcionalidades, recomendamos:

1. Criar um repositório GitHub dedicado para os dados da Adm Academy
2. Organizar os arquivos na estrutura recomendada
3. Configurar a aplicação para usar o GitHub como fonte de dados
4. Para dados sensíveis, considerar o uso de serviços de nuvem com autenticação
