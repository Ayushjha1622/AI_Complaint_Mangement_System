from datetime import datetime, timedelta, UTC
from typing import Any

from jose import JWTError, jwt

from app.core.config import settings

import bcrypt

REFRESH_TOKEN_EXPIRE_DAYS = 7


def verify_password(
    plain_password: str,
    hashed_password: str,
) -> bool:
    pw_bytes = plain_password.encode("utf-8")
    hashed_bytes = hashed_password.encode("utf-8")
    try:
        return bcrypt.checkpw(pw_bytes, hashed_bytes)
    except Exception:
        return False


def hash_password(password: str) -> str:
    pw_bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(pw_bytes, salt)
    return hashed.decode("utf-8")



def create_access_token(
    data: dict[str, Any],
) -> str:

    payload = data.copy()

    payload["exp"] = (
        datetime.now(UTC)
        + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    )

    payload["type"] = "access"

    return jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )


def create_refresh_token(data: dict[str, Any]) -> str:
    payload = data.copy()
    payload["type"] = "refresh"
    payload["exp"] = (
        datetime.now(UTC)
        + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    )

    return jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )


def decode_token(token: str) -> dict[str, Any]:
    return jwt.decode(
        token,
        settings.SECRET_KEY,
        algorithms=[settings.ALGORITHM],
    )