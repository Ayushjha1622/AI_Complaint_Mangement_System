from uuid import UUID

from fastapi import APIRouter, Depends, status

from app.api.deps import get_complaint_service, get_timeline_service
from app.core.dependencies import get_current_user, RoleChecker, qa_manager_only, investigator_only
from app.models.user import User
from app.models.enums import UserRole
from app.schemas.common import ApiResponse
from app.schemas.complaint import (
    ComplaintCreate,
    ComplaintResponse,
    ComplaintUpdate,
    ComplaintListResponse,
    ComplaintAssignRequest,
    ComplaintStatusUpdate,
    ComplaintTimelineResponse,
)
from app.services.timeline_service import TimelineService
from app.schemas.complaint_query import ComplaintQuery
from app.services.complaint_service import ComplaintService

router = APIRouter(
    prefix="/complaints",
    tags=["Complaints"],
)

@router.post(
    "",
    response_model=ApiResponse[ComplaintResponse],
    status_code=status.HTTP_201_CREATED,
)
async def create_complaint(
    payload: ComplaintCreate,
    current_user: User = Depends(get_current_user),
    service: ComplaintService = Depends(get_complaint_service),
):

    complaint = await service.create(
        payload,
        current_user,
    )

    return ApiResponse(
        success=True,
        message="Complaint created successfully",
        data=ComplaintResponse.model_validate(
            complaint
        ),
    )

@router.get(
    "",
    response_model=ApiResponse[ComplaintListResponse],
)
async def list_complaints(
    query: ComplaintQuery = Depends(),
    current_user: User = Depends(get_current_user),
    service: ComplaintService = Depends(get_complaint_service),
):

    data = await service.list_paginated(
        query,
        current_user,
    )

    return ApiResponse(
        success=True,
        message="Complaints fetched successfully",
        data=data,
    )

@router.get(
    "/{complaint_id}",
    response_model=ApiResponse[ComplaintResponse],
)
async def get_complaint(
    complaint_id: UUID,
    service: ComplaintService = Depends(get_complaint_service),
):

    complaint = await service.get(
        complaint_id
    )

    return ApiResponse(
        success=True,
        message="Complaint fetched successfully",
        data=ComplaintResponse.model_validate(
            complaint
        ),
    )

@router.put(
    "/{complaint_id}",
    response_model=ApiResponse[ComplaintResponse],
)
async def update_complaint(
    complaint_id: UUID,
    payload: ComplaintUpdate,
    service: ComplaintService = Depends(get_complaint_service),
):

    complaint = await service.update(
        complaint_id,
        payload,
    )

    return ApiResponse(
        success=True,
        message="Complaint updated successfully",
        data=ComplaintResponse.model_validate(
            complaint
        ),
    )

@router.delete(
    "/{complaint_id}",
    response_model=ApiResponse[None],
)
async def delete_complaint(
    complaint_id: UUID,
    service: ComplaintService = Depends(get_complaint_service),
):

    await service.delete(
        complaint_id
    )

    return ApiResponse(
        success=True,
        message="Complaint deleted successfully",
        data=None,
    )

@router.patch(
    "/{complaint_id}/assign",
    response_model=ApiResponse[ComplaintResponse],
)
async def assign_complaint(
    complaint_id: UUID,
    payload: ComplaintAssignRequest,
    service: ComplaintService = Depends(get_complaint_service),
    current_user: User = Depends(qa_manager_only),
):

    complaint = await service.assign_complaint(
        complaint_id,
        payload,
        current_user,
    )

    return ApiResponse(
        success=True,
        message="Complaint assigned successfully",
        data=ComplaintResponse.model_validate(
            complaint
        ),
    )

@router.patch(
    "/{complaint_id}/status",
    response_model=ApiResponse[ComplaintResponse],
)
async def update_complaint_status(
    complaint_id: UUID,
    payload: ComplaintStatusUpdate,
    service: ComplaintService = Depends(get_complaint_service),
    current_user: User = Depends(investigator_only),
):
    complaint = await service.update_status(
        complaint_id,
        payload,
        current_user,
    )

    return ApiResponse(
        success=True,
        message="Complaint status updated successfully",
        data=ComplaintResponse.model_validate(complaint),
    )

@router.get(
    "/{complaint_id}/timeline",
    response_model=ApiResponse[list[ComplaintTimelineResponse]],
)
async def get_timeline(
    complaint_id: UUID,
    service: TimelineService = Depends(get_timeline_service),
    _: User = Depends(get_current_user),
):

    history = await service.get_history(
        complaint_id
    )

    return ApiResponse(
        success=True,
        message="Timeline fetched successfully",
        data=[
            ComplaintTimelineResponse.model_validate(item)
            for item in history
        ],
    )
