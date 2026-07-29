from pydantic import BaseModel


class ComplaintSummary(BaseModel):
    """Structured AI analysis output for a complaint."""

    summary: str
    main_issue: str
    customer_concern: str
    recommended_focus: str
    severity: str
