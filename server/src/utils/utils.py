import datetime
from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from jwt import InvalidTokenError, decode
from sqlalchemy.orm import Session

from server.src.database.init_db import get_db
from server.src.models.models import Email, User
from server.src.services.infer import get_answer, infer_type
from server.src.utils.security import ALGORITHM, SECRET_KEY, TokenData


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


async def get_user(db: Session, username: str) -> User | None:
    return db.query(User).filter(User.email == username).first()


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    user = await get_user(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.disabled:  # type: ignore
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


def create_new_email_entry(db, content: str, type: str | None, user_id: int):
    email = Email(
        content=content,
        type=type,
        date=datetime.datetime.now(),
        category=infer_type(content),
        answer=get_answer(content),
        user_id=user_id,
    )
    db.add(email)
    db.commit()
    db.refresh(email)
