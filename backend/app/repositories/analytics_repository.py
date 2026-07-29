from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.complaint import Complaint
from app.models.complaint_enums import ComplaintPriority, ComplaintStatus
from app.models.enums import UserRole
from app.models.user import User


class AnalyticsRepository:

    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_dashboard(self, user: User, limit: int = 5):
        import asyncio
        summary_task = self.dashboard_stats(user)
        status_task = self.status_distribution(user)
        priority_task = self.priority_distribution(user)
        category_task = self.category_distribution(user)
        trend_task = self.monthly_trend(user)
        recent_task = self.recent_complaints(user, limit)

        summary, status, priority, category, trend, recent = await asyncio.gather(
            summary_task,
            status_task,
            priority_task,
            category_task,
            trend_task,
            recent_task,
        )

        return {
            "summary": summary,
            "status_distribution": status,
            "priority_distribution": priority,
            "category_distribution": category,
            "monthly_trend": trend,
            "recent_complaints": recent,
        }


    async def dashboard_stats(self, user: User):
        is_investigator = user.role == UserRole.INVESTIGATOR

        def apply_filter(query):
            if is_investigator:
                return query.where(Complaint.assigned_to == user.id)
            return query

        total = await self.db.scalar(
            apply_filter(select(func.count(Complaint.id)))
        )

        open_count = await self.db.scalar(
            apply_filter(
                select(func.count())
                .where(
                    Complaint.status == ComplaintStatus.OPEN
                )
            )
        )

        in_progress = await self.db.scalar(
            apply_filter(
                select(func.count())
                .where(
                    Complaint.status == ComplaintStatus.IN_PROGRESS
                )
            )
        )

        under_review = await self.db.scalar(
            apply_filter(
                select(func.count())
                .where(
                    Complaint.status == ComplaintStatus.UNDER_REVIEW
                )
            )
        )

        resolved = await self.db.scalar(
            apply_filter(
                select(func.count())
                .where(
                    Complaint.status == ComplaintStatus.RESOLVED
                )
            )
        )

        closed = await self.db.scalar(
            apply_filter(
                select(func.count())
                .where(
                    Complaint.status == ComplaintStatus.CLOSED
                )
            )
        )

        high_priority = await self.db.scalar(
            apply_filter(
                select(func.count())
                .where(
                    Complaint.priority == ComplaintPriority.HIGH
                )
            )
        )

        critical_priority = await self.db.scalar(
            apply_filter(
                select(func.count())
                .where(
                    Complaint.priority == ComplaintPriority.CRITICAL
                )
            )
        )

        return {
            "total_complaints": total or 0,
            "open": open_count or 0,
            "in_progress": in_progress or 0,
            "under_review": under_review or 0,
            "resolved": resolved or 0,
            "closed": closed or 0,
            "high_priority": high_priority or 0,
            "critical_priority": critical_priority or 0,
        }

    async def status_distribution(self, user: User):
        query = select(Complaint.status, func.count(Complaint.id))
        if user.role == UserRole.INVESTIGATOR:
            query = query.where(Complaint.assigned_to == user.id)
        query = query.group_by(Complaint.status)
        result = await self.db.execute(query)
        return [{"status": status.value, "count": count} for status, count in result.all()]

    async def priority_distribution(self, user: User):
        query = select(Complaint.priority, func.count(Complaint.id))
        if user.role == UserRole.INVESTIGATOR:
            query = query.where(Complaint.assigned_to == user.id)
        query = query.group_by(Complaint.priority)
        result = await self.db.execute(query)
        return [{"priority": priority.value, "count": count} for priority, count in result.all()]

    async def category_distribution(self, user: User):
        query = select(Complaint.category, func.count(Complaint.id))
        if user.role == UserRole.INVESTIGATOR:
            query = query.where(Complaint.assigned_to == user.id)
        query = query.group_by(Complaint.category)
        result = await self.db.execute(query)
        return [{"category": category.value, "count": count} for category, count in result.all()]

    async def monthly_trend(self, user: User):
        query = select(
            func.to_char(Complaint.created_at, "YYYY-MM").label("month_key"),
            func.to_char(Complaint.created_at, "Mon").label("month_name"),
            func.count(Complaint.id)
        )
        if user.role == UserRole.INVESTIGATOR:
            query = query.where(Complaint.assigned_to == user.id)
        query = query.group_by(func.to_char(Complaint.created_at, "YYYY-MM"), func.to_char(Complaint.created_at, "Mon"))
        query = query.order_by("month_key")
        result = await self.db.execute(query)
        return [{"month": item.month_name, "count": item[2]} for item in result.all()]

    async def recent_complaints(self, user: User, limit: int = 5):
        query = select(Complaint)
        if user.role == UserRole.INVESTIGATOR:
            query = query.where(Complaint.assigned_to == user.id)
        query = query.order_by(Complaint.created_at.desc()).limit(limit)
        result = await self.db.execute(query)
        return result.scalars().all()


