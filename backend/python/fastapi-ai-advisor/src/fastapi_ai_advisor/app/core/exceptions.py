from fastapi import HTTPException, status


class OpenRouterAPIError(HTTPException):
    """Exception raised when OpenRouter API fails."""
    def __init__(self, detail: str = "Error communicating with OpenRouter API"):
        super().__init__(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=detail
        )


class ValidationError(HTTPException):
    """Exception raised for validation errors."""
    def __init__(self, detail: str = "Validation error"):
        super().__init__(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=detail
        )


class ServiceUnavailableError(HTTPException):
    """Exception raised when a service is unavailable."""
    def __init__(self, detail: str = "Service temporarily unavailable"):
        super().__init__(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=detail
        )
