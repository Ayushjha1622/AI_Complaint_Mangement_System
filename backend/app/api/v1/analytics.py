from fastapi import APIRouter, Depends

from app.api.deps import get_analytics_service
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.analytics import DashboardData
from app.schemas.common import ApiResponse
from app.services.analytics_service import AnalyticsService

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


@router.get(
    "/dashboard",
    response_model=ApiResponse[DashboardData],
)
async def dashboard(
    service: AnalyticsService = Depends(
        get_analytics_service
    ),
    current_user: User = Depends(get_current_user),
):

    data = await service.get_dashboard(current_user)

    return ApiResponse(
        success=True,
        message="Dashboard loaded successfully",
        data=data,
    )



