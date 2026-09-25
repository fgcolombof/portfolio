import os
import asyncio
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI
from fastapi_ai_advisor.app.core.logging import get_logger
from fastapi_ai_advisor.app.core.exceptions import OpenRouterAPIError

# Load .env from project root
env_path = Path(__file__).parent.parent.parent.parent.parent / ".env"
load_dotenv(env_path, override=True)

logger = get_logger(__name__)


class OpenRouterService:
    def __init__(self):
        # Force read from .env file directly
        with open(env_path, 'r') as f:
            for line in f:
                if line.startswith('OPENROUTER_API_KEY='):
                    self.api_key = line.strip().split('=', 1)[1]
                    break
        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=self.api_key,
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
