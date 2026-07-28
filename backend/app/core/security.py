from datetime import datetime, timezone, timedelta
import bcrypt
from jose import jwt

from app.core.config import settings


def hash_password(password: str) -> str:
    pw_bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(pw_bytes, salt)
    return hashed.decode("utf-8")


def verify_password(password: str, hashed: str) -> bool:
    pw_bytes = password.encode("utf-8")
    hashed_bytes = hashed.encode("utf-8")
    try:
        return bcrypt.checkpw(pw_bytes, hashed_bytes)
    except Exception:
        return False



def create_access_token(data: dict) -> str:
    payload = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    payload.update({"exp": expire})
    return jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )
