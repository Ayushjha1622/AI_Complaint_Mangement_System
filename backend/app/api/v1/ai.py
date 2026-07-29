from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.api.deps import get_complaint_service
from app.services.complaint_service import ComplaintService
from app.repositories.ai_analysis_repository import AIAnalysisRepository
from app.models.ai_analysis import AIAnalysis
from app.ai.services.summary_service import SummaryService
from app.ai.schemas.ai_schema import ComplaintSummary
from app.schemas.common import ApiResponse
from app.core.config import settings

router = APIRouter(prefix="/ai", tags=["AI"])


def get_ai_repo(db: AsyncSession = Depends(get_db)) -> AIAnalysisRepository:
    return AIAnalysisRepository(db)


@router.post(
    "/summary/{complaint_id}",
    response_model=ApiResponse[ComplaintSummary],
)
async def generate_summary(
    complaint_id: UUID,
    service: ComplaintService = Depends(get_complaint_service),
    ai_repo: AIAnalysisRepository = Depends(get_ai_repo),
):
    """
    Generate (or return cached) AI analysis for a complaint.

    Workflow:
    1. Load the complaint using the existing complaint service.
    2. Check the ai_analysis cache table.
    3. If a cached record exists, return it immediately.
    4. Otherwise, generate a new summary via LangGraph + Groq.
    5. Persist the result in ai_analysis for future requests.
    6. Return the structured summary.
    """

    # 1. Load complaint
    complaint = await service.get(complaint_id)

    # 2. Check cache
    cached = await ai_repo.get_by_complaint_id(complaint_id)
    if cached:
        return ApiResponse(
            success=True,
            message="AI analysis loaded from cache",
            data=ComplaintSummary(
                summary=cached.summary,
                main_issue=cached.main_issue,
                customer_concern=cached.customer_concern,
                recommended_focus=cached.recommended_focus,
                severity=cached.severity,
            ),
        )

    # 3. Generate fresh summary
    summary_service = SummaryService()
    complaint_data = {
        "title": complaint.title,
        "description": complaint.description,
        "category": complaint.category.value if hasattr(complaint.category, "value") else str(complaint.category),
        "priority": complaint.priority.value if hasattr(complaint.priority, "value") else str(complaint.priority),
        "status": complaint.status.value if hasattr(complaint.status, "value") else str(complaint.status),
    }

    try:
        ai_result: ComplaintSummary = await summary_service.generate_summary(
            complaint_data
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI service error: {str(e)}",
        )

    # 4. Persist to cache
    analysis = AIAnalysis(
        complaint_id=complaint_id,
        summary=ai_result.summary,
        main_issue=ai_result.main_issue,
        customer_concern=ai_result.customer_concern,
        recommended_focus=ai_result.recommended_focus,
        severity=ai_result.severity,
        model_name=settings.LLM_MODEL,
    )
    await ai_repo.create(analysis)

    # 5. Return result
    return ApiResponse(
        success=True,
        message="AI analysis generated successfully",
        data=ai_result,
    )


@router.post(
    "/summary/{complaint_id}/regenerate",
    response_model=ApiResponse[ComplaintSummary],
)
async def regenerate_summary(
    complaint_id: UUID,
    service: ComplaintService = Depends(get_complaint_service),
    ai_repo: AIAnalysisRepository = Depends(get_ai_repo),
):
    """
    Force regeneration of the AI analysis, updating the cache.
    """

    # 1. Load complaint
    complaint = await service.get(complaint_id)

    # 2. Generate fresh summary
    summary_service = SummaryService()
    complaint_data = {
        "title": complaint.title,
        "description": complaint.description,
        "category": complaint.category.value if hasattr(complaint.category, "value") else str(complaint.category),
        "priority": complaint.priority.value if hasattr(complaint.priority, "value") else str(complaint.priority),
        "status": complaint.status.value if hasattr(complaint.status, "value") else str(complaint.status),
    }

    try:
        ai_result: ComplaintSummary = await summary_service.generate_summary(
            complaint_data
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI service error: {str(e)}",
        )

    # 3. Upsert cache
    cached = await ai_repo.get_by_complaint_id(complaint_id)
    if cached:
        cached.summary = ai_result.summary
        cached.main_issue = ai_result.main_issue
        cached.customer_concern = ai_result.customer_concern
        cached.recommended_focus = ai_result.recommended_focus
        cached.severity = ai_result.severity
        cached.model_name = settings.LLM_MODEL
        await ai_repo.update(cached)
    else:
        analysis = AIAnalysis(
            complaint_id=complaint_id,
            summary=ai_result.summary,
            main_issue=ai_result.main_issue,
            customer_concern=ai_result.customer_concern,
            recommended_focus=ai_result.recommended_focus,
            severity=ai_result.severity,
            model_name=settings.LLM_MODEL,
        )
        await ai_repo.create(analysis)

    return ApiResponse(
        success=True,
        message="AI analysis regenerated successfully",
        data=ai_result,
    )
