# 🎯 AI Interview Coach

An intelligent interview preparation platform built with **Java Spring Boot** backend and **React** frontend, powered by **OpenAI GPT-4o**. Practice interviews, get AI-evaluated scores, and improve with detailed feedback!

---

## 🚀 Features

- 🤖 **AI-Generated Questions** — Role-specific questions at Easy/Medium/Hard difficulty
- 📊 **Score out of 10** — Instant evaluation after each answer
- ✅ **Strengths & Improvements** — Know exactly what you did right and wrong
- 💡 **Ideal Answer Shown** — Learn the perfect way to answer
- 🎯 **Pro Tips** — One actionable tip per question
- 📋 **Full Session Review** — See all answers and feedback at the end
- 🎨 **Modern Dark UI** — Clean, professional React interface
- 10+ Job Roles — Software Engineer, Java Developer, AI/ML Engineer, and more

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
        ↓ Axios HTTP
Spring Boot Backend (Port 8080)
        ↓ REST API Call
OpenAI GPT-4o
        ↓ JSON Response
Score + Feedback + Ideal Answer
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 18+
- OpenAI API Key

### Backend Setup
```bash
cd backend
export OPENAI_API_KEY=your_openai_api_key_here   # Mac/Linux
set OPENAI_API_KEY=your_openai_api_key_here       # Windows
mvn spring-boot:run
```
Backend runs at: `http://localhost:8080`

### Frontend Setup
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
│   │   ├── InterviewCoachApplication.java   # Main Spring Boot app
│   │   ├── controller/
│   │   │   └── InterviewController.java     # REST API endpoints
│   │   ├── service/
│   │   │   └── OpenAIService.java           # GPT-4o integration
│   │   └── dto/
│   │       ├── InterviewRequest.java
│   │       ├── InterviewResponse.java
│   │       └── QuestionResponse.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                          # Main React app + routing
│   │   ├── App.css                          # Dark theme styling
│   │   ├── main.jsx                         # Entry point
│   │   └── pages/
│   │       ├── Home.jsx                     # Role & difficulty setup
│   │       ├── Interview.jsx                # Q&A + live feedback
│   │       └── Results.jsx                  # Final score & review
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/interview/questions` | Generate interview questions |
| POST | `/api/interview/evaluate` | Evaluate candidate answer |
| GET | `/api/interview/health` | Health check |

### Example Request — Generate Questions
```
GET /api/interview/questions?jobRole=Java Developer&difficulty=medium&count=5
```

### Example Request — Evaluate Answer
```json
POST /api/interview/evaluate
{
  "jobRole": "Java Developer",
  "question": "Explain OOP concepts in Java",
  "userAnswer": "OOP stands for Object Oriented Programming...",
  "difficulty": "medium"
}
```

### Example Response
```json
{
  "score": 8,
  "grade": "A",
  "feedback": "Good explanation with clear examples...",
  "idealAnswer": "A perfect answer would include...",
  "strengths": ["Clear explanation", "Used examples"],
  "improvements": ["Could mention abstraction more"],
  "tip": "Always link OOP concepts to real-world scenarios"
}
```

---

## 🎯 Supported Job Roles

Software Engineer • Java Developer • Python Developer • Full Stack Developer • Data Analyst • AI/ML Engineer • Application Support Engineer • DevOps Engineer • Frontend Developer • Backend Developer • Custom Role

---

## 📌 Future Improvements

- [ ] Voice input support (Whisper API)
- [ ] Save session history to MySQL database
- [ ] User authentication with Spring Security
- [ ] PDF report download after session
- [ ] Timer per question
- [ ] Company-specific interview modes (Google, Amazon, TCS)

---

## 👩‍💻 Author

**Mounika Patnam**
Java Full Stack | Python | AWS | GenAI
[LinkedIn](https://linkedin.com/in/mounika-patnam) | [GitHub](https://github.com/patnammounika)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
