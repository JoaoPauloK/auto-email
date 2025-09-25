"""
Auto Email - Automated Email Classification and Response System

This project provides an intelligent email processing system that automatically
classifies emails as productive or non-productive and generates appropriate responses
for productive emails using AI technology.

Author: João Paulo
Version: 1.0.0
Date: 2025-09-24
License: MIT
"""

import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from api.router import router

__author__ = "João Paulo"
__version__ = "1.0.0"
__license__ = "MIT"
__email__ = "joaocoimbra881@gmail.com"

FRONTEND_PATH = os.path.join(os.path.dirname(__file__), "../../client/auto-email-frontend/dist")

load_dotenv()

app = FastAPI(
    title="Auto Email", version="1.0.0", description="An AI-powered email assistant."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/{path:path}")
async def root(path: str):
    """
    Serve the frontend application.
    """
    file_path = os.path.join(FRONTEND_PATH, path)
    if os.path.isfile(file_path):
        return FileResponse(file_path)
    return FileResponse(os.path.join(FRONTEND_PATH, "index.html"))