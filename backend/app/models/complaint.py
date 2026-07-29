from uuid import UUID

from sqlalchemy import Enum, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import BaseModel
from app.models.complaint_enums import (
    ComplaintCategory,
    ComplaintPriority,
    ComplaintStatus,
)


class Complaint(BaseModel):

    __tablename__ = "complaints"

    complaint_number: Mapped[str] = mapped_column(
        String(30),
        unique=True,
        index=True,
        nullable=False,
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    category: Mapped[ComplaintCategory] = mapped_column(
        Enum(ComplaintCategory),
        nullable=False,
        index=True,
    )

    priority: Mapped[ComplaintPriority] = mapped_column(
        Enum(ComplaintPriority),
        default=ComplaintPriority.MEDIUM,
        nullable=False,
        index=True,
    )

    status: Mapped[ComplaintStatus] = mapped_column(
        Enum(ComplaintStatus),
        default=ComplaintStatus.OPEN,
        nullable=False,
        index=True,
    )

    customer_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    customer_email: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    customer_phone: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True,
    )

    assigned_to: Mapped[UUID | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
    )

    created_by: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="RESTRICT"),
        nullable=False,
    )

    # Relationships (back-populated from User)
    assignee = relationship(
        "User",
        foreign_keys=[assigned_to],
        back_populates="assigned_complaints",
    )

    creator = relationship(
        "User",
        foreign_keys=[created_by],
        back_populates="created_complaints",
    )

    timeline = relationship(
        "ComplaintTimeline",
        back_populates="complaint",
        cascade="all, delete-orphan",
    )
