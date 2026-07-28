from app.models import User, UserRole
from app.repositories.user_repository import UserRepository
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
)
from app.core.exceptions import APIException, InvalidCredentialsException
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

        return {
            "access_token": token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
        }