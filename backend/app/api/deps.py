from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.repositories.complaint_repository import ComplaintRepository
from app.services.complaint_service import ComplaintService

from app.repositories.user_repository import UserRepository
from app.repositories.refresh_token_repository import RefreshTokenRepository
from app.services.auth_service import AuthService


def get_complaint_service(
    db: AsyncSession = Depends(get_db),
) -> ComplaintService:
    repo = ComplaintRepository(db)
    return ComplaintService(repo)


def get_auth_service(
    db: AsyncSession = Depends(get_db),
) -> AuthService:
    repo = UserRepository(db)
    refresh_repo = RefreshTokenRepository(db)
    return AuthService(repo, refresh_repo)
