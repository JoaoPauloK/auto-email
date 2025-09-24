# Auto Email - Sistema Inteligente de Classificação de Emails

## 📧 Visão Geral

O **Auto Email** é um sistema completo de classificação automática de emails que utiliza inteligência artificial para determinar se um email necessita de resposta e gerar respostas apropriadas quando necessário.

## 🎯 Objetivo do Projeto

### Problema Resolvido
Em um mundo onde recebemos centenas de emails diariamente, é desafiador identificar rapidamente quais mensagens realmente precisam de atenção e resposta. Muitos emails são apenas informativos, spam, ou mensagens automáticas que não requerem ação.

### Solução Oferecida
O sistema analisa automaticamente o conteúdo de emails e:
- **Classifica** como "Produtivo" (precisa de resposta) ou "Improdutivo" (não precisa de resposta)
- **Gera respostas automáticas** educadas e contextuais para emails produtivos
- **Mantém histórico** de todas as análises realizadas
- **Suporta múltiplos formatos** (texto simples, PDF, arquivos TXT)

## 🏗️ Arquitetura do Sistema

O projeto é dividido em duas partes principais:

### 🎨 **Frontend** - Interface do Usuário
- **Tecnologia**: React + TypeScript + Vite
- **UI/UX**: Interface moderna com Tailwind CSS e Shadcn/ui
- **Funcionalidades**: Upload de arquivos, autenticação, visualização de resultados e histórico

### ⚙️ **Backend** - API e IA
- **Tecnologia**: FastAPI + Python
- **IA**: Integração com modelos Hugging Face para processamento de linguagem natural
- **Banco de Dados**: SQLAlchemy com MySQL para persistência de dados
- **Segurança**: Autenticação JWT e hash de senhas com bcrypt

## 🚀 Como Funciona

```
1. 📝 Usuário insere email (texto ou arquivo)
     ↓
2. 🔄 Sistema processa com IA
     ↓  
3. 🎯 Classifica como Produtivo/Improdutivo
     ↓
4. ✍️ Gera resposta (se produtivo)
     ↓
5. 💾 Salva no histórico (se usuário logado)
```

## 📋 Funcionalidades

### ✅ **Principais**
- Classificação automática de emails usando IA
- Geração de respostas contextuais
- Interface web intuitiva e responsiva
- Sistema completo de autenticação
- Histórico pessoal de emails processados

### 📎 **Formatos Suportados**
- Texto simples
- Arquivos PDF
- Arquivos TXT

### 👥 **Usuários**
- Modo anônimo (sem histórico)
- Usuários registrados (com histórico completo)

## 🛠️ Tecnologias Utilizadas

### Frontend
- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS + Shadcn/ui
- Axios para comunicação com API

### Backend  
- FastAPI (Python)
- SQLAlchemy + MySQL
- Hugging Face (modelos de IA)
- JWT para autenticação

### DevOps & Ferramentas
- Git para versionamento
- ESLint para qualidade de código
- Ambiente virtual Python

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Python 3.11+
- Node.js 18+
- MySQL (para banco de dados)
- Token da Hugging Face

### Execução Rápida

1. **Clone o repositório**
```bash
git clone https://github.com/JoaoPauloK/auto-email.git
cd auto-email
```

2. **Configure e execute o backend**
```bash
cd server
# Siga as instruções em server/src/README.md
```

3. **Configure e execute o frontend**
```bash
cd client/auto-email-frontend  
# Siga as instruções em client/README.md
```

### 📚 Documentação Detalhada

Para instruções completas de instalação, configuração e desenvolvimento:

- **Backend**: [`server/src/README.md`](server/src/README.md)
- **Frontend**: [`client/README.md`](client/README.md)

## 📁 Estrutura do Projeto

```
auto-email/
├── README.md              # Este arquivo (visão geral)
├── .gitignore            # Arquivos ignorados pelo Git
├── client/               # Frontend React
│   ├── README.md         # Documentação do frontend
│   └── auto-email-frontend/
│       ├── src/          # Código fonte React
│       ├── public/       # Assets públicos
│       └── package.json  # Dependências frontend
└── server/               # Backend FastAPI
    ├── requirements.txt  # Dependências Python
    └── src/              
        ├── README.md     # Documentação do backend
        ├── main.py       # Aplicação principal
        ├── api/          # Rotas da API
        ├── models/       # Modelos do banco
        ├── services/     # Lógica de negócio e IA
        └── utils/        # Utilitários e segurança
```

## 🤝 Contribuição

Este é um projeto acadêmico/demonstrativo. Para contribuições:

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja os arquivos de documentação específicos para mais detalhes.

## 👨‍💻 Autor

**João Paulo**  
- GitHub: [@JoaoPauloK](https://github.com/JoaoPauloK)
- Email: joaocoimbra881@gmail.com

---

⭐ **Se este projeto foi útil, considere dar uma estrela no repositório!**