FROM python:3.9

WORKDIR /backend

COPY requirements.txt /backend/requirements.txt
RUN pip install --no-cache-dir -r /backend/requirements.txt

COPY ./app /backend/app
COPY ./data /backend/data

EXPOSE 8000

CMD ["fastapi", "run", "app/main.py","--port", "8000"]