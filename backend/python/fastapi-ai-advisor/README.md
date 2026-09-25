# FastAPI AI Advisor

A production-ready FastAPI service that provides AI-powered advisory capabilities for software project showrooms. Built with modern Python practices, async/await patterns, and integrated with OpenRouter's LLM API.

## 🚀 Features

- **FastAPI Framework**: High-performance async web framework with automatic OpenAPI documentation
- **AI Integration**: OpenRouter API integration with NVIDIA Nemotron model for intelligent responses
- **Structured Logging**: Professional logging system for production monitoring
- **Docker Support**: Multi-stage Dockerfile for efficient containerization
- **Testing Suite**: Pytest-based test coverage for critical endpoints
- **Health Checks**: Built-in health check endpoint for monitoring
- **Type Safety**: Pydantic models for request/response validation
- **Environment Configuration**: Secure environment variable management

## 📋 Prerequisites

- Python 3.13+
- pip or uv package manager
- OpenRouter API key

## 🛠️ Installation

### Using pip

```bash
# Clone the repository
git clone <repository-url>
cd fastapi-ai-advisor

# Install in editable mode
pip install -e .
```

### Using uv (recommended)

```bash
# Install dependencies
uv sync
```

## ⚙️ Configuration

Create a `.env` file in the project root:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
PROJECT_NAME="FastAPI AI Advisor"
API_V1_STR="/api/v1"
```

Get your API key from [OpenRouter](https://openrouter.ai/keys).

## 🏃 Running the Application

### Development Mode

```bash
# Using uvicorn directly
python -m uvicorn fastapi_ai_advisor.main:app --reload --host 0.0.0.0 --port 8000

# Or using the installed script
fastapi-ai-advisor
```

### Production Mode

```bash
uvicorn fastapi_ai_advisor.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Docker

```bash
# Build the image
docker build -t fastapi-ai-advisor .

# Run the container
docker run -p 8000:8000 --env-file .env fastapi-ai-advisor
```

## 📚 API Documentation

Once the server is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

## 🔌 API Endpoints

### POST /v1/advisor/

Query the AI advisor for software project recommendations.

**Request Body:**
```json
{
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant for software project recommendations."
    },
    {
      "role": "user",
      "content": "What technologies do you recommend for an e-commerce project?"
    }
  ]
}
```

**Response:**
```json
{
  "response": "Based on your requirements, I recommend..."
}
```

### GET /

Root endpoint with service information.

### GET /health

Health check endpoint for monitoring.

## 🧪 Testing

Run the test suite:

```bash
# Using pytest
pytest tests/

# With coverage
pytest tests/ --cov=fastapi_ai_advisor --cov-report=html
```

## 📁 Project Structure

```
fastapi-ai-advisor/
├── src/
│   └── fastapi_ai_advisor/
│       ├── app/
│       │   ├── core/
│       │   │   ├── __init__.py
│       │   │   └── logging.py          # Logging configuration
│       │   ├── schemas/
│       │   │   └── advisor.py           # Pydantic models
│       │   ├── services/
│       │   │   └── openrouter_service.py # OpenRouter integration
│       │   ├── v1/
│       │   │   ├── __init__.py
│       │   │   └── endpoints/
│       │   │       └── advisor.py       # API endpoints
│       │   └── __init__.py
│       ├── __init__.py
│       └── main.py                      # FastAPI application
├── tests/
│   ├── __init__.py
│   └── test_advisor.py                 # Test suite
├── .env                                 # Environment variables
├── .dockerignore
├── Dockerfile
├── pyproject.toml
└── README.md
```

## 🔧 Technology Stack

- **Framework**: FastAPI 0.116+
- **Python**: 3.13
- **AI Provider**: OpenRouter (NVIDIA Nemotron)
- **HTTP Client**: httpx / OpenAI SDK
- **Validation**: Pydantic v2
- **Testing**: pytest, httpx
- **Containerization**: Docker
- **Logging**: Python logging module

## 📝 Development

### Code Style

The project follows Python best practices. Consider using:

```bash
# Format code with black
black src/ tests/

# Lint with ruff
ruff check src/ tests/

# Type checking with mypy
mypy src/
```

### Adding New Features

1. Add schemas in `app/schemas/`
2. Implement services in `app/services/`
3. Create endpoints in `app/v1/endpoints/`
4. Register routes in `app/v1/__init__.py`
5. Add tests in `tests/`

## 🚢 Deployment

### Docker Compose

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "8000:8000"
    env_file:
      - .env
    restart: unless-stopped
```

### Cloud Platforms

This application can be deployed to:
- **Render**: Deploy as a web service
- **Railway**: Deploy with Dockerfile
- **AWS/GCP/Azure**: Deploy using container registries
- **Kubernetes**: Use the provided Dockerfile

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Fernando Colombo

## 🙏 Acknowledgments

- FastAPI team for the excellent framework
- OpenRouter for providing AI model access
- The Python community for amazing tools and libraries
