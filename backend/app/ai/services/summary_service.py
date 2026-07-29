from app.ai.graph.summary_graph import summary_graph
from app.ai.schemas.ai_schema import ComplaintSummary


class SummaryService:
    """Orchestrates AI summary generation via LangGraph."""

    async def generate_summary(
        self,
        complaint: dict,
    ) -> ComplaintSummary:
        """Invoke the LangGraph summary workflow and return structured output."""

        result = summary_graph.invoke(
            {"complaint": complaint}
        )

        return result["summary"]
