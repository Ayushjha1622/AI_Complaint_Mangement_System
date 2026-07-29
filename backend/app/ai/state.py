from typing import TypedDict

from app.ai.schemas.ai_schema import ComplaintSummary


class SummaryState(TypedDict):
    """LangGraph state passed between nodes."""

    complaint: dict
    summary: ComplaintSummary
