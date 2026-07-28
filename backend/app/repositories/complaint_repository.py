from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.complaint import Complaint


class ComplaintRepository:

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, complaint: Complaint) -> Complaint:
        self.db.add(complaint)
        await self.db.commit()
        await self.db.refresh(complaint)
        return complaint

    async def get(self, complaint_id: UUID) -> Complaint | None:
        result = await self.db.execute(
            select(Complaint).where(Complaint.id == complaint_id)
        )
        return result.scalar_one_or_none()

    async def list(self) -> list[Complaint]:
        result = await self.db.execute(
            select(Complaint).order_by(Complaint.created_at.desc())
        )
        return list(result.scalars().all())

    async def update(self, complaint: Complaint) -> Complaint:
        await self.db.commit()
        await self.db.refresh(complaint)
        return complaint

    async def delete(self, complaint: Complaint) -> None:
        await self.db.delete(complaint)
        await self.db.commit()

    async def get_count(self) -> int:
        result = await self.db.execute(
            select(func.count()).select_from(Complaint)
        )
        return result.scalar_one()
