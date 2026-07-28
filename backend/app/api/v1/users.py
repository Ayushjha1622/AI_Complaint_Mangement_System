from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.models import User
from app.schemas.user import UserResponse
from app.schemas.common import ApiResponse

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=ApiResponse[UserResponse])
async def get_current_user_profile(current_user: User = Depends(get_current_user)):
    return ApiResponse(
        success=True,
        message="User profile retrieved successfully",
        data=UserResponse.model_validate(current_user),
    )
