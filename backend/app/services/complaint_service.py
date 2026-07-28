from uuid import UUID
from math import ceil

from fastapi import HTTPException, status

from app.models.complaint import Complaint
from app.models.user import User
from app.models.user import User
from app.models.enums import UserRole
from app.repositories.complaint_repository import ComplaintRepository
from app.repositories.user_repository import UserRepository
from app.schemas.complaint import (
    ComplaintCreate,
    ComplaintUpdate,
    ComplaintResponse,
    ComplaintListResponse,
    ComplaintAssignRequest,
)
from app.schemas.complaint_query import ComplaintQuery
from app.utils.complaint_number import generate_complaint_number


class ComplaintService:

    def __init__(
        self,
        repo: ComplaintRepository,
        user_repo: UserRepository,
    ):
        self.repo = repo
        self.user_repo = user_repo

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

    async def assign_complaint(
        self,
        complaint_id: UUID,
        payload: ComplaintAssignRequest,
    ) -> Complaint:

        complaint = await self.get(complaint_id)

        investigator = await self.user_repo.get_by_id(
            payload.assigned_to
        )

        if investigator is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        if investigator.role != UserRole.INVESTIGATOR:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Assigned user must have INVESTIGATOR role",
            )

        return await self.repo.assign_complaint(
            complaint,
            investigator.id,
        )

    async def list(self):

        return await self.repo.list()

    async def list_paginated(
        self,
        query: ComplaintQuery,
        current_user: User,
    ):

        complaints, total = await self.repo.list_with_filters(
            query,
            current_user,
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
