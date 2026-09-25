# Multi-stage Dockerfile for FastAPI AI Advisor
FROM python:3.13-slim AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install uv for fast dependency resolution
RUN pip install --no-cache-dir uv

# Copy dependency definition
COPY pyproject.toml README.md ./

# Install dependencies into system packages
RUN uv pip install --system .

# Production stage
FROM python:3.13-slim

WORKDIR /app

# Copy installed dependencies from builder
COPY --from=builder /usr/local/lib/python3.13/site-packages /usr/local/lib/python3.13/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy application code
COPY src/ ./src/

# Create non-root user for security
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Expose default port
EXPOSE 8000

# Run application using Render dynamic PORT (defaults to 8000 if not set)
CMD ["sh", "-c", "uvicorn src.fastapi_ai_advisor.app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]