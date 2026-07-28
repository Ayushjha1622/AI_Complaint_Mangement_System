import uuid
from datetime import datetime
from sqlalchemy import String, Text, DateTime, ForeignKey, Integer, Enum
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID

from app.db.base import Base
from app.models.enums import UserRole
from app.models.user import User

__all__ = [
    "User",
    "UserRole",
    "Complaint",
    "Comment",
    "Attachment",
    "Activity",
    "AIAnalysis",
    "CAPA",
]



class Complaint(Base):
    __tablename__ = "complaints"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    complaint_number: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    customer_name: Mapped[str] = mapped_column(String(255), nullable=False)
    customer_email: Mapped[str] = mapped_column(String(255), nullable=True)
    customer_phone: Mapped[str] = mapped_column(String(50), nullable=True)
    company: Mapped[str] = mapped_column(String(255), nullable=True)
    product: Mapped[str] = mapped_column(String(255), nullable=False)
    batch_number: Mapped[str] = mapped_column(String(100), nullable=True)
    category: Mapped[str] = mapped_column(String(100), nullable=False)
    priority: Mapped[str] = mapped_column(String(50), default="Medium")
    status: Mapped[str] = mapped_column(String(50), default="Open")
    description: Mapped[str] = mapped_column(Text, nullable=False)
    assigned_to: Mapped[str] = mapped_column(String(255), nullable=True)
    created_by: Mapped[str] = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Comment(Base):
    __tablename__ = "comments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    complaint_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("complaints.id"), nullable=False)
    author: Mapped[str] = mapped_column(String(255), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class Attachment(Base):
    __tablename__ = "attachments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    complaint_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("complaints.id"), nullable=False)
    filename: Mapped[str] = mapped_column(String(255), nullable=False)
    filepath: Mapped[str] = mapped_column(String(500), nullable=False)
    size: Mapped[str] = mapped_column(String(50), nullable=False)
    mime_type: Mapped[str] = mapped_column(String(100), nullable=True)


class Activity(Base):
    __tablename__ = "activities"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    complaint_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("complaints.id"), nullable=False)
    action: Mapped[str] = mapped_column(String(255), nullable=False)
    user: Mapped[str] = mapped_column(String(255), nullable=False)
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class AIAnalysis(Base):
    __tablename__ = "ai_analysis"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    complaint_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("complaints.id"), nullable=False)
    summary: Mapped[str] = mapped_column(Text, nullable=False)
    root_cause: Mapped[str] = mapped_column(Text, nullable=False)
    risk_score: Mapped[int] = mapped_column(Integer, default=50)
    confidence: Mapped[int] = mapped_column(Integer, default=90)
    severity: Mapped[str] = mapped_column(String(50), default="High")


class CAPA(Base):
    __tablename__ = "capa"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    complaint_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("complaints.id"), nullable=False)
    recommendation: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="Pending")
