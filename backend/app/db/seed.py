from app.models.enums import UserRole
from app.models.user import User
from app.core.security import hash_password


async def seed_admin(repo):
    """
    Create a default System Administrator if one doesn't exist.
    Call once at application startup to ensure an admin is always available.
    """

    admin = await repo.get_by_email(
        "admin@complaint.com"
    )

    if admin:
        return

    await repo.create(
        User(
            full_name="System Administrator",
            email="admin@complaint.com",
            hashed_password=hash_password("Admin@123"),
            role=UserRole.ADMIN,
            is_verified=True,
        )
    )
