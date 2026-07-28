from uuid import UUID
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr

from app.models.complaint_enums import (
    ComplaintCategory,
    ComplaintPriority,
    ComplaintStatus,
)


class ComplaintCreate(BaseModel):
    title: str
    description: str

    customer_name: str
    customer_email: EmailStr
    customer_phone: str | None = None

    category: ComplaintCategory
    priority: ComplaintPriority = ComplaintPriority.MEDIUM


class ComplaintUpdate(BaseModel):
    title: str | None = None
    description: str | None = None

    category: ComplaintCategory | None = None
    priority: ComplaintPriority | None = None
    status: ComplaintStatus | None = None

    assigned_to: UUID | None = None


class ComplaintResponse(BaseModel):

    id: UUID

    complaint_number: str

    title: str

    description: str

    customer_name: str
    customer_email: EmailStr
    customer_phone: str | None

    category: ComplaintCategory
    priority: ComplaintPriority
    status: ComplaintStatus

    assigned_to: UUID | None

    created_by: UUID

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ComplaintAssignRequest(BaseModel):
    assigned_to: UUID


class ComplaintStatusUpdate(BaseModel):
    status: ComplaintStatus


class ComplaintListResponse(BaseModel):
    items: list[ComplaintResponse]

    page: int
    page_size: int

    total: int
    total_pages: int

