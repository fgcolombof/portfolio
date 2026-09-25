from fastapi import APIRouter, HTTPException, status
from fastapi_ai_advisor.app.schemas.advisor import AdvisorQuery, AdvisorResponse
from fastapi_ai_advisor.app.services.openrouter_service import openrouter_service
from fastapi_ai_advisor.app.core.logging import get_logger
from fastapi_ai_advisor.app.core.exceptions import OpenRouterAPIError

router = APIRouter()
logger = get_logger(__name__)

@router.post(
    "/",
    response_model=AdvisorResponse,
    status_code=status.HTTP_200_OK,
    summary="Consulta al asistente virtual del showroom"
)
async def advisor_query(payload: AdvisorQuery):
    try:
        messages_dict = [{"role": msg.role, "content": msg.content} for msg in payload.messages]
        logger.info(f"Received advisor query with {len(messages_dict)} messages")
        response = await openrouter_service.generate_completion(messages_dict)
        logger.info(f"Successfully generated response (length: {len(response)} chars)")
        return AdvisorResponse(response=response)
    except OpenRouterAPIError:
        raise
    except Exception as e:
        logger.error(f"Error processing advisor query: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error procesando la solicitud: {str(e)}"
        )