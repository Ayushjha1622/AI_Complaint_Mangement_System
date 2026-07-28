from uuid import UUID

from fastapi import APIRouter, Depends, status

from app.api.deps import get_complaint_service
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.common import ApiResponse
from app.schemas.complaint import (
    ComplaintCreate,
    ComplaintResponse,
    ComplaintUpdate,
    ComplaintListResponse,
)
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
    service: ComplaintService = Depends(get_complaint_service),
):

    data = await service.list_paginated(query)

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
