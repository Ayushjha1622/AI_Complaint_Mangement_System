from uuid import UUID
from math import ceil

from fastapi import HTTPException, status

from app.models.complaint import Complaint
from app.models.user import User
from app.models.user import User
from app.core.complaint_workflow import is_valid_transition
from app.models.enums import UserRole
from app.repositories.complaint_repository import ComplaintRepository
from app.repositories.user_repository import UserRepository
from app.services.timeline_service import TimelineService
from app.schemas.complaint import (
    ComplaintCreate,
    ComplaintUpdate,
    ComplaintResponse,
    ComplaintListResponse,
    ComplaintAssignRequest,
    ComplaintStatusUpdate,
)
from app.schemas.complaint_query import ComplaintQuery
from app.utils.complaint_number import generate_complaint_number


class ComplaintService:

    def __init__(
        self,
        repo: ComplaintRepository,
        user_repo: UserRepository,
        timeline_service: TimelineService,
    ):
        self.repo = repo
        self.user_repo = user_repo
        self.timeline_service = timeline_service

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

        complaint = await self.repo.create(complaint)

        await self.timeline_service.log(
            complaint_id=complaint.id,
            action="COMPLAINT_CREATED",
            field_name=None,
            old_value=None,
            new_value=complaint.status.value,
            performed_by=current_user.id,
        )

        return complaint

    async def assign_complaint(
        self,
        complaint_id: UUID,
        payload: ComplaintAssignRequest,
        current_user: User,
    ) -> Complaint:

        complaint = await self.get(complaint_id)

        old_assignee = complaint.assigned_to

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

        complaint = await self.repo.assign_complaint(
            complaint,
            investigator.id,
        )

        await self.timeline_service.log(
            complaint_id=complaint.id,
            action="ASSIGNED",
            field_name="assigned_to",
            old_value=str(old_assignee) if old_assignee else None,
            new_value=str(investigator.id),
            performed_by=current_user.id,
        )

        return complaint

    async def update_status(
        self,
        complaint_id: UUID,
        payload: ComplaintStatusUpdate,
        current_user: User,
    ) -> Complaint:

        # Fetch complaint
        complaint = await self.get(complaint_id)

        old_status = complaint.status

        # Validate workflow transition
        if not is_valid_transition(
            complaint.status,
            payload.status,
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    f"Invalid status transition "
                    f"from {complaint.status.value} "
                    f"to {payload.status.value}"
                ),
            )

        # Update status
        complaint.status = payload.status

        complaint = await self.repo.update_status(
            complaint
        )

        await self.timeline_service.log(
            complaint_id=complaint.id,
            action="STATUS_CHANGED",
            field_name="status",
            old_value=old_status.value,
            new_value=payload.status.value,
            performed_by=current_user.id,
        )

        return complaint

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
