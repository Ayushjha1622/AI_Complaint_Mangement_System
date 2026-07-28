from uuid import UUID
from math import ceil

from fastapi import HTTPException, status

from app.models.complaint import Complaint
from app.models.user import User
from app.repositories.complaint_repository import ComplaintRepository
from app.schemas.complaint import (
    ComplaintCreate,
    ComplaintUpdate,
    ComplaintResponse,
    ComplaintListResponse,
)
from app.schemas.complaint_query import ComplaintQuery
from app.utils.complaint_number import generate_complaint_number


class ComplaintService:

    def __init__(
        self,
        repo: ComplaintRepository,
    ):
        self.repo = repo

    async def create(
        self,
        payload: ComplaintCreate,
        current_user: User,
    ) -> Complaint:

        complaint = Complaint(
            complaint_number=generate_complaint_number(),
            title=payload.title,
            description=payload.description,
            customer_name=payload.customer_name,
            customer_email=payload.customer_email,
            customer_phone=payload.customer_phone,
            category=payload.category,
            priority=payload.priority,
            created_by=current_user.id,
        )

        return await self.repo.create(complaint)

    async def list(self):

        return await self.repo.list()

    async def list_paginated(
        self,
        query: ComplaintQuery,
    ):

        complaints, total = await self.repo.list_with_filters(
            query
        )

        return ComplaintListResponse(
            items=[
                ComplaintResponse.model_validate(c)
                for c in complaints
            ],
            page=query.page,
            page_size=query.page_size,
            total=total,
            total_pages=ceil(total / query.page_size) if total else 0,
        )

    async def get(
        self,
        complaint_id: UUID,
    ) -> Complaint:

        complaint = await self.repo.get(
            complaint_id
        )

        if complaint is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Complaint not found",
            )

        return complaint

    async def delete(
        self,
        complaint_id: UUID,
    ):

        complaint = await self.get(
            complaint_id
        )

        await self.repo.delete(
            complaint
        )

    async def update(
        self,
        complaint_id: UUID,
        payload: ComplaintUpdate,
    ) -> Complaint:

        complaint = await self.get(
            complaint_id
        )

        update_data = payload.model_dump(
            exclude_unset=True
        )

        for field, value in update_data.items():
            setattr(
                complaint,
                field,
                value,
            )

        return await self.repo.update(
            complaint
        )
