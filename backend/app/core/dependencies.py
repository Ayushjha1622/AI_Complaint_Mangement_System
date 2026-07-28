from uuid import UUID
from typing import List
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.db.session import get_db
from app.repositories.user_repository import UserRepository
from app.models import User

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/v1/auth/token"
)


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )
        user_id: str = payload.get("sub")
        token_type: str = payload.get("type")
        if user_id is None or token_type != "access":
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    repo = UserRepository(db)
    user = await repo.get_by_id(UUID(user_id))
    if user is None:
        raise credentials_exception
    return user


class RoleChecker:

    def __init__(self, *roles: "UserRole"):
        self.roles = set(roles)

    async def __call__(
        self,
        current_user: User = Depends(get_current_user),
    ) -> User:

        if current_user.role not in self.roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to perform this action.",
            )

        return current_user


# ---------------------------------------------------------------------------
# Reusable role-based dependency instances
# ---------------------------------------------------------------------------
from app.models.enums import UserRole  # noqa: E402

admin_only = RoleChecker(
    UserRole.ADMIN,
)

qa_manager_only = RoleChecker(
    UserRole.ADMIN,
    UserRole.QA_MANAGER,
)

investigator_only = RoleChecker(
    UserRole.ADMIN,
    UserRole.QA_MANAGER,
    UserRole.INVESTIGATOR,
)

support_only = RoleChecker(
    UserRole.ADMIN,
    UserRole.CUSTOMER_SUPPORT,
)

# Create Complaint: Admin ✅  QA ✅  Support ✅  (per permission matrix)
complaint_creator = RoleChecker(
    UserRole.ADMIN,
    UserRole.QA_MANAGER,
    UserRole.CUSTOMER_SUPPORT,
)

authenticated_user = Depends(get_current_user)
