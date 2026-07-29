from uuid import UUID
from sqlalchemy import ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import BaseModel


class ComplaintTimeline(BaseModel):
    __tablename__ = "complaint_timeline"

    complaint_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("complaints.id", ondelete="CASCADE"),
        nullable=False,
    )

    action: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    field_name: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    old_value: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    new_value: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    performed_by: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
    )

    complaint = relationship(
        "Complaint",
        back_populates="timeline",
    )

    performer = relationship("User")
