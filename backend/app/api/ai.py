from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models import Complaint, AIAnalysis
from app.ai.graph import run_ai_complaint_workflow

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/analyze/{complaint_id}")
def analyze_complaint(complaint_id: UUID, db: Session = Depends(get_db)):
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    result = run_ai_complaint_workflow(complaint.description, complaint.product)

    analysis = db.query(AIAnalysis).filter(AIAnalysis.complaint_id == complaint_id).first()
    if not analysis:
        analysis = AIAnalysis(
            complaint_id=complaint_id,
            summary=result["summary"],
            root_cause=result["root_cause"],
            risk_score=result["risk_score"],
            confidence=result["confidence"],
            severity=result["severity"],
        )
        db.add(analysis)
    else:
        analysis.summary = result["summary"]
        analysis.root_cause = result["root_cause"]
        analysis.risk_score = result["risk_score"]
        analysis.confidence = result["confidence"]
        analysis.severity = result["severity"]

    db.commit()
    db.refresh(analysis)

    return result
