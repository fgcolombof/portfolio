from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_ai_advisor.app.v1 import api_router
from fastapi_ai_advisor.app.core.logging import setup_logging

setup_logging()

app = FastAPI(
    title="FastAPI AI Advisor",
    description="AI Advisor Service for Software Project Showroom",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/")
async def root():
    return {"message": "FastAPI AI Advisor Service", "version": "0.1.0"}


@app.get("/health")
async def health():
    return {"status": "healthy", "service": "fastapi-ai-advisor"}
