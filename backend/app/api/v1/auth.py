from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from app.api.deps import get_auth_service
from app.services.auth_service import AuthService
from app.schemas.auth import (
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RefreshTokenRequest,
    TokenPairResponse,
    LogoutRequest,
)
from app.schemas.user import UserResponse
from app.schemas.common import ApiResponse
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=ApiResponse[UserResponse], status_code=status.HTTP_201_CREATED)
async def register(
    payload: RegisterRequest, 
    service: AuthService = Depends(get_auth_service)
):
    user = await service.register(payload)
    return ApiResponse(
        success=True,
        message="User registered successfully",
        data=UserResponse.model_validate(user),
    )


@router.post("/login", response_model=ApiResponse[TokenPairResponse])
async def login(
    payload: LoginRequest,
    service: AuthService = Depends(get_auth_service)
):
    token_data = await service.login(payload)
    return ApiResponse(
        success=True,
        message="Login successful",
        data=TokenPairResponse(**token_data),
    )


@router.post("/token")
async def token_login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    service: AuthService = Depends(get_auth_service),
):
    token_data = await service.login(
        LoginRequest(
            email=form_data.username,
            password=form_data.password,
        )
    )

    return token_data


@router.post(
    "/refresh",
    response_model=ApiResponse[TokenPairResponse],
)
async def refresh(
    payload: RefreshTokenRequest,
    service: AuthService = Depends(get_auth_service),
):
    tokens = await service.refresh(
        payload.refresh_token
    )

    return ApiResponse(
        success=True,
        message="Token refreshed successfully",
        data=TokenPairResponse(**tokens),
    )


@router.post("/logout")
async def logout(
    payload: LogoutRequest,
    service: AuthService = Depends(get_auth_service),
):
    result = await service.logout(
        payload.refresh_token
    )

    return ApiResponse(
        success=True,
        message=result["message"],
        data=None,
    )


@router.post("/logout-all")
async def logout_all(
    current_user=Depends(get_current_user),
    service: AuthService = Depends(get_auth_service),
):
    result = await service.logout_all(
        current_user
    )

    return ApiResponse(
        success=True,
        message=result["message"],
        data=None,
    )

