from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models import Complaint

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/dashboard")
def get_dashboard_analytics(db: Session = Depends(get_db)):
    total = db.query(Complaint).count()
    open_cnt = db.query(Complaint).filter(Complaint.status == "Open").count()
    resolved_cnt = db.query(Complaint).filter(Complaint.status == "Resolved").count()

    return {
        "total_complaints": total,
        "open_complaints": open_cnt,
        "resolved_today": resolved_cnt,
        "avg_resolution_days": 2.6,
        "metrics": [
            {"id": "1", "title": "Total Complaints", "value": str(total), "change": 12.5, "trend": "up"},
            {"id": "2", "title": "Open Complaints", "value": str(open_cnt), "change": -5.2, "trend": "down"},
            {"id": "3", "title": "Resolved Today", "value": str(resolved_cnt), "change": 18.0, "trend": "up"},
            {"id": "4", "title": "Avg Resolution", "value": "2.6 Days", "change": -9.1, "trend": "down"},
        ],
    }
