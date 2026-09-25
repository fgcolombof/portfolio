from fastapi import APIRouter
from fastapi_ai_advisor.app.v1.endpoints import advisor

api_router = APIRouter(prefix="/v1")

api_router.include_router(advisor.router, prefix="/advisor", tags=["advisor"])
