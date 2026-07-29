from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.ai_analysis import AIAnalysis


class AIAnalysisRepository:
    """Repository for the ai_analysis cache table."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_complaint_id(
        self,
        complaint_id: UUID,
    ) -> AIAnalysis | None:
        """Return cached analysis for a complaint, or None."""

        stmt = select(AIAnalysis).where(
            AIAnalysis.complaint_id == complaint_id
        )
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def create(
        self,
        analysis: AIAnalysis,
    ) -> AIAnalysis:
        """Persist a new AI analysis record."""

        self.db.add(analysis)
        await self.db.commit()
        await self.db.refresh(analysis)
        return analysis

    async def update(
        self,
        analysis: AIAnalysis,
    ) -> AIAnalysis:
        """Update an existing AI analysis record."""

        await self.db.commit()
        await self.db.refresh(analysis)
        return analysis
