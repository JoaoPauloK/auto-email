# Auto Email Backend - FastAPI Server

## 📋 Objetivo

O backend do Auto Email é um sistema de classificação e resposta automática de emails usando inteligência artificial. O servidor processa emails recebidos, classifica-os como "produtivos" ou "improdutivos" e gera respostas automáticas apropriadas para emails produtivos.

### Funcionalidades Principais

- **Classificação de Emails**: Determina se um email necessita resposta (produtivo) ou não (improdutivo)
- **Geração de Respostas**: Cria respostas automáticas educadas e contextuais para emails produtivos  
- **Processamento de Arquivos**: Suporta texto simples, arquivos PDF e TXT
- **Autenticação de Usuários**: Sistema completo de login/registro com JWT
- **Histórico de Emails**: Armazena e recupera histórico de emails processados por usuário

## 🛠️ Tecnologias Utilizadas

### Framework Principal
- **[FastAPI](https://fastapi.tiangolo.com/)** - Framework web moderno e rápido para construir APIs com Python

### Principais Bibliotecas

#### AI e Machine Learning
- **[huggingface-hub](https://huggingface.co/docs/huggingface_hub)** - Cliente para modelos de IA da Hugging Face
- **[transformers](https://huggingface.co/transformers/)** - Biblioteca para processamento de linguagem natural

#### Processamento de Documentos
- **[pdfplumber](https://github.com/jsvine/pdfplumber)** - Extração de texto de arquivos PDF
- **[pdfminer.six](https://github.com/pdfminer/pdfminer.six)** - Parser avançado de PDFs

#### Banco de Dados
- **[SQLAlchemy](https://sqlalchemy.org/)** - ORM para interação com banco de dados
- **[PyMySQL](https://pymysql.readthedocs.io/)** - Driver MySQL para Python

#### Autenticação e Segurança
- **[PyJWT](https://pyjwt.readthedocs.io/)** - Implementação de JSON Web Tokens
- **[passlib](https://passlib.readthedocs.io/)** - Biblioteca para hash de senhas
- **[bcrypt](https://github.com/pyca/bcrypt/)** - Algoritmo de hash seguro

#### Servidor ASGI
- **[uvicorn](https://www.uvicorn.org/)** - Servidor ASGI para executar aplicações FastAPI

#### Utilitários
- **[python-dotenv](https://python-dotenv.readthedocs.io/)** - Carregamento de variáveis de ambiente
- **[python-multipart](https://andrew-d.github.io/python-multipart/)** - Processamento de formulários multipart

## 📁 Estrutura do Projeto

```
server/src/
├── main.py              # Arquivo principal da aplicação FastAPI
├── api/
│   └── router.py        # Rotas da API
├── database/
│   ├── __init__.py
│   ├── create_tables.py # Criação das tabelas do banco
│   ├── database.py      # Configuração do banco de dados
│   └── init_db.py       # Inicialização e conexão do banco
├── models/
│   ├── __init__.py
│   └── models.py        # Modelos SQLAlchemy (User, Email)
├── services/
│   ├── extract.py       # Extração de texto de PDFs e arquivos
│   └── infer.py         # Serviços de IA para classificação e resposta
└── utils/
    ├── __init__.py
    ├── security.py      # Funções de autenticação e JWT
    └── utils.py         # Utilitários gerais e schemas
```

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Python 3.11+ instalado
- pip (gerenciador de pacotes Python)

### 1. Preparação do Ambiente

```bash
# Navegar para o diretório do servidor
cd /home/joaopaulo/auto-email/server

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows
```

### 2. Instalação das Dependências

```bash
# Instalar todas as dependências
pip install -r requirements.txt

# Ou instalar manualmente as principais
pip install fastapi uvicorn sqlalchemy pymysql python-dotenv
pip install huggingface-hub pdfplumber passlib[bcrypt] python-jwt
```

### 3. Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto servidor:

```env
# Banco de Dados
DATABASE_URL=mysql+pymysql://usuario:senha@localhost/auto_email

# Frontend URL (para CORS)
FRONTEND_URL=http://localhost:3000

# JWT Secret
SECRET_KEY=sua_chave_secreta_muito_forte_aqui

# Hugging Face Token
HUGGINGFACE_TOKEN=seu_token_huggingface_aqui

# API URLs (opcional)
API_URL_TEXT_GENERATOR=url_do_modelo_de_geracao_de_texto
```

### 4. Preparação do Banco de Dados

```bash
# Navegar para o diretório src
cd src

# Executar criação das tabelas
python -m database.create_tables

# Ou inicializar banco completo
python -m database.init_db
```

### 5. Executar o Servidor

#### Desenvolvimento (com reload automático)
```bash
# A partir do diretório server/
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```
ou
```bash
# A partir do diretório server/
fastapi dev main.py
```

#### Produção
```bash
# Sem reload
uvicorn src.main:app --host 0.0.0.0 --port 8000

# Ou com múltiplos workers
gunicorn src.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### 6. Verificar Funcionamento

Após iniciar o servidor, acesse:

- **API Base**: http://localhost:8000
- **Documentação Interativa**: http://localhost:8000/docs
- **Documentação Redoc**: http://localhost:8000/redoc

## 📝 Endpoints da API

### Públicos (sem autenticação)
- `GET /` - Mensagem de boas-vindas
- `POST /new-no-user` - Processar email sem usuário
- `POST /new-file-no-user` - Processar arquivo sem usuário
- `POST /user` - Criar novo usuário
- `POST /login` - Fazer login

### Protegidos (requer autenticação)
- `POST /new` - Processar email com usuário
- `POST /new-file` - Processar arquivo com usuário  
- `GET /emails/` - Listar histórico de emails do usuário

## 🔧 Solução de Problemas

### Erro de Dependências
```bash
# Atualizar pip
pip install --upgrade pip

# Reinstalar dependências
pip install -r requirements.txt --force-reinstall
```

### Erro de Banco de Dados
```bash
# Recriar tabelas
python -m src.database.create_tables
```

### Erro de Token Hugging Face
```bash
# Verificar token no .env
echo $HUGGINGFACE_TOKEN
```

## 📚 Documentação Adicional

- [Documentação FastAPI](https://fastapi.tiangolo.com/)
- [SQLAlchemy ORM](https://docs.sqlalchemy.org/)
- [Hugging Face Hub](https://huggingface.co/docs/hub/index)

---

**Desenvolvido por:** João Paulo  
**Versão:** 1.0.0  
**Licença:** MIT