from fastapi import APIRouter
from .v1 import auth, users, emails

router = APIRouter()

router.include_router(auth.router)
router.include_router(users.router)
router.include_router(emails.router)
