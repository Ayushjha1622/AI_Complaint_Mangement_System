from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.repositories.user_repository import UserRepository
from app.services.auth_service import AuthService


def get_auth_service(
    db: AsyncSession = Depends(get_db),
) -> AuthService:
    repo = UserRepository(db)
    return AuthService(repo)
