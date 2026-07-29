from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.repositories.complaint_repository import ComplaintRepository
from app.services.complaint_service import ComplaintService

from app.repositories.user_repository import UserRepository
from app.repositories.refresh_token_repository import RefreshTokenRepository
from app.repositories.timeline_repository import TimelineRepository
from app.repositories.analytics_repository import AnalyticsRepository
from app.services.auth_service import AuthService
from app.services.timeline_service import TimelineService
from app.services.analytics_service import AnalyticsService


def get_timeline_service(
    db: AsyncSession = Depends(get_db),
) -> TimelineService:
    repo = TimelineRepository(db)
    return TimelineService(repo)


def get_analytics_service(
    db: AsyncSession = Depends(get_db),
) -> AnalyticsService:
    repo = AnalyticsRepository(db)
    return AnalyticsService(repo)


def get_complaint_service(
    db: AsyncSession = Depends(get_db),
) -> ComplaintService:
    repo = ComplaintRepository(db)
    user_repo = UserRepository(db)
    timeline_repo = TimelineRepository(db)
    timeline_service = TimelineService(timeline_repo)
    return ComplaintService(repo, user_repo, timeline_service)


def get_auth_service(
    db: AsyncSession = Depends(get_db),
) -> AuthService:
    repo = UserRepository(db)
    refresh_repo = RefreshTokenRepository(db)
    return AuthService(repo, refresh_repo)
