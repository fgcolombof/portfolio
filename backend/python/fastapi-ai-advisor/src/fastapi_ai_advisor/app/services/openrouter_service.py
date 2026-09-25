import asyncio
from openai import OpenAI
from fastapi_ai_advisor.app.core.logging import get_logger
from fastapi_ai_advisor.app.core.exceptions import OpenRouterAPIError
from fastapi_ai_advisor.app.core.config import settings

logger = get_logger(__name__)


class OpenRouterService:
    def __init__(self):
        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=settings.OPENROUTER_API_KEY,
            timeout=60.0
        )
        logger.info("OpenRouterService initialized successfully")

    async def generate_completion(self, messages: list) -> str:
        try:
            # Run the synchronous OpenAI client in a thread pool
            completion = await asyncio.to_thread(
                self.client.chat.completions.create,
                model="nvidia/nemotron-3-ultra-550b-a55b:free",
                messages=messages,
                max_tokens=500
            )
            return completion.choices[0].message.content
        except Exception as e:
            logger.error(f"OpenRouter API error: {str(e)}")
            raise OpenRouterAPIError(detail=f"Error al comunicarse con OpenRouter API: {str(e)}")


openrouter_service = OpenRouterService()
