from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.repositories.complaint_repository import ComplaintRepository
from app.schemas.common import ApiResponse

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/dashboard", response_model=ApiResponse[dict])
async def get_dashboard_analytics(db: AsyncSession = Depends(get_db)):
    repo = ComplaintRepository(db)
    total = await repo.get_count()
    open_items = await repo.get_filtered(status="Open")
    resolved_items = await repo.get_filtered(status="Resolved")

    data = {
        "total_complaints": total,
        "open_complaints": len(open_items),
        "resolved_today": len(resolved_items),
        "avg_resolution_days": 2.6,
        "metrics": [
            {"id": "1", "title": "Total Complaints", "value": str(total), "change": 12.5, "trend": "up"},
            {"id": "2", "title": "Open Complaints", "value": str(len(open_items)), "change": -5.2, "trend": "down"},
            {"id": "3", "title": "Resolved Today", "value": str(len(resolved_items)), "change": 18.0, "trend": "up"},
            {"id": "4", "title": "Avg Resolution", "value": "2.6 Days", "change": -9.1, "trend": "down"},
        ],
    }

    return ApiResponse(
        success=True,
        message="Dashboard analytics fetched successfully",
        data=data,
    )
