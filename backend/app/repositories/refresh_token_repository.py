from datetime import datetime

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import RefreshToken


class RefreshTokenRepository:

    def __init__(
        self,
        db: AsyncSession,
    ):
        self.db = db

    async def create(
        self,
        token: RefreshToken,
    ):

        self.db.add(token)

        await self.db.commit()

        await self.db.refresh(token)

        return token

    async def get_by_hash(
        self,
        token_hash: str,
    ):

        result = await self.db.execute(
            select(RefreshToken).where(
                RefreshToken.token_hash == token_hash
            )
        )

        return result.scalar_one_or_none()

    async def get_valid_token(
        self,
        token_hash: str,
    ):
        result = await self.db.execute(
            select(RefreshToken).where(
                RefreshToken.token_hash == token_hash,
                RefreshToken.revoked.is_(False),
            )
        )
        return result.scalar_one_or_none()

    async def revoke(
        self,
        token: RefreshToken,
    ):

        token.revoked = True

        await self.db.commit()

    async def revoke_all(
        self,
        user_id,
    ):

        result = await self.db.execute(
            select(RefreshToken).where(
                RefreshToken.user_id == user_id,
                RefreshToken.revoked.is_(False),
            )
        )

        for token in result.scalars():

            token.revoked = True

        await self.db.commit()
