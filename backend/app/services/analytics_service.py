from app.models.user import User
from app.repositories.analytics_repository import AnalyticsRepository
from app.schemas.analytics import DashboardData


class AnalyticsService:

    def __init__(
        self,
        repo: AnalyticsRepository,
    ):
        self.repo = repo

    async def get_dashboard(self, user: User) -> DashboardData:
        data = await self.repo.get_dashboard(user)
        return DashboardData(**data)



