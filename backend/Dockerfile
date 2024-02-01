FROM python:3.11

# Create work directory
WORKDIR /app

# Install poetry env, project dependency and model files
COPY ./app/poetry.lock ./app/pyproject.toml ./
RUN pip install --no-cache-dir poetry==1.7.1 \
    && poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

# Copy application files
COPY ./app/ ./

# Expose port and run application
EXPOSE 8000

ENTRYPOINT ["/bin/sh", "-c", "uvicorn main:app --host 0.0.0.0"]