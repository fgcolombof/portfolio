from pydantic import BaseModel, Field
from typing import List


class Message(BaseModel):
    role: str = Field(..., description="Role del mensaje (system, user, assistant)")
    content: str = Field(..., min_length=1, description="Contenido del mensaje")


class AdvisorQuery(BaseModel):
    messages: List[Message] = Field(..., min_length=1, description="Array de mensajes para la conversación")


class AdvisorResponse(BaseModel):
    response: str = Field(..., description="Respuesta del asistente virtual")