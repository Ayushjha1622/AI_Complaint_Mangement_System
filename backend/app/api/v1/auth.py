from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.repositories.user_repository import UserRepository
from app.services.auth_service import AuthService
from app.schemas.auth import RegisterRequest, LoginRequest, LoginResponse
from app.schemas.user import UserResponse
from app.schemas.common import ApiResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=ApiResponse[UserResponse], status_code=status.HTTP_201_CREATED)
async def register(payload: RegisterRequest, db: AsyncSession = Depends(get_db)):
    repo = UserRepository(db)
    service = AuthService(repo)
    user = await service.register(payload)
    return ApiResponse(
        success=True,
        message="User registered successfully",
        data=UserResponse.model_validate(user),
    )


@router.post("/login", response_model=ApiResponse[LoginResponse])
async def login(payload: LoginRequest, db: AsyncSession = Depends(get_db)):
    repo = UserRepository(db)
    service = AuthService(repo)
    token_data = await service.login(payload)
    return ApiResponse(
        success=True,
        message="Login successful",
        data=LoginResponse(**token_data),
    )


@router.post("/token")
async def token_login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db),
):
    repo = UserRepository(db)
    service = AuthService(repo)

    token_data = await service.login(
        LoginRequest(
            email=form_data.username,
            password=form_data.password,
        )
    )

    return token_data

