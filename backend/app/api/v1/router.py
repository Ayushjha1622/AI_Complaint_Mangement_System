from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.complaints import router as complaints_router
from app.api.v1.analytics import router as analytics_router
from app.api.v1.ai import router as ai_router

api_v1_router = APIRouter(prefix="/v1")

api_v1_router.include_router(auth_router)
api_v1_router.include_router(users_router)
api_v1_router.include_router(complaints_router)
api_v1_router.include_router(analytics_router)
api_v1_router.include_router(ai_router)
