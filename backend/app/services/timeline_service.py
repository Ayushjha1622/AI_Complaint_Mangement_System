from uuid import UUID

from app.models.complaint_timeline import ComplaintTimeline
from app.repositories.timeline_repository import TimelineRepository


class TimelineService:

    def __init__(
        self,
        repo: TimelineRepository,
    ):
        self.repo = repo

    async def log(
        self,
        complaint_id: UUID,
        action: str,
        field_name: str | None,
        old_value: str | None,
        new_value: str | None,
        performed_by: UUID,
    ):

        timeline = ComplaintTimeline(
            complaint_id=complaint_id,
            action=action,
            field_name=field_name,
            old_value=old_value,
            new_value=new_value,
            performed_by=performed_by,
        )

        return await self.repo.create(
            timeline
        )

    async def get_history(
        self,
        complaint_id: UUID,
    ) -> list[ComplaintTimeline]:
        return await self.repo.get_by_complaint(
            complaint_id
        )
