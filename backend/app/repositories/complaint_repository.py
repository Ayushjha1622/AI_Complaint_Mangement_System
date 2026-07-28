from uuid import UUID

from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.complaint import Complaint
from app.models.user import User
from app.models.enums import UserRole
from app.schemas.complaint_query import ComplaintQuery


class ComplaintRepository:

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, complaint: Complaint) -> Complaint:
        self.db.add(complaint)
        await self.db.commit()
        await self.db.refresh(complaint)
        return complaint

    async def get(self, complaint_id: UUID) -> Complaint | None:
        result = await self.db.execute(
            select(Complaint).where(Complaint.id == complaint_id)
        )
        return result.scalar_one_or_none()

    async def list(self) -> list[Complaint]:
        result = await self.db.execute(
            select(Complaint).order_by(Complaint.created_at.desc())
        )
        return list(result.scalars().all())

    async def list_with_filters(
        self,
        query: ComplaintQuery,
        current_user: User,
    ):
        stmt = select(Complaint)

        # -----------------------------
        # Role-Based Visibility
        # -----------------------------
        if current_user.role == UserRole.CUSTOMER_SUPPORT:
            stmt = stmt.where(
                Complaint.created_by == current_user.id
            )

        elif current_user.role == UserRole.INVESTIGATOR:
            stmt = stmt.where(
                Complaint.assigned_to == current_user.id
            )

        # ADMIN, QA_MANAGER and VIEWER
        # see all complaints

        # -----------------------------
        # Filters
        # -----------------------------
        if query.status:
            stmt = stmt.where(
                Complaint.status == query.status
            )

        if query.priority:
            stmt = stmt.where(
                Complaint.priority == query.priority
            )

        if query.category:
            stmt = stmt.where(
                Complaint.category == query.category
            )

        if query.search:
            keyword = f"%{query.search}%"

            stmt = stmt.where(
                or_(
                    Complaint.title.ilike(keyword),
                    Complaint.description.ilike(keyword),
                    Complaint.customer_name.ilike(keyword),
                    Complaint.customer_email.ilike(keyword),
                    Complaint.complaint_number.ilike(keyword),
                )
            )

        sort_column = getattr(
            Complaint,
            query.sort_by,
            Complaint.created_at,
        )

        if query.sort_order.lower() == "asc":
            stmt = stmt.order_by(sort_column.asc())
        else:
            stmt = stmt.order_by(sort_column.desc())

        count_stmt = select(func.count()).select_from(stmt.subquery())
        total = await self.db.scalar(count_stmt)

        stmt = stmt.offset(
            (query.page - 1) * query.page_size
        ).limit(query.page_size)

        result = await self.db.execute(stmt)

        complaints = result.scalars().all()

        return complaints, total

    async def update(self, complaint: Complaint) -> Complaint:
        await self.db.commit()
        await self.db.refresh(complaint)
        return complaint

    async def delete(self, complaint: Complaint) -> None:
        await self.db.delete(complaint)
        await self.db.commit()

    async def assign_complaint(
        self,
        complaint: Complaint,
        investigator_id: UUID,
    ) -> Complaint:

        complaint.assigned_to = investigator_id

        await self.db.commit()
        await self.db.refresh(complaint)

        return complaint

    async def get_count(self) -> int:
        result = await self.db.execute(
            select(func.count()).select_from(Complaint)
        )
        return result.scalar_one()
