# 🎯 AI Interview Coach

> Practice interviews with AI-powered scoring, feedback, and ideal answers — built with Java Spring Boot + React + OpenAI GPT-4o

<p align="center">
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white"/>
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white"/>
  <img src="https://img.shields.io/badge/REST_API-009688?style=for-the-badge"/>
</p>

---

## 🚀 Features

- 🤖 **AI-Generated Questions** — Role-specific questions at Easy / Medium / Hard difficulty
- 📊 **Score out of 10** — Instant AI evaluation after each answer
- ✅ **Strengths & Improvements** — Know exactly what you did right and wrong
- 💡 **Ideal Answer** — Learn the perfect way to answer every question
- 🎯 **Pro Tips** — One actionable tip per question
- 📋 **Full Session Review** — See all answers and feedback at the end
- 🎨 **Modern Dark UI** — Clean, professional React interface
- 🎭 **10+ Job Roles** — Software Engineer, Java Developer, AI/ML Engineer & more

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Java 17 + Spring Boot 3.2 |
| REST API | Spring Web + Jackson |
| AI Engine | OpenAI GPT-4o |
| Frontend | React 18 + Vite |
| HTTP Client | Axios |
| Styling | Custom CSS (Dark Theme) |

---

## 🏗️ Architecture

```
React Frontend (Port 3000)
        ↓ Axios HTTP Request
Spring Boot Backend (Port 8080)
        ↓ REST API Call
OpenAI GPT-4o
        ↓ JSON Response
Score + Feedback + Ideal Answer + Tips
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 18+
- OpenAI API Key → [Get here](https://platform.openai.com/api-keys)

### 1. Clone the Repository
```bash
git clone https://github.com/patnammounika/ai-interview-coach.git
cd ai-interview-coach
```

### 2. Run Backend
```bash
cd backend
set OPENAI_API_KEY=your_openai_api_key_here
mvn spring-boot:run
```
Backend runs at: `http://localhost:8080`

### 3. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:3000`

---

## 📁 Project Structure

```
ai-interview-coach/
│
├── backend/
│   ├── src/main/java/com/interviewcoach/
│   │   ├── InterviewCoachApplication.java
│   │   ├── controller/
│   │   │   └── InterviewController.java
│   │   ├── service/
│   │   │   └── OpenAIService.java
│   │   └── dto/
│   │       ├── InterviewRequest.java
│   │       ├── InterviewResponse.java
│   │       └── QuestionResponse.java
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── pages/
│   │       ├── Home.jsx
│   │       ├── Interview.jsx
│   │       └── Results.jsx
│   └── package.json
│
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/interview/questions` | Generate interview questions |
| POST | `/api/interview/evaluate` | Evaluate candidate answer |
| GET | `/api/interview/health` | Health check |

### Generate Questions
```
GET /api/interview/questions?jobRole=Java Developer&difficulty=medium&count=5
```

### Evaluate Answer
```json
POST /api/interview/evaluate
{
  "jobRole": "Java Developer",
  "question": "Explain OOP concepts in Java",
  "userAnswer": "OOP stands for Object Oriented Programming...",
  "difficulty": "medium"
}
```

### Response
```json
{
  "score": 8,
  "grade": "A",
  "feedback": "Good explanation with clear examples...",
  "idealAnswer": "A perfect answer would include...",
  "strengths": ["Clear explanation", "Used real examples"],
  "improvements": ["Could mention abstraction more"],
  "tip": "Always link OOP concepts to real-world scenarios"
}
```

---

## 🎭 Supported Job Roles

Software Engineer • Java Developer • Python Developer • Full Stack Developer • Data Analyst • AI/ML Engineer • Application Support Engineer • DevOps Engineer • Frontend Developer • Backend Developer • Custom Role

---

## 📌 Future Improvements

- [ ] Voice input support using Whisper API
- [ ] Save session history to MySQL database
- [ ] User authentication with Spring Security
- [ ] PDF report download after session
- [ ] Timer per question
- [ ] Company-specific modes (Google, Amazon, TCS, Infosys)

---

## 👩‍💻 Author

**Mounika Patnam**
Java Full Stack | Python | AWS | GenAI
[LinkedIn](https://linkedin.com/in/mounika-patnam) | [GitHub](https://github.com/patnammounika)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
