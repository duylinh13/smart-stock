# SmartStock 🚀

**SmartStock** is an intelligent, full-stack inventory management and procurement recommendation system. Designed as a modern Micro-SaaS architecture, it automatically tracks stock levels, calculates the optimal Reorder Point (ROP) based on daily demand and supplier lead time, and leverages AI (Large Language Models) to provide human-readable, expert-level procurement recommendations.

![SmartStock Overview](https://img.shields.io/badge/Status-Production_Ready-success)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)
![Next.js](https://img.shields.io/badge/Frontend-Next.js_15-000000?logo=next.js)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql)
![Docker](https://img.shields.io/badge/DevOps-Docker_Compose-2496ED?logo=docker)

---

## ✨ Key Features
- **Data-Driven ROP Calculation:** Dynamically calculates when to reorder using the standard industry formula: `ROP = (Average Daily Demand × Lead Time) + Safety Stock`.
- **AI-Powered Insights (with Graceful Degradation):** Integrates with OpenAI APIs to transform raw stock numbers into actionable insights. Features a **Fail-Fast & Fallback mechanism** that mathematically calculates recommendations locally if the API key is missing or invalid, ensuring 100% system uptime.
- **Enterprise-Grade UI/UX:** Built with Next.js 15 and Tailwind CSS v4. Features a strict "Command Center" dark-mode design system.
- **Interactive Visualizations & Animations:** Utilizes **Recharts** for real-time inventory vs. ROP bar charts and **Framer Motion** for premium, staggered component animations.
- **Background Jobs:** Utilizes APScheduler for periodic background jobs (e.g., daily inventory sweep and alert generation).
- **Event-Driven Ready:** Pre-configured mock Kafka producers to emit events (e.g., `order_created`) allowing easy integration with microservices.
- **Fully Dockerized:** Spin up the entire stack (Database, Backend API, Frontend Dashboard) with a single command.
- **CI/CD Pipeline:** Includes GitHub Actions for automated unit/integration testing via Pytest.

## 🏗️ Architecture & Tech Stack

### 1. Backend (Python)
- **Framework:** FastAPI (High performance, async-ready)
- **Database ORM:** SQLAlchemy with Alembic (Migrations)
- **Background Tasks:** APScheduler
- **AI Integration:** OpenAI SDK (with resilient fallback logic)
- **Testing:** Pytest & HTTPX

### 2. Frontend (React/TypeScript)
- **Framework:** Next.js (App Router, Standalone Build)
- **State/Fetching:** TanStack React Query v5
- **Visuals & Motion:** Recharts, Framer Motion
- **Styling:** Tailwind CSS v4 + Custom Design Tokens
- **UI Library:** Lucide Icons

### 3. DevOps & Infrastructure
- **Containerization:** Docker & Docker Compose
- **Database Engine:** PostgreSQL 15 (Alpine)
- **CI/CD:** GitHub Actions (Automated testing on push/PR)

---

## 🚀 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/) & Docker Compose installed.
- (Optional) [uv](https://github.com/astral-sh/uv) installed if you want to run the Python backend locally without Docker.

### 1. Clone the repository
```bash
git clone https://github.com/duylinh13/smart-stock.git
cd smart-stock
```

### 2. Configure Environment Variables
Copy the example environment file and add your AI API key.
```bash
cp .env.example .env
# Edit .env and insert your OPENAI_API_KEY
```

### 3. Run with Docker Compose (Recommended)
This will start PostgreSQL, run database migrations automatically, and spin up both the Backend and Frontend servers.
```bash
docker-compose up --build -d
```

- **Frontend Dashboard:** [http://localhost:3000](http://localhost:3000)
- **Backend API Docs (Swagger):** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 📂 Project Structure
```text
.
├── .github/workflows/ci.yml    # CI/CD Pipeline
├── backend/
│   ├── events/                 # Kafka producers/consumers
│   ├── jobs/                   # APScheduler background tasks
│   ├── routers/                # FastAPI Endpoints (products, inventory, recommendations)
│   ├── schemas/                # Pydantic validation models
│   ├── services/               # Domain logic & AI integrations
│   ├── tests/                  # Pytest suite
│   ├── models.py               # SQLAlchemy Database Models
│   ├── main.py                 # FastAPI Application Entrypoint
│   └── Dockerfile              # Backend Container image
├── frontend/
│   ├── src/app/                # Next.js App Router (Pages & Layouts)
│   ├── src/components/         # Reusable UI components
│   ├── src/hooks/              # TanStack Query Hooks
│   ├── src/lib/                # API client & Utilities
│   └── Dockerfile              # Frontend Container image (Standalone mode)
├── docker-compose.yml          # Services Orchestration
└── alembic/                    # Database Migrations
```

## 🧪 Running Tests Locally
To run the backend test suite locally:
```bash
# Using uv (Lightning fast Python package manager)
uv pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic pydantic-settings alembic openai anthropic pytest httpx pytest-asyncio
export PYTHONPATH=.
uv run pytest
```

## 📜 License
This project is open-source and available under the MIT License.
