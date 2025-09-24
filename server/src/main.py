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
from fastapi.middleware.cors import CORSMiddleware
from api.router import router

__author__ = "João Paulo"
__version__ = "1.0.0"
__license__ = "MIT"
__email__ = "joaocoimbra881@gmail.com"

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
