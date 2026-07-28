from typing import List, Optional
from uuid import UUID, uuid4
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Complaint
from app.repositories.complaint_repository import ComplaintRepository
from app.schemas.complaint import ComplaintCreate, ComplaintUpdate
from app.core.exceptions import APIException


class ComplaintService:
    def __init__(self, db: AsyncSession):
        self.repo = ComplaintRepository(db)

    async def get_all_complaints(self, status: Optional[str] = None, priority: Optional[str] = None) -> List[Complaint]:
        return await self.repo.get_filtered(status=status, priority=priority)

    async def get_complaint_by_id(self, complaint_id: UUID) -> Complaint:
        complaint = await self.repo.get_by_id(complaint_id)
        if not complaint:
            raise APIException(status_code=404, message="Complaint not found")
        return complaint

    async def create_complaint(self, payload: ComplaintCreate) -> Complaint:
        count = await self.repo.get_count()
        complaint_number = f"CMP-{1001 + count}"
        complaint = Complaint(
            id=uuid4(),
            complaint_number=complaint_number,
            **payload.model_dump(),
        )
        return await self.repo.create(complaint)

    async def update_complaint(self, complaint_id: UUID, payload: ComplaintUpdate) -> Complaint:
        complaint = await self.get_complaint_by_id(complaint_id)
        for key, value in payload.model_dump(exclude_unset=True).items():
            setattr(complaint, key, value)
        await self.repo.db.commit()
        await self.repo.db.refresh(complaint)
        return complaint

    async def delete_complaint(self, complaint_id: UUID) -> None:
        complaint = await self.get_complaint_by_id(complaint_id)
        await self.repo.delete(complaint)
