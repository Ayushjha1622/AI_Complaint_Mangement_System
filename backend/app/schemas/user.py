from uuid import UUID
from pydantic import BaseModel, EmailStr, ConfigDict
from app.models.enums import UserRole


class UserResponse(BaseModel):
    id: UUID
    full_name: str
    email: EmailStr
    role: UserRole

    model_config = ConfigDict(from_attributes=True)
