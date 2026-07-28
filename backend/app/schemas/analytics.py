from typing import List
from pydantic import BaseModel


class MetricResponse(BaseModel):
    id: str
    title: str
    value: str
    change: float
    trend: str


class DashboardAnalytics(BaseModel):
    total_complaints: int
    open_complaints: int
    resolved_today: int
    avg_resolution_days: float
    metrics: List[MetricResponse]
