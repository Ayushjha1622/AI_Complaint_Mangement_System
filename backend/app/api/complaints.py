from typing import List, Optional
from uuid import UUID, uuid4
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models import Complaint, Comment
from app.schemas.complaint import (
    ComplaintCreate,
    ComplaintUpdate,
    ComplaintResponse,
    CommentCreate,
    CommentResponse,
)

router = APIRouter(prefix="/complaints", tags=["Complaints"])


@router.get("", response_model=List[ComplaintResponse])
def list_complaints(
    status: Optional[str] = None,
    priority: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Complaint)
    if status:
        query = query.filter(Complaint.status == status)
    if priority:
        query = query.filter(Complaint.priority == priority)
    return query.order_by(Complaint.created_at.desc()).all()


@router.get("/{complaint_id}", response_model=ComplaintResponse)
def get_complaint(complaint_id: UUID, db: Session = Depends(get_db)):
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return complaint


@router.post("", response_model=ComplaintResponse, status_code=status.HTTP_201_CREATED)
def create_complaint(payload: ComplaintCreate, db: Session = Depends(get_db)):
    count = db.query(Complaint).count()
    complaint_number = f"CMP-{1001 + count}"
    complaint = Complaint(
        id=uuid4(),
        complaint_number=complaint_number,
        **payload.model_dump(),
    )
    db.add(complaint)
    db.commit()
    db.refresh(complaint)
    return complaint


@router.put("/{complaint_id}", response_model=ComplaintResponse)
def update_complaint(
    complaint_id: UUID, payload: ComplaintUpdate, db: Session = Depends(get_db)
):
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(complaint, key, value)

    db.commit()
    db.refresh(complaint)
    return complaint


@router.delete("/{complaint_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_complaint(complaint_id: UUID, db: Session = Depends(get_db)):
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    db.delete(complaint)
    db.commit()
    return None


@router.get("/{complaint_id}/comments", response_model=List[CommentResponse])
def get_comments(complaint_id: UUID, db: Session = Depends(get_db)):
    return db.query(Comment).filter(Comment.complaint_id == complaint_id).all()


@router.post("/{complaint_id}/comments", response_model=CommentResponse)
def add_comment(complaint_id: UUID, payload: CommentCreate, db: Session = Depends(get_db)):
    comment = Comment(complaint_id=complaint_id, **payload.model_dump())
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment
