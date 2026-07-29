from langchain_groq import ChatGroq
from langgraph.graph import StateGraph

from app.core.config import settings
from app.ai.prompts.summary_prompt import SUMMARY_PROMPT
from app.ai.schemas.ai_schema import ComplaintSummary
from app.ai.state import SummaryState


# ── LLM with structured output ────────────────────────────────────────────────
llm = ChatGroq(
    model=settings.LLM_MODEL,
    api_key=settings.GROQ_API_KEY,
    temperature=0,
).with_structured_output(ComplaintSummary)


# ── Graph node ─────────────────────────────────────────────────────────────────
def summarize(state: SummaryState) -> dict:
    """Run the prompt against the LLM and return a ComplaintSummary."""

    complaint = state["complaint"]

    chain = SUMMARY_PROMPT | llm

    response = chain.invoke(
        {
            "title": complaint["title"],
            "description": complaint["description"],
            "category": complaint["category"],
            "priority": complaint["priority"],
            "status": complaint["status"],
        }
    )

    return {"summary": response}


# ── Build graph ────────────────────────────────────────────────────────────────
builder = StateGraph(SummaryState)
builder.add_node("summarize", summarize)
builder.set_entry_point("summarize")
builder.set_finish_point("summarize")

summary_graph = builder.compile()
