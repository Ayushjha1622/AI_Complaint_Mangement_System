from enum import Enum
from pydantic import BaseModel


class Sentiment(str, Enum):
    POSITIVE = "POSITIVE"
    NEUTRAL = "NEUTRAL"
    NEGATIVE = "NEGATIVE"
    VERY_NEGATIVE = "VERY_NEGATIVE"


class ComplaintSummary(BaseModel):
    """Structured AI analysis output for a complaint."""

    summary: str
    main_issue: str
    customer_concern: str
    recommended_focus: str
    severity: str


class ComplaintSentiment(BaseModel):
    """Sentiment analysis output for a complaint."""

    sentiment: Sentiment
    confidence: float
    reason: str
