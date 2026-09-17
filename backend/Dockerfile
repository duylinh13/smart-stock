FROM python:3.11-slim

WORKDIR /app

# Install uv for fast dependency resolution
RUN pip install uv

# Copy project files
COPY .env.example .env

# Copy the backend module and other required files
COPY backend/ ./backend/
COPY alembic/ ./alembic/
COPY alembic.ini .

# Install dependencies using uv
RUN uv pip install --system fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv pydantic pydantic-settings alembic openai anthropic

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
