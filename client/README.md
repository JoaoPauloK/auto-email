# Auto Email Frontend - React + TypeScript + Vite

## 📋 Objetivo

O frontend do Auto Email é uma interface moderna e responsiva para o sistema de classificação automática de emails. Permite aos usuários enviar emails (texto simples ou arquivos) para processamento por IA, visualizar resultados de classificação e gerenciar seu histórico de emails processados.

### Funcionalidades Principais

- **Interface Intuitiva**: Design moderno com tema escuro usando Tailwind CSS
- **Múltiplos Formatos**: Suporte para texto simples, arquivos PDF e TXT
- **Autenticação**: Sistema completo de login/registro de usuários
- **Histórico de Emails**: Visualização do histórico de emails processados
- **Resultados em Tempo Real**: Exibição imediata da classificação e resposta gerada
- **Responsivo**: Interface adaptável para diferentes tamanhos de tela

## 🛠️ Tecnologias Utilizadas

### Framework Base
- **[React 19](https://react.dev/)** - Biblioteca para construção de interfaces
- **[TypeScript](https://typescriptlang.org/)** - Superset tipado do JavaScript
- **[Vite](https://vitejs.dev/)** - Build tool moderna e rápida

### UI/UX
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Shadcn/ui](https://ui.shadcn.com/)** - Componentes reutilizáveis baseados em Radix UI
- **[Radix UI](https://radix-ui.com/)** - Componentes primitivos acessíveis
- **[Lucide React](https://lucide.dev/)** - Ícones modernos para React

### Gerenciamento de Estado e APIs
- **[Axios](https://axios-http.com/)** - Cliente HTTP para comunicação com API
- **[React Context](https://react.dev/reference/react/useContext)** - Gerenciamento de estado de autenticação

### Utilitários
- **[Sonner](https://sonner.emilkowal.ski/)** - Notificações toast elegantes
- **[Class Variance Authority](https://cva.style/)** - Utilitário para variantes de componentes
- **[clsx](https://github.com/lukeed/clsx)** - Utilitário para classes condicionais

## 📁 Estrutura do Projeto

```
client/auto-email-frontend/
├── public/
│   └── vite.svg             # Favicon e assets públicos
├── src/
│   ├── App.tsx              # Componente principal da aplicação
│   ├── main.tsx             # Ponto de entrada da aplicação
│   ├── index.css            # Estilos globais e Tailwind
│   ├── vite-env.d.ts        # Tipos do Vite
│   ├── api/
│   │   └── api.ts           # Configuração da API base
│   ├── components/
│   │   ├── FileUploader.tsx # Upload de arquivos PDF/TXT
│   │   ├── Footer.tsx       # Rodapé da aplicação
│   │   ├── History.tsx      # Modal de histórico de emails
│   │   ├── Login.tsx        # Modal de login
│   │   ├── Navbar.tsx       # Barra de navegação
│   │   ├── NewUser.tsx      # Modal de cadastro
│   │   ├── TextInput.tsx    # Input de texto para emails
│   │   └── ui/              # Componentes base do Shadcn/ui
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       └── ... (outros componentes)
│   ├── hooks/
│   │   └── use-file-upload.ts # Hook customizado para upload
│   ├── lib/
│   │   └── utils.ts         # Utilitários e helpers
│   ├── provider/
│   │   └── authProvider.tsx # Context de autenticação
│   └── services/
│       └── services.ts      # Serviços de API
├── components.json          # Configuração do Shadcn/ui
├── eslint.config.js         # Configuração do ESLint
├── package.json             # Dependências e scripts
├── tailwind.config.js       # Configuração do Tailwind CSS
├── tsconfig.json            # Configuração do TypeScript
├── tsconfig.app.json        # Configuração TS para aplicação
├── tsconfig.node.json       # Configuração TS para Node.js
└── vite.config.ts           # Configuração do Vite
```

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+ instalado
- npm, yarn ou pnpm (gerenciador de pacotes)

### 1. Preparação do Ambiente

```bash
# Navegar para o diretório do frontend
cd /home/joaopaulo/auto-email/client/auto-email-frontend

# Instalar dependências
npm install
# ou
yarn install
# ou
pnpm install
```

### 2. Configuração da API

Certifique-se de que o backend esteja rodando em `http://localhost:8000` ou configure a URL da API no arquivo de serviços.

```typescript
// src/api/api.ts
const API_BASE_URL = 'http://localhost:8000';
```

### 3. Executar em Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

A aplicação será executada em: **http://localhost:5173**

### 4. Build para Produção

```bash
# Gerar build de produção
npm run build
# ou
yarn build
# ou
pnpm build

# Visualizar build localmente
npm run preview
# ou
yarn preview
# ou
pnpm preview
```

### 5. Linting e Qualidade do Código

```bash
# Executar ESLint
npm run lint
# ou
yarn lint
# ou
pnpm lint
```

## 🎯 Fluxo da Aplicação

1. **Seleção de Input**: Usuário escolhe entre texto, PDF ou TXT
2. **Inserção de Dados**: Digita texto ou faz upload de arquivo
3. **Processamento**: Envia dados para API backend
4. **Resultado**: Exibe classificação (Produtiva/Improdutiva) e resposta gerada
5. **Histórico**: Usuários logados podem ver histórico completo

## 🔧 Solução de Problemas

### Erro de Dependências
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro de Build
```bash
# Verificar tipos TypeScript
npx tsc --noEmit

# Build com diagnósticos
npm run build -- --mode development
```

### Problema de CORS
Certifique-se de que o backend está configurado para aceitar requisições do frontend:
```python
# No backend FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # URL do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📚 Recursos Adicionais

- [Documentação React](https://react.dev/)
- [Guia TypeScript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Vite Guide](https://vitejs.dev/guide/)

---

**Desenvolvido por:** João Paulo  
**Versão:** 1.0.0  
**Licença:** MIT