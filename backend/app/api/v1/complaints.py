from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.services.complaint_service import ComplaintService
from app.schemas.complaint import ComplaintCreate, ComplaintUpdate, ComplaintResponse
from app.schemas.common import ApiResponse

router = APIRouter(prefix="/complaints", tags=["Complaints"])


@router.get("", response_model=ApiResponse[List[ComplaintResponse]])
async def list_complaints(
    status: Optional[str] = None,
    priority: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
):
    service = ComplaintService(db)
    items = await service.get_all_complaints(status=status, priority=priority)
    return ApiResponse(
        success=True,
        message="Complaints fetched successfully",
        data=[ComplaintResponse.model_validate(item) for item in items],
    )


@router.get("/{complaint_id}", response_model=ApiResponse[ComplaintResponse])
async def get_complaint(complaint_id: UUID, db: AsyncSession = Depends(get_db)):
    service = ComplaintService(db)
    complaint = await service.get_complaint_by_id(complaint_id)
    return ApiResponse(
        success=True,
        message="Complaint details retrieved successfully",
        data=ComplaintResponse.model_validate(complaint),
    )


@router.post("", response_model=ApiResponse[ComplaintResponse], status_code=status.HTTP_201_CREATED)
async def create_complaint(payload: ComplaintCreate, db: AsyncSession = Depends(get_db)):
    service = ComplaintService(db)
    created = await service.create_complaint(payload)
    return ApiResponse(
        success=True,
        message="Complaint created successfully",
        data=ComplaintResponse.model_validate(created),
    )


@router.put("/{complaint_id}", response_model=ApiResponse[ComplaintResponse])
async def update_complaint(
    complaint_id: UUID, payload: ComplaintUpdate, db: AsyncSession = Depends(get_db)
):
    service = ComplaintService(db)
    updated = await service.update_complaint(complaint_id, payload)
    return ApiResponse(
        success=True,
        message="Complaint updated successfully",
        data=ComplaintResponse.model_validate(updated),
    )


@router.delete("/{complaint_id}", response_model=ApiResponse[None])
async def delete_complaint(complaint_id: UUID, db: AsyncSession = Depends(get_db)):
    service = ComplaintService(db)
    await service.delete_complaint(complaint_id)
    return ApiResponse(
        success=True,
        message="Complaint deleted successfully",
        data=None,
    )
