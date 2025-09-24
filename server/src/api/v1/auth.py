from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from server.src.database.init_db import get_db
from server.src.utils.security import create_access_token
from server.src.utils.utils import get_user
from server.src.utils.security import verify_password

router = APIRouter(prefix="/auth", tags=["user"])


@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user = await get_user(db, username=form_data.username)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    if not verify_password(form_data.password, user.password):  # type: ignore
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed"
        )

    access_token = create_access_token(data={"sub": user.email})
    return JSONResponse(
        content={"access_token": access_token, "token_type": "Bearer"}, status_code=200
    )
