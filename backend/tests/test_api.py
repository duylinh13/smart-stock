import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.database import get_db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.models import Base

# Setup a test database (SQLite in-memory)
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(scope="module", autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to SmartStock API"}

def test_get_products_empty():
    response = client.get("/products/")
    assert response.status_code == 200
    assert response.json() == []
