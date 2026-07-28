from app.models.user import User
from app.models.enums import UserRole
from app.repositories.user_repository import UserRepository
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)
from app.core.exceptions import APIException
from app.schemas.auth import RegisterRequest, LoginRequest


class AuthService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

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

    async def login(self, data: LoginRequest) -> dict:
        user = await self.repo.get_by_email(data.email)
        if not user or not verify_password(data.password, user.hashed_password):
            raise APIException(status_code=401, message="Invalid credentials")

        token = create_access_token(
            {
                "sub": str(user.id),
                "role": user.role.value,
            }
        )
        return {
            "access_token": token,
            "refresh_token": token,
            "token_type": "bearer",
        }
