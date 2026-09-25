import pytest
from httpx import AsyncClient
from fastapi import FastAPI
from fastapi_ai_advisor.main import app


@pytest.fixture
def client():
    """Create a test client for the FastAPI app."""
    return AsyncClient(app=app, base_url="http://test")


@pytest.mark.asyncio
async def test_root_endpoint(client):
    """Test the root endpoint returns correct response."""
    response = await client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "version" in data


@pytest.mark.asyncio
async def test_health_endpoint(client):
    """Test the health check endpoint."""
    response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "service" in data


@pytest.mark.asyncio
async def test_advisor_endpoint_valid_request(client):
    """Test the advisor endpoint with a valid request."""
    response = await client.post(
        "/v1/advisor/",
        json={
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Test prompt for advisor"}
            ]
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "response" in data
    assert isinstance(data["response"], str)


@pytest.mark.asyncio
async def test_advisor_endpoint_invalid_request(client):
    """Test the advisor endpoint with invalid request (missing messages)."""
    response = await client.post(
        "/v1/advisor/",
        json={}
    )
    assert response.status_code == 422  # Validation error


@pytest.mark.asyncio
async def test_advisor_endpoint_empty_messages(client):
    """Test the advisor endpoint with empty messages array."""
    response = await client.post(
        "/v1/advisor/",
        json={"messages": []}
    )
    assert response.status_code == 422  # Validation error


@pytest.mark.asyncio
async def test_advisor_endpoint_invalid_message_format(client):
    """Test the advisor endpoint with invalid message format."""
    response = await client.post(
        "/v1/advisor/",
        json={
            "messages": [
                {"role": "user"}  # Missing content
            ]
        }
    )
    assert response.status_code == 422  # Validation error
