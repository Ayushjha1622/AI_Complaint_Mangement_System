from uuid import UUID
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.services.complaint_service import ComplaintService
from app.ai.graph import run_ai_complaint_workflow
from app.schemas.common import ApiResponse

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/analyze/{complaint_id}", response_model=ApiResponse[dict])
async def analyze_complaint(complaint_id: UUID, db: AsyncSession = Depends(get_db)):
    service = ComplaintService(db)
    complaint = await service.get_complaint_by_id(complaint_id)
    result = run_ai_complaint_workflow(complaint.description, complaint.product)

    return ApiResponse(
        success=True,
        message="AI Root Cause & CAPA Analysis generated successfully",
        data=result,
    )
