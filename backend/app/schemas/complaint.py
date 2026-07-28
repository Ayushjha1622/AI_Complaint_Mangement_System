from datetime import datetime
from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel, ConfigDict


class ComplaintBase(BaseModel):
    customer_name: str
    customer_email: Optional[str] = None
    customer_phone: Optional[str] = None
    company: Optional[str] = None
    product: str
    batch_number: Optional[str] = None
    category: str
    priority: str = "Medium"
    status: str = "Open"
    description: str
    assigned_to: Optional[str] = None


class ComplaintCreate(ComplaintBase):
    pass


class ComplaintUpdate(BaseModel):
    customer_name: Optional[str] = None
    product: Optional[str] = None
    category: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    description: Optional[str] = None
    assigned_to: Optional[str] = None


class ComplaintResponse(ComplaintBase):
    id: UUID
    complaint_number: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class CommentCreate(BaseModel):
    author: str
    message: str


class CommentResponse(CommentCreate):
    id: int
    complaint_id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
