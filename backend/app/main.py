from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

from fastapi.exceptions import RequestValidationError
from app.core.config import settings
from app.core.exceptions import (
    APIException,
    api_exception_handler,
    validation_exception_handler,
)
from app.core.database import engine, init_db, SessionLocal
from app.db.seed import seed_admin
from app.repositories.user_repository import UserRepository
from app.api.v1.router import api_v1_router

logger.add(
    "logs/api.log",
    rotation="50 MB",
    retention="14 days",
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables on startup
    try:
        await init_db()
        logger.info("Database tables initialized successfully")
    except Exception as e:
        logger.warning(f"Database initialization warning: {e}")

    # Seed default admin user (idempotent)
    try:
        async with SessionLocal() as session:
            repo = UserRepository(session)
            await seed_admin(repo)
            logger.info("Admin seeder ran successfully")
    except Exception as e:
        logger.warning(f"Admin seeder warning: {e}")

    yield


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(APIException, api_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)


app.include_router(api_v1_router, prefix="/api")


@app.get("/")
async def root():
    return {
        "message": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "docs": "/docs",
    }


@app.get("/health")
async def health():
    db_status = "connected"
    try:
        async with engine.connect() as conn:
            pass
    except Exception as e:
        db_status = f"disconnected ({str(e)})"

    return {
        "status": "healthy",
        "database": db_status,
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
    }
