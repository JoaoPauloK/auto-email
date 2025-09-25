FROM python:3.13-slim

RUN apt-get update && apt-get install -y curl git \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /auto-email

COPY server/requirements.txt ./server/
RUN pip install --no-cache-dir -r server/requirements.txt

COPY client/auto-email-frontend/package*.json ./client/
WORKDIR /auto-email/client
RUN npm install

WORKDIR /auto-email
COPY . .

WORKDIR /auto-email/client/auto-email-frontend
RUN npm run build

WORKDIR /auto-email/server/src
EXPOSE 8000

ENV PYTHONPATH=$PYTHONPATH:/auto-email

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
