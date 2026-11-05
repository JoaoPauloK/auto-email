# Auto Email - Intelligent Email Classification System

## 📧 Overview

**Auto Email** is a complete automatic email classification system that uses artificial intelligence to determine whether an email needs a response and to generate appropriate replies when needed.

## 🎯 Project Goal

### Problem Solved
In a world where we receive hundreds of emails every day, it is challenging to quickly identify which messages truly need attention and a response. Many emails are simply informational, spam, or automated messages that do not require action.

### Solution Provided
The system automatically analyzes email content and:
- **Classifies** emails as "Productive" (needs a response) or "Unproductive" (does not need a response)
- **Generates automatic responses** that are polite and context-aware for productive emails
- **Keeps a history** of all analyses performed
- **Supports multiple formats** (plain text, PDF, and TXT files)

## 🏗️ System Architecture

The project is divided into two main parts:

### 🎨 **Frontend** - User Interface
- **Technology**: React + TypeScript + Vite
- **UI/UX**: Modern interface with Tailwind CSS and Shadcn/ui
- **Features**: File upload, authentication, result viewing, and history

### ⚙️ **Backend** - API and AI
- **Technology**: FastAPI + Python
- **AI**: Integration with Hugging Face models for natural language processing
- **Database**: SQLAlchemy with MySQL for persistence
- **Security**: JWT authentication and password hashing with bcrypt

## 🚀 How It Works

```
1. 📝 User submits an email (text or file)
     ↓
2. 🔄 The system processes it with AI
     ↓
3. 🎯 Classifies it as Productive/Unproductive
     ↓
4. ✍️ Generates a response (if productive)
     ↓
5. 💾 Saves it to the history (if the user is logged in)
```

## 📋 Features

### ✅ **Main Features**
- Automatic email classification using AI
- Contextual response generation
- Intuitive and responsive web interface
- Complete authentication system
- Personal history of processed emails

### 📎 **Supported Formats**
- Plain text
- PDF files
- TXT files

### 👥 **Users**
- Anonymous mode (without history)
- Registered users (with complete history)

## 🛠️ Technologies Used

### Frontend
- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS + Shadcn/ui
- Axios for API communication

### Backend
- FastAPI (Python)
- SQLAlchemy + MySQL
- Hugging Face (AI models)
- JWT for authentication

### DevOps & Tools
- Git for versioning
- ESLint for code quality
- Python virtual environment

## 🚀 How to Run the Project

### Prerequisites
- Python 3.11+
- Node.js 18+
- MySQL (for the database)
- Hugging Face token

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/JoaoPauloK/auto-email.git
cd auto-email
```

2. **Set up and run the backend**
```bash
cd server
# Follow the instructions in server/src/README.md
```

3. **Set up and run the frontend**
```bash
cd client/auto-email-frontend
# Follow the instructions in client/README.md
```

### 📚 Detailed Documentation

For complete installation, configuration, and development instructions:

- **Backend**: [`server/src/README.md`](server/src/README.md)
- **Frontend**: [`client/README.md`](client/README.md)

## 📁 Project Structure

```
auto-email/
├── README.md              # This file (overview)
├── LICENSE                # MIT license
├── .gitignore             # Git ignored files
├── client/                # React frontend
│   ├── README.md          # Frontend documentation
│   └── auto-email-frontend/
│       ├── src/           # React source code
│       ├── public/        # Public assets
│       └── package.json   # Frontend dependencies
└── server/                # FastAPI backend
    ├── requirements.txt   # Python dependencies
    └── src/
        ├── README.md      # Backend documentation
        ├── main.py        # Main application
        ├── api/           # API routes
        ├── models/        # Database models
        ├── services/      # Business logic and AI
        └── utils/        # Utilities and security
```

## 🤝 Contributing

This is an academic/demo project. To contribute:

1. Fork the project
2. Create a branch for your feature
3. Commit your changes
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**João Paulo**
- GitHub: [@JoaoPauloK](https://github.com/JoaoPauloK)
- Email: joaocoimbra881@gmail.com

---

⭐ **If this project was useful, consider giving it a star on GitHub!**
