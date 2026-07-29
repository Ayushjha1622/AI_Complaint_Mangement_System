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


class DashboardStats(BaseModel):
    total_complaints: int
    open: int
    in_progress: int
    under_review: int
    resolved: int
    closed: int
    high_priority: int
    critical_priority: int


class StatusDistribution(BaseModel):
    status: str
    count: int


class PriorityDistribution(BaseModel):
    priority: str
    count: int


class CategoryDistribution(BaseModel):
    category: str
    count: int


class MonthlyTrend(BaseModel):
    month: str
    count: int


from app.schemas.complaint import ComplaintResponse


class DashboardData(BaseModel):
    summary: DashboardStats
    status_distribution: list[StatusDistribution]
    priority_distribution: list[PriorityDistribution]
    category_distribution: list[CategoryDistribution]
    monthly_trend: list[MonthlyTrend]
    recent_complaints: list[ComplaintResponse]


