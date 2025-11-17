FROM python:3.11-slim
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
COPY IntelliRoute /app
RUN pip install --no-cache-dir fastapi uvicorn python-dotenv openai langgraph pydantic typing_extensions
ENV PORT=8000
EXPOSE 8000
CMD ["python", "server.py"]