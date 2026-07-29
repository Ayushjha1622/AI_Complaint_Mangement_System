from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.complaint_timeline import ComplaintTimeline


class TimelineRepository:

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(
        self,
        timeline: ComplaintTimeline,
    ) -> ComplaintTimeline:

        self.db.add(timeline)

        await self.db.commit()
        await self.db.refresh(timeline)

        return timeline

    async def get_by_complaint(
        self,
        complaint_id: UUID,
    ) -> list[ComplaintTimeline]:

        result = await self.db.execute(
            select(ComplaintTimeline)
            .where(
                ComplaintTimeline.complaint_id == complaint_id
            )
            .order_by(
                ComplaintTimeline.created_at.asc()
            )
        )

        return list(result.scalars().all())
