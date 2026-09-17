from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import products, inventory, recommendations

app = FastAPI(
    title="SmartStock API",
    description="Mini system for inventory tracking and procurement recommendations",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(inventory.router)
app.include_router(recommendations.router)

@app.get("/")
def root():
    return {"message": "Welcome to SmartStock API"}
