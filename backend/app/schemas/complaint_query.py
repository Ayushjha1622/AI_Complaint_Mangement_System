from pydantic import BaseModel, Field

from app.models.complaint_enums import (
    ComplaintCategory,
    ComplaintPriority,
    ComplaintStatus,
)


class ComplaintQuery(BaseModel):
    page: int = Field(default=1, ge=1)
    page_size: int = Field(default=10, ge=1, le=100)

    status: ComplaintStatus | None = None
    priority: ComplaintPriority | None = None
    category: ComplaintCategory | None = None

    search: str | None = None

    sort_by: str = "created_at"
    sort_order: str = "desc"
