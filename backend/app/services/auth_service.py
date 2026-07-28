from datetime import datetime, timedelta, UTC
from app.models import User, UserRole, RefreshToken
from app.repositories.user_repository import UserRepository
from app.repositories.refresh_token_repository import RefreshTokenRepository
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    hash_refresh_token,
    decode_token,
)
from app.core.exceptions import APIException, InvalidCredentialsException
from app.schemas.auth import RegisterRequest, LoginRequest


class AuthService:
    def __init__(self, repo: UserRepository, refresh_repo: RefreshTokenRepository):
        self.repo = repo
        self.refresh_repo = refresh_repo

    async def register(self, data: RegisterRequest) -> User:
        existing = await self.repo.get_by_email(data.email)
        if existing:
            raise APIException(status_code=400, message="Email already exists")

        user = User(
            full_name=data.full_name,
            email=data.email,
            hashed_password=hash_password(data.password),
            role=UserRole.VIEWER,
        )
        return await self.repo.create(user)

    async def login(
        self,
        data: LoginRequest,
    ):
        user = await self.repo.get_by_email(data.email)

        if not user:
            raise InvalidCredentialsException()

        if not verify_password(
            data.password,
            user.hashed_password,
        ):
            raise InvalidCredentialsException()

        token = create_access_token(
            {
                "sub": str(user.id),
                "email": user.email,
                "role": user.role.value,
            }
        )
        
        refresh_token = create_refresh_token(
            {
                "sub": str(user.id),
                "email": user.email,
                "role": user.role.value,
            }
        )

        hashed_token = hash_refresh_token(refresh_token)
        await self.refresh_repo.create(
            RefreshToken(
                user_id=user.id,
                token_hash=hashed_token,
                expires_at=datetime.now(UTC) + timedelta(days=7),
            )
        )

        return {
            "access_token": token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
        }

    async def refresh(
        self,
        refresh_token: str,
    ):
        try:
            payload = decode_token(refresh_token)
        except Exception:
            raise InvalidCredentialsException()

        if payload.get("type") != "refresh":
            raise InvalidCredentialsException()

        hashed = hash_refresh_token(refresh_token)
        stored = await self.refresh_repo.get_valid_token(hashed)

        if stored is None:
            raise InvalidCredentialsException()

        user = await self.repo.get_by_id(stored.user_id)
        if not user or not user.is_active:
            raise InvalidCredentialsException()

        new_access = create_access_token({
            "sub": str(user.id),
            "email": user.email,
            "role": user.role.value,
        })

        new_refresh = create_refresh_token({
            "sub": str(user.id),
            "email": user.email,
            "role": user.role.value,
        })

        await self.refresh_repo.revoke(stored)

        await self.refresh_repo.create(
            RefreshToken(
                user_id=user.id,
                token_hash=hash_refresh_token(new_refresh),
                expires_at=datetime.now(UTC) + timedelta(days=7),
            )
        )

        return {
            "access_token": new_access,
            "refresh_token": new_refresh,
            "token_type": "bearer",
        }