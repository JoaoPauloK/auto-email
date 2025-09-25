from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from server.src.database.init_db import get_db
from server.src.models.models import User
from server.src.utils.schema import UserInput
from server.src.utils.security import get_password_hash
from server.src.utils.utils import get_user

router = APIRouter(prefix='/user', tags=['user'])

@router.post("")
async def create_user(user: UserInput, db: Session = Depends(get_db)):
    existing_user = await get_user(db, username=user.email)
    if existing_user:
        return JSONResponse(
            content={"message": "User already exists"},
            status_code=400
        )
    db_user = User(
        email=user.email,
        password=get_password_hash(user.password),
        full_name=user.full_name,
        disabled=user.disabled
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return JSONResponse(
        content={"message": "User created successfully"},
        status_code=201
    )