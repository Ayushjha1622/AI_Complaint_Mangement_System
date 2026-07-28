from typing import List, Optional
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models import Complaint
from app.repositories.base import BaseRepository


class ComplaintRepository(BaseRepository[Complaint]):
    def __init__(self, db: AsyncSession):
        super().__init__(Complaint, db)

    async def get_filtered(self, status: Optional[str] = None, priority: Optional[str] = None) -> List[Complaint]:
        query = select(Complaint)
        if status:
            query = query.where(Complaint.status == status)
        if priority:
            query = query.where(Complaint.priority == priority)
        query = query.order_by(Complaint.created_at.desc())
        result = await self.db.execute(query)
        return list(result.scalars().all())

    async def get_count(self) -> int:
        result = await self.db.execute(select(Complaint))
        return len(result.scalars().all())
